/**
 * Created by yazhou on 17/6/28.
 */

'use strict'

import { constants } from './constants'
import { Session } from './session'
import { extend } from './extend'
import * as loginLib from './login'
import { sign } from './sign'

let noop = function noop() {}

let buildAuthHeader = function buildAuthHeader(session) {
	var header = {}
	
	if (session && session.skey) {
		header[constants.WX_HEADER_SKEY] = session.skey
		header[constants.WX_HEADER_EXPIRE] = session.expire
		header[constants.WX_HEADER_SIGN] = session.sign
	}
	
	return header
}

/***
 * @class
 * 表示请求过程中发生的异常
 */
let RequestError = (function () {
	function RequestError(type, message) {
		Error.call(this, message)
		this.type = type
		this.message = message
	}
	
	RequestError.prototype = new Error()
	RequestError.prototype.constructor = RequestError
	
	return RequestError
})()

function request(options) {
	if (typeof options !== 'object') {
		var message = '请求传参应为 object 类型，但实际传了 ' + (typeof options) + ' 类型'
		
		throw new RequestError(constants.ERR_INVALID_PARAMS, message)
	}
	
	var requireLogin = options.login // 请求是否验证登录
	var success = options.success || noop
	var fail = options.fail || noop
	var complete = options.complete || noop
	var originHeader = options.header || {}
	
	// 成功回调
	var callSuccess = function () {
		success.apply(null, arguments)
		complete.apply(null, arguments)
	}
	
	// 失败回调
	var callFail = function (error) {
		fail.call(null, error)
		complete.call(null, error)
	}
	
	// 是否已经进行过登录重试
	var hasRetried = false

	// 如果要验证登录
	if (requireLogin) {

		// 先登录再请求接口
		doRequestWithLogin()
	} else {
		doRequest()

		let firstAuth = constants.FIRSTAUTH
		// 是否开启第一次访问小程序，调用微信授权弹框功能
		if (firstAuth) {
      var firstVisitFlag

      try {
        firstVisitFlag = wx.getStorageSync('firstVisitFlag')
      } catch (e) {
        firstVisitFlag = 1
      }

      // 第一次访问小程序，调用微信授权弹框
      if (! firstVisitFlag) {
        loginLib.login({
          success(session) {
            //
          },

          fail(loginResponseError) {
            // 用户拒绝授权
            if (loginResponseError.type == constants.ERR_WX_GET_USER_INFO) {
              wx.navigateTo({
                url: '/pages/account/authorize/authorize',
              })

              try {
                wx.setStorageSync(constants.ERR_WX_GET_USER_INFO, 1)
              } catch (e) {
                //
              }
            } else {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: loginResponseError.message,
              })
            }
          }
        })

        try {
          wx.setStorageSync('firstVisitFlag', 1)
        } catch (e) {
          //
        }
      }
		}

	}
	
	// 登录后再请求接口
	function doRequestWithLogin() {

		// 先登录
		loginLib.login({success: doRequest, fail: callFail})
	}
	
	// 实际进行请求的方法
	function doRequest() {
		var authHeader = buildAuthHeader(Session.get())
		var userinfo = {}
		var header = extend({}, originHeader, authHeader)
		var verb = 'request'
		
		try {
			userinfo = wx.getStorageSync('userinfo') || {}
		} catch (e) {
			//
		}
		
		// 文件上传标识
		if (options.uploadFile == true) {
			verb = 'uploadFile'
			header[constants.WX_HEADER_NO_CHECK] = 1
		}
		
		if (! requireLogin && ! userinfo.mobile_phone) {
			header[constants.WX_HEADER_NO_CHECK] = 1
		}
		
		if (userinfo.uid) options.data.login_uid = userinfo.uid
		// if (userinfo.login_token) options.data.login_token = userinfo.login_token
		if (userinfo.openid) options.data.openid = userinfo.openid
		if (userinfo.unionid) options.data.unionid = userinfo.unionid
		
		// 参数签名逻辑
		sign(options)
		
		wx[verb](extend({}, options, {
			header: header,
			
			success: function (response) {
				if (verb == 'uploadFile') {
					if (response.statusCode == 200) {
						response.data = JSON.parse(response.data)
					} else {
						response.data = {}
					}
				}
				
				var data = response.data && response.data.original && response.data.original.data
					? response.data.original.data
					: {}
				
				// 如果响应的数据里面包含 SDK Magic ID，表示被服务端处理过，此时一定包含登录状态信息
				if (data[constants.WX_SESSION_MAGIC_ID] === 1) { // 用户登录成功
					// 存储后端返回的session
					// var userinfo = wx.getStorageSync('userinfo') || {}
					
					userinfo = extend(true, {}, userinfo, data)
					
					try {
						wx.setStorageSync('userinfo', userinfo)
					} catch (e) {
						//
					}
				} else if (data[constants.WX_SESSION_MAGIC_ID] === 0) { // 小程序登录状态已过期
					// 清除登录态
					Session.clear()
					
					// 如果是登录态无效，并且还没重试过，会尝试登录后刷新凭据重新请求
					if (! hasRetried && requireLogin) {
						hasRetried = true
						doRequestWithLogin()
						
						return
					}
					
					var message = '登录状态已过期'
					var error = new RequestError('A500', message)
					
					callFail(error)
					
					return
				} else if (response.statusCode !== 200) {
					var message = '服务器发生错误'
					var error = new RequestError(response.statusCode, message)
					
					callFail(error)
					
					return
				}
				
				callSuccess.apply(null, arguments)
			},
			
			fail: callFail,
			complete: noop,
		}))
	}
}

export { RequestError, request }
