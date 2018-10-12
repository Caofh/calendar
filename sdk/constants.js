/**
 * Created by yazhou on 17/6/28.
 */

'use strict'

const constants = {

  // 构造请求头的key值
	WX_HEADER_CODE: 'X-WX-Code', // 登录凭证
	WX_HEADER_NO_CHECK: 'X-WX-No-Check', // 默认是1
	WX_HEADER_ENCRYPTED_DATA: 'X-WX-Encrypted-Data', // 会话秘钥
	WX_HEADER_RAW_DATA: 'X-WX-Raw-Data', // 用户信息json的转化字符串
	WX_HEADER_SIGNATURE: 'X-WX-Signature', // 用户的签名信息
	WX_HEADER_IV: 'X-WX-IV', // 用户的session-key
	WX_HEADER_SKEY: 'X-WX-Skey',
	WX_HEADER_EXPIRE: 'X-WX-Expire',
	WX_HEADER_SIGN: 'X-WX-Sign',
	
	// session id => 验证小程序登录（内部服务器配置，跟微信无关，用户验证是小程序登录的标识）
	// 再session.js中也有用到，作为本地存储session_id的key，用户判断登录态.
	WX_SESSION_MAGIC_ID: 'GFR9MHUQDBO-4CRTT0IQU6-45DSN4RLVHG',
	// auth id => 验证用户登录
	WX_AUTH_MAGIC_ID: 'SM8QPEO8H48-7LRQ7TP7GNG-GMLBP85AO2G',
	
	ERR_INVALID_PARAMS: 'ERR_INVALID_PARAMS', // 用在request方法中，判断传入的option不是object的情况
	
	ERR_WX_LOGIN_FAILED: 'ERR_WX_LOGIN_FAILED',
	ERR_WX_GET_USER_INFO: 'ERR_WX_GET_USER_INFO', // 用在微信小程序登录成功后，授权获取当前微信用户信息失败的情况
	ERR_LOGIN_TIMEOUT: 'ERR_LOGIN_TIMEOUT',
	ERR_LOGIN_FAILED: 'ERR_LOGIN_FAILED',
	ERR_LOGIN_SESSION_NOT_RECEIVED: 'ERR_LOGIN_MISSING_SESSION',
	
	ERR_INVALID_SESSION: 'ERR_INVALID_SESSION',
	ERR_CHECK_LOGIN_FAILED: 'ERR_CHECK_LOGIN_FAILED',
  
  // API请求来源（用在sign.js中，用作请求中添加签名来源）
	/*
		注：这里是一个appid对应一个SOURCE并且还要和接口对应相同的版本号，对应错误会登录失败.
	* */
  SOURCE: 31,
  DIV: '1.1.0', // 版本号（用在sign.js中，用作请求中添加版本号）

	// 注：不同的品牌小程序项目只需要切换不同的brand_id即可，其他的配置差异等由接口控制下发.重要：每个品牌替代码前都要检查品牌id，因为是一个仓库，要保证品牌id和appid是对应正确.
  // BRAND_ID: 10192, // 当前的品牌id，品牌：KENZO等，app-title：KENZO（接口下发）
  // BRAND_ID: 10268, // 当前的品牌id，品牌：MOSCHINO等，app-title：MOSCHINO（接口下发）
  // BRAND_ID: 10109, // 当前的品牌id，品牌：DOLCE等，app-title：DOLCE & GABBANA（接口下发）
  // BRAND_ID: 11867, // 当前的品牌id，品牌：JOMALONE等，app-title：小众香水（接口下发）
  // BRAND_ID: 12885, // 当前的品牌id，品牌：GOLDENGOOSE等，app-title：潮鞋精选（接口下发）
  // BRAND_ID: 10388, // 当前的品牌id，品牌：SAINT等，app-title：YSL（接口下发）
  // BRAND_ID: 10184, // 当前的品牌id，品牌：JIMMYCHOO等，app-title：高跟鞋精选（接口下发）
  // BRAND_ID: 14172, // 当前的品牌id，品牌：POLA等，app-title：日系高端美妆（接口下发）
  // BRAND_ID: 10300, // 当前的品牌id，品牌：PRADA等，app-title：PRADA MIU MIU VALENTINO（接口下发）
  BRAND_ID: 13721, // 当前的品牌id，品牌：YEEZY等，app-title：限量潮鞋精选（接口下发）

  FIRSTAUTH: false // 是否开启第一次访问小程序，调用微信授权弹框功能
}

export {constants}
