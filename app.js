var o = require("./utils/citycode.js");
import { config } from './config'
import { request, setLoginUrl, extend, constants, login } from './sdk/index'

App({
  rili: require("utils/common.js"),
  onLaunch: function() {
    wx.getSystemInfo({
      success: function(o) {
        this.iphonex = -1 != o.model.indexOf("iPhone X"), this.windowHeight = o.windowHeight,
          this.windowWidth = o.windowWidth;
      }.bind(this)
    }), this.checkLogin(function() {
      o.getCitycode(!1, null);
    });
  },
  checkLogin: function(o) {
    console.log("checking login status"), this.globalData.userInfo && this.globalData.xkey && this.globalData.sessionID ? (console.log("already logined"),
    "function" == typeof o && o(this.globalData)) : (console.log("not logined"), wx.checkSession({
      success: function() {
        console.log("checkSession success"), this.getUserInfo(), console.log("global data"),
          console.log(this.globalData), this.globalData.xkey && this.globalData.sessionID ? "function" == typeof o && o(this.globalData) : this.doLogin(o);
      }.bind(this),
      fail: function() {
        console.log("checkSession fail"), this.doLogin(o);
      }.bind(this)
    }));
  },
  doLogin: function(o) {
    console.log("redo login"), console.log("do wx.login()"), wx.login({
      fail: function(o) {
        wx.showToast({
          title: "获取授权失败",
          icon: "loading",
          duration: 2e3
        });
      },
      success: function(t) {
        console.log(t), console.log("get prelogin.do"), this.rili.load({
          url: "/wx/miniapp/prelogin.do",
          data: {
            code: t.code
          },
          success: function(t) {
            console.log(t), "ok" == t.data.state && t.data.data.session && (this.globalData.sessionID = t.data.data.session,
              console.log("do wx.getUserInfo()"), wx.getUserInfo({
              fail: function(t) {
                "function" == typeof o && o(!1);
              },
              success: function(s) {
                console.log(s), console.log("get login.do"), this.rili.load({
                  url: "/wx/miniapp/login.do",
                  method: "POST",
                  data: {
                    raw: s.encryptedData,
                    iv: s.iv,
                    session: t.data.data.session
                  },
                  success: function(t) {
                    console.log(t), "ok" == t.data.state ? (this.globalData.userInfo = t.data, console.log(t.data),
                      this.saveUserInfo(), this.getUserInfo(), "function" == typeof o && o(this.globalData)) : wx.showToast({
                      icon: "none",
                      title: "登录失败"
                    });
                  }.bind(this)
                });
              }.bind(this)
            }));
          }.bind(this)
        });
      }.bind(this)
    });
  },
  clearAuth: function() {
    this.globalData.userInfo = {}, this.saveUserInfo();
  },
  saveUserInfo: function() {
    console.log("save"), console.log(this.globalData), wx.setStorageSync("userInfo", this.globalData.userInfo),
      wx.setStorageSync("cid", this.globalData.userInfo.primary_cid), wx.setStorageSync("xkey", this.globalData.userInfo["x-365-http-key"]),
      wx.setStorageSync("sessionID", this.globalData.sessionID);
  },
  getUserInfo: function() {
    console.log("getUserInfo"), this.globalData.userInfo = wx.getStorageSync("userInfo"),
      this.globalData.xkey = wx.getStorageSync("xkey"), this.globalData.sessionID = wx.getStorageSync("sessionID"),
      this.globalData.cid = wx.getStorageSync("cid"), this.userInfoReadyCallback ? (this.userInfoReadyCallback(),
      console.log("hehehe")) : console.log("hahaha"), console.log("the data"), console.log(this.globalData);
  },
  getHuangliByMonth: function(o, t) {
    var s = [ o.getFullYear(), o.getMonth() + 1 ].join("-").replace(/(\D)(\d)(?=\D|$)/g, "$10$2").replace(/-/g, ""), e = wx.getStorageSync("hl" + s);
    if (e) console.log("get huangli data cache is: " + (void 0 == e)), t(e); else {
      wx.request({
        url: "https://www.365rili.com/third_cooperation/qqgroup/yjdata/" + s + ".json",
        header: {
          "Content-Type": "application/json"
        },
        success: function(o) {
          console.log("get huangli data online is: " + o), wx.setStorage({
            key: "hl" + s,
            data: o.data
          }), t(o.data);
        }
      });
    }
  },




  // 微信登录方法
  login(callback) {
    wx.login({
      success: function (res) {
        // console.log(res)

        if (res.code) {
          //发起网络请求
          const url = config.apiUrl + '/account/calendarLogin/wx_login'
          getApp().ajax({
            url: url || '',
            type: 'POST',
            login: false,
            para: {
              code: res.code || ''
            },
            success(data) {
              // console.log(data)
              // return false

              callback && callback(data)

            },
            fail(error) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: error,
                success: function (confirm, cancel) {
                  if (confirm) {

                    // 判断如果是用户未授权的情况.
                    if (error.indexOf('ERR_WX_GET_USER_INFO') >= 0) {

                      // 跳转到重新授权页面
                      // wx.navigateTo({
                      //   url: '/pages/account/authorize/authorize',
                      // })

                    }
                  }
                }
              })

            },
            complete() {

            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)

        }
      }
    });

  },
  request(options, success, fail, complete) {
    request(extend(true, {
      method: 'GET',
      data: {},
      // 请求之前是否需要授权登陆，如果该项指定为 true，会在请求之前进行授权登录
      login: true,

      success(res) {
        if (res.data && res.data.original && res.data.original.status == 'fail') {
          return fail && fail(res.data.original.msg)
        }

        success && success(res.data)
      },

      fail(error) {
        // request:fail 可能是网络原因
        fail && fail(error.type ? (error.type + error.message) : (error.errMsg ? error.errMsg : error))
      },

      complete() {
        complete && complete()
      }
    }, options))
  },

  // 二次封装request方法.
  ajax(option) {
    let url = option.url || ''
    let data = option.para || ''
    let method = option.type || ''
    let login = option.login || '' // 请求之前是否需要授权登陆，如果该项指定为 true，会在请求之前进行授权登录
    let success = option.success || ''
    let fail = option.fail || ''
    let complete = option.complete || ''

    let option_new = {
      url: url,
      data: data,
      method: method,
      login: login
    }

    this.request(option_new, success, fail, complete)
  },

  iphonex: !1,
  windowHeight: 0,
  windowWidth: 0,
  globalVariable: {},
  globalData: {
    citycode: null,
    userInfo: null,
    xkey: null,
    sessionID: null
  }
});