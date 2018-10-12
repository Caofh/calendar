
'use strict'

import { config } from './config'

const HOST_URL = config.apiUrl
// const UPLOAD_URL = config.uploadUrl

let requestApi = {
  register: HOST_URL + '/account/calendarLogin/register', // 小程序注册接口
  dataCount: HOST_URL + '/account/calendarLogin/data_count', // 数据统计接口

}

export { requestApi }