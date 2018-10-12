// 引入接口地址文件
import { requestApi } from '../api'

// 数据统计接口
function save(options) {
  const baseInfo = wx.getStorageSync('userinfo') || ''
  baseInfo.type = options.type // 固定值（表明是小程序index页面点击右上角分享数据统计）

  const url = requestApi.dataCount
  const params = baseInfo

  // 小程序数据统计接口
  getApp().ajax({
    url: url,
    type: 'POST',
    para: params,
    login: false,
    success: function (data) {
      console.log(data)
    },
    fail: function (error) {},
    complete: function () {}

  })

}


module.exports = {
  save: save,
};