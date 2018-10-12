/**
 * Created by yazhou on 17/6/28.
 */

'use strict'

import {constants} from './constants'

const SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID

const Session = {
	get: function () {
		let val = null
		
		try {
			val = wx.getStorageSync(SESSION_KEY) || null
		} catch (e) {
			//
		}
		
		return val
	},
	
	set: function (session) {
		try {
			wx.setStorageSync(SESSION_KEY, session)
		} catch (e) {
			//
		}
	},
	
	clear: function () {
		try {
			wx.removeStorageSync(SESSION_KEY)
		} catch (e) {
			//
		}
	},
}

export {Session}
