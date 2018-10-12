/**
 * Created by yazhou on 17/6/28.
 */

'use strict'

import { constants } from './constants'
import { Session } from './session'
import { extend } from './extend'
import { sign } from './sign'

/***
 * @class
 * 表示登录过程中发生的异常
 */
let LoginError = (function () {
  function LoginError(type, message) {
    Error.call(this, message)
    this.type = type
    this.message = message
  }

  LoginError.prototype = new Error()
  LoginError.prototype.constructor = LoginError

  return LoginError
})()

/**
 * 微信登录，获取 code 和 encryptData
 */
let getWxLoginResult = function getLoginCode(callback) {

  // wx.login方法先微信登录
  wx.login({

    // 微信登录成功
    success: function (loginResult) {
      // console.log(loginResult)

      // 微信登录成功后，授权获取当前微信用户信息
      wx.getUserInfo({

        // 获取当前微信用户信息成功
        success: function (userResult) {
          // console.log(userResult)

          // 执行传入的回调函数（注：传入的回掉函数包含两个参数wxLoginError 和 wxLoginResult），将用户信息传入至回调函数内.
          callback(null, {
            code: loginResult.code, // 登录凭证
            encryptedData: userResult.encryptedData, // 会话秘钥
            rawData: userResult.rawData, // 用户信息json的转化字符串
            signature: userResult.signature, // 用户的签名信息
            iv: userResult.iv, // 用户的session-key
            userInfo: userResult.userInfo // 用户信息json数据
          })
        },

        // // 用户拒绝授权，获取当前微信用户信息失败
        fail: function (userError) {
          // getUserInfo:fail auth deny   获取用户信息失败，
          var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '请重新进行微信授权')

          error.detail = userError
          callback(error, null)
        }
      })
    },

    // 微信登录失败
    fail: function (loginError) {
      var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态')
      error.detail = loginError
      callback(error, null)
    }
  })
}

// 空函数，用作初始化
let noop = function noop() { }

// 登录默认配置
let defaultOptions = {
  method: 'GET',
  success: noop,
  fail: noop,
  loginUrl: null
}

/**
 * @method
 * 进行服务器登录，以获得登录会话
 *
 * @param {Object} options 登录配置
 * @param {string} options.loginUrl 登录使用的 URL，服务器应该在这个 URL 上处理登录请求
 * @param {string} [options.method] 请求使用的 HTTP 方法，默认为 "GET"
 * @param {Function} options.success(userInfo) 登录成功后的回调函数，参数 userInfo 微信用户信息
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
let login = function login(options) {

  // 将登录默认配置和传入配置合并
  options = extend({}, defaultOptions, options)

  // 验证登录的url，再开始的app.js中设置.如果没有的话，不能登录.
  if (! defaultOptions.loginUrl) {
    options.fail(new LoginError(constants.ERR_INVALID_PARAMS, '登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址'))

    return
  }

  // 如果存在登录的url，继续执行.
  // 注：这里doLogin只是定义了一个函数，并未执行.
  // getWxLoginResult微信登录 + 获取当前用户信息，获取 code 和 encryptData
  var doLogin = () => getWxLoginResult(function (wxLoginError, wxLoginResult) {
    if (wxLoginError) {
      options.fail(wxLoginError)

      return
    }

    var userInfo = wxLoginResult.userInfo

    // 定义构造请求头的值，包含 code、encryptedData 和 iv等
    var code = wxLoginResult.code // 登录凭证
    var encryptedData = wxLoginResult.encryptedData // 会话秘钥
    var rawData = wxLoginResult.rawData // 用户信息json的转化字符串
    var signature = wxLoginResult.signature // 用户的签名信息
    var iv = wxLoginResult.iv // 用户的session-key

    // 构造请求头，包含 code、encryptedData 和 iv等
    var header = {}
    header[constants.WX_HEADER_NO_CHECK] = 1
    header[constants.WX_HEADER_CODE] = code
    header[constants.WX_HEADER_ENCRYPTED_DATA] = encryptedData
    header[constants.WX_HEADER_RAW_DATA] = encodeURIComponent(rawData)
    header[constants.WX_HEADER_SIGNATURE] = signature
    header[constants.WX_HEADER_IV] = iv

    // console.log(options.loginUrl)
    // console.log(header)
    /* 组织登录服务端接口传参数
      注：小程序登录走内部服务器的目的为用微信生成的code、会话秘钥等信息，在内部服务器生成openid、uniconid等信息，仅此而已，
          可以说，微信小程序的登录：微信封装了大部分的登录功能，只是使用api获取openid的过程而已。
    */
    let requestOptions = {
	    url: options.loginUrl,
	    header: header,
	    method: options.method,
	    data: options.data || {},
	    success: function (result) {

	      // 返回信息中包含，当前微信用户的openid（用户唯一识别符，openid是内部服务端代码调用微信api生成的）、手机号等信息
		    var data = result.data.original.data
        // console.log(data)

		    // 成功地响应会话信息
		    if (data && data[constants.WX_SESSION_MAGIC_ID]) {
			    // 小程序授权登录成功
			    // 已绑定小程序的用户，记录mobile_phone、openid

          /*
            到这步，小程序登录、自己内部服务器登录，全都完毕，并将后端获取的openid、uniconid、mobile_phone等信息(其中
            openid、uniconid信息保存在本地存储中会被用到)
            和userInfo(微信登录返回的信息，前面有)信息合并，得出最终所有登录后所需要的信息。
            */
			    userInfo = extend(true, {}, userInfo, data)
			
			    try {
			      // 将userInfo信息添加到本地缓存中，便于使用本地缓存信息，（注：和下面的Session.set(data)中的数据有重复）
				    wx.setStorageSync('userinfo', userInfo)

			    } catch (e) {
				    //
			    }

			    // 将openid等信息加入到本地存储中的session_key中，以便下次判断登录态.
			    Session.set(data)

          // 继续执行，请求后的回调函数.
			    options.success(userInfo)

		    } else { // 没有正确响应会话信息
			    var errorMessage = '登录请求没有包含会话响应，' + result.data.original.msg
			    var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage)
			
			    options.fail(noSessionError)
		    }
	    },
	
	    // 响应错误
	    fail: function (loginResponseError) {
		    var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，网络错误')
		
		    options.fail(error)
	    }
    }

    // 为请求添加签名（将get参数中添加sign、nounce等签名信息，另外还有版本号、source请求来源等信息）.
    sign(requestOptions)
    
    // 请求服务器登录地址，获得会话信息
    wx.request(requestOptions)
  })

  // 从本地数据中读取session_key.
  var session = Session.get()

  // 如果存在openid的话，说明当前微信用户已经授权过登录.
  if (session && session.openid) {

    // 验证当前登录态是否过期.
    wx.checkSession({

      // 没过期执行
      success: function () {
        options.success(session)
      },

      // 当前登录态过期，重新登录.
      fail: function () {
        Session.clear()
        doLogin()
      }
    })
  } else {
    doLogin()
  }
}

let setLoginUrl = function (loginUrl) {
  defaultOptions.loginUrl = loginUrl
}

export { LoginError, login, setLoginUrl }
