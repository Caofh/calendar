/**
 * Created by yazhou on 17/6/28.
 */

'use strict'

// 支持深拷贝
function extend() {
	let options, name, src, copy, copyIsArray, clone
	let target = arguments[0] || {}
	let i = 1
	let length = arguments.length
	let deep = false
	
	if (typeof target === 'boolean') {
		deep = target
		target = arguments[i] || {}
		i++
	}
	
	if (! isPlainObject(target)) target = {}
	
	for (; i < length; i++) {
		if ((options = arguments[i]) != null) {
			
			for (name in options) {
				src = target[name]
				copy = options[name]
				
				if (target === copy) continue
				
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false
						clone = src && Array.isArray(src) ? src : []
					} else {
						clone = src && isPlainObject(src) ? src : {}
					}
					
					target[name] = extend(deep, clone, copy)
				} else if (copy !== undefined) {
					target[name] = copy
				}
			}
		}
	}
	
	return target
}

let proto = Object.prototype

// 普通对象
function isPlainObject(obj) {
	if (proto.toString.call(obj) !== '[object Object]') {
		return false
	}
	
	if (obj.constructor && ! proto.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
		return false
	}
	
	return true
}

export {extend}
