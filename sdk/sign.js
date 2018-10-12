/**
 * 接口签名
 *
 * */

'use strict'

import { constants } from './constants'
import { extend } from './extend'
import md5 from '../utils/md5.min'

// 根据请求方式进行参数签名
function sign(options) {
	let url = options.url
	
	// 获取url参数中的键值对
	let result = url.match(/\?(.*)$/)
	let query = result ? result[1] : ''
	let queryObj = query.split('&').reduce(function (accelerator, item) {
		if (item) {
			let obj = item.split('=')
			accelerator[obj[0]] = obj[1]
		}
		
		return accelerator
	}, {})

	// 签名随机值
	let nounce = Math.random().toString(32).substring(2) + Math.random().toString(32).substring(2)
	
	// diu 当前应用唯一值（去本地存储中的diu，如果没有的话，则重新按照规则生成一个diu，并存储到本地）
	let diu = ''
	
	try {
		diu = wx.getStorageSync('diu')
	} catch (e) {
		//
	}
	
	if (! diu) {
		diu = md5(nounce + 'ofashion_mars')
		
		try {
			diu = wx.setStorageSync('diu', diu)
		} catch (e) {
			//
		}
	}
	
	queryObj.source = constants.SOURCE // 项目来源
	queryObj.div = constants.DIV // 项目版本号
	queryObj.diu = diu // 当前应用唯一值
	queryObj.channel = options.data.channel
	queryObj.login_uid = options.data.login_uid
	queryObj.openid = options.data.openid
	queryObj.unionid = options.data.unionid
	// queryObj.login_token = options.data.login_token
	
	// POST参数不参与签名
	if (options.method == 'GET') {
		queryObj = extend(true, queryObj, options.data)
		options.data = {}
	} else {
	  // POST请求，以下参数不需要放在请求data里，这些参数里已在url参数做了签名
		['login_uid', 'login_token', 'openid', 'unionid'].forEach(function (key) {
			delete options.data[key]
		})
  }
	
	for (var p in queryObj) {
		let val = queryObj[p]
		
		if (val == undefined || val === '') {
			delete queryObj[p]
		}
	}
	
	queryObj.sign = generateSignature(queryObj, nounce)
	queryObj.nounce = nounce
	
	let queryStr = Object.keys(queryObj).reduce(function (accelerator, item) {
		var str = item + '=' + queryObj[item]
		accelerator.push(str)
		
		return accelerator
	}, []).join('&')
	
	options.url = url.replace(/\?.*/, '') + '?' + queryStr
}

// 生成签名
function generateSignature(params, nounce) {
  let temp = extend(true, {}, params)
	
	temp['nounce'] = nounce
	temp = ksort(temp)

  let arr = []
  
  for (let p in temp) {
    if (temp.hasOwnProperty(p)) {
	    arr.push(p + '=' + temp[p])
    }
  }
  
  // let str = arr.join('&') + (params.login_uid ? params.login_token : '') + 'ofashion' + nounce
  let str = arr.join('&') + 'ofashion' + nounce

  // console.log(str)
  // console.log(md5(str))

  return md5(str)
}


// ksort
function ksort(inputArr, sortFlag) {
  //  discuss at: http://phpjs.org/functions/ksort/  
  // original by: GeekFG (http://geekfg.blogspot.com)  
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)  
  // improved by: Brett Zamir (http://brett-zamir.me)  
  //        note: The examples are correct, this is a new way  
  //        note: This function deviates from PHP in returning a copy of the array instead  
  //        note: of acting by reference and returning true; this was necessary because  
  //        note: IE does not allow deleting and re-adding of properties without caching  
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to  
  //        note: get the PHP behavior, but use this only if you are in an environment  
  //        note: such as Firefox extensions where for-in iteration order is fixed and true  
  //        note: property deletion is supported. Note that we intend to implement the PHP  
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since  
  //        note: is by reference in PHP anyways  
  //        note: Since JS objects' keys are always strings, and (the  
  //        note: default) SORT_REGULAR flag distinguishes by key type,  
  //        note: if the content is a numeric string, we treat the  
  //        note: "original type" as numeric.  
  //  depends on: i18n_loc_get_default  
  //  depends on: strnatcmp  
  //   example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};  
  //   example 1: data = ksort(data);  
  //   example 1: $result = data  
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}  
  //   example 2: ini_set('phpjs.strictForIn', true);  
  //   example 2: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};  
  //   example 2: ksort(data);  
  //   example 2: $result = data  
  //   returns 2: {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}  

  var tmp_arr = {},
    keys = [],
    sorter, i, k, that = this,
    strictForIn = false,
    populateArr = {}
  
  switch (sortFlag) {
    case 'SORT_STRING':
      // compare items as strings  
      sorter = function (a, b) {
        return that.strnatcmp(a, b)
      }
      
      break
    case 'SORT_LOCALE_STRING':
      // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)  
      var loc = this.i18n_loc_get_default()
      sorter = this.php_js.i18nLocales[loc].sorting
      
      break
    case 'SORT_NUMERIC':
      // compare items numerically  
      sorter = function (a, b) {
        return ((a + 0) - (b + 0))
      }
      
      break
    // case 'SORT_REGULAR': // compare items normally (don't change types)  
    default:
      sorter = function (a, b) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + '' === a,
          bNumeric = bFloat + '' === b
        
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0
        } else if (aNumeric && ! bNumeric) {
          return 1
        } else if (! aNumeric && bNumeric) {
          return -1
        }
        return a > b ? 1 : a < b ? -1 : 0
      }
      
      break
  }

  // Make a list of key names  
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k)
    }
  }
  
  keys.sort(sorter)

  // BEGIN REDUNDANT  
  var php_js = php_js || {}
  php_js.ini = php_js.ini || {}
  
  // END REDUNDANT  
  strictForIn = php_js.ini['phpjs.strictForIn'] && php_js.ini['phpjs.strictForIn'].local_value && php_js
    .ini['phpjs.strictForIn'].local_value !== 'off'
  populateArr = strictForIn ? inputArr : populateArr

  // Rebuild array with sorted key names  
  for (i = 0; i < keys.length; i++) {
    k = keys[i]
    tmp_arr[k] = inputArr[k]
    
    if (strictForIn) {
      delete inputArr[k]
    }
  }
  
  for (i in tmp_arr) {
    if (tmp_arr.hasOwnProperty(i)) {
      populateArr[i] = tmp_arr[i]
    }
  }

  return strictForIn || populateArr
}

export {sign}