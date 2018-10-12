var t = require("../../utils/util.js"), e = require("../../utils/citycode.js"), a = (require("../../utils/trafficUtil.js"),
  require("../../utils/lunar.js")), i = require("../../utils/holidays.js"), n = new Date(), r = new Date(), o = new Date(), s = getApp();

// 引入接口地址文件
import { requestApi } from '../../api'
import { save } from '../../utils/dataCount'

Page({
  onShareAppMessage: function(res) {
    let shareObj = {
      title: "日历工具",
      desc: "简单、好用的日历,农历、黄历",
      path: "/pages/calendar/index?type=share_index",
      success: function () {},
      fail: function () {},
      complete: function () {}
    }

    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 1.5 // 该用户是点击分享按钮，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }

    } else if (res.from === 'menu') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 1 // 该用户是点击右上角，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }
    }

    return shareObj;

  },
  data: {
    yiji: {},
    limitinfo: "",
    notToday: !1
  },
  currentGrid: 0,
  onLoad: function(path) {
    this.setGrids(o);

    // console.log(path)
    // 数据统计
    if (path && path.type == 'share_index') {
      const para = {
        type: 3 // 该用户是从其他用户的首页分享进入
      }
      save(para) // 统计首页分享数据，存入数据库
    }

  },
  setGrids: function(t) {
    for (var e = new a.Calendar(t).getCalendarSundayFirstDate(), i = [], o = 0; o < 42; o++) i.push(this.getGridInfo(e, o));
    this.setData({
      grids: i,
      title: t.format("yyyy.MM"),
      selectedDate: r.format("yyyy-MM-dd"),
      dayInfo: this.getDayInfo(r),
      dayInfoGanzhi: this.getDayGanzhiInfo(r),
      notToday: r.getFullYear() != n.getFullYear() || r.getMonth() != n.getMonth() || r.getDate() != n.getDate()
    }), this.getYiJiData(), this.getTrafficList();
  },
  getTrafficList: function() {
    r.format("yyyy-MM-dd");
  },
  genTraffic: function(t) {
    console.log("genTraffic:" + t);
    var e = "无限行信息", a = "bindTrafficViewNone";
    void 0 == t ? e = "无限行信息" : t.number ? (e = "限行尾号：" + t.number.join("，"), a = "bindTrafficViewTap") : t.desc && (e = t.desc,
      a = "bindTrafficViewTap"), this.setData({
      limitinfo: e
    }), this.setData({
      bindTrafficViewTap: a
    });
  },
  getDayInfo: function(e) {
    var i = new a.Lunar(e);
    return {
      date: e.format("yyyy年MM月dd日"),
      date_day: e.format("dd"),
      dateInfo: t.getChineseWeekday(e) + " 农历 " + i.lMonth + "月" + i.lDate
    }
  },
  getDayGanzhiInfo: function(t) {
    var e = new a.Lunar(t);
    return e.gzYear + "年[" + e.animal + "年] " + e.gzMonth + "月 " + e.gzDate + "日";
  },
  getGridInfo: function(t, e) {
    var s = new Date(t);
    s.setDate(s.getDate() + e);
    var d = new a.Lunar(s), g = {
      i: e,
      date: s,
      solarData: s.getDate(),
      lunarData: d.term || d.lDate,
      isToday: s.getFullYear() == n.getFullYear() && s.getMonth() == n.getMonth() && s.getDate() == n.getDate(),
      isCurrentMonth: s.getFullYear() == o.getFullYear() && s.getMonth() == o.getMonth(),
      isSelected: s.getFullYear() == r.getFullYear() && s.getMonth() == r.getMonth() && s.getDate() == r.getDate(),
      holidayStatus: i.holidayStatusForDate(s)
    };
    return g.isSelected && (this.currentGrid = e), g;
  },
  gotoDate: function(t) {
    o = new Date(t), r = new Date(t), this.setGrids(o);
  },
  gotoPrevNextMonth: function(t) {
    t ? o.setMonth(o.getMonth() + 1) : o.setMonth(o.getMonth() - 1), o.setDate(1), r = o.getFullYear() == n.getFullYear() && o.getMonth() == n.getMonth() ? new Date(n) : new Date(o),
      this.setGrids(o);
  },
  bindDayViewTap: function() {
    wx.navigateTo({
      url: "../huangli/huangli?date=" + r.format("yyyy-MM-dd")
    });
  },
  bindTrafficViewTap: function() {
    e.getCitycode(!0, function(t) {
      wx.navigateTo({
        url: "../traffic/traffic?date=" + r.format("yyyy-MM-dd") + "&citycode=" + t
      });
    });
  },
  bindTrafficViewNone: function() {},
  getYiJiData: function() {
    var t = r.format("yyyyMMdd"), e = this.data.yiji[t];
    void 0 == e ? s.getHuangliByMonth(r, this.yiJiCallback) : this.bindYiJi(e);
  },
  yiJiCallback: function(t) {
    if (t) {
      this.setData({
        yiji: t
      });
      var e = t[r.format("yyyyMMdd")];
      this.bindYiJi(e);
    }
  },
  bindYiJi: function(t) {
    this.setData({
      yi: t.yi,
      ji: t.ji
    });
  },
  bindGridTap: function(t) {
    if (this.currentGrid != t.currentTarget.dataset.i) {
      var e = new Date(t.currentTarget.dataset.date);
      e.getMonth() == o.getMonth() && (this.data.grids[this.currentGrid].isSelected = !1,
        this.currentGrid = t.currentTarget.dataset.i, this.data.grids[this.currentGrid].isSelected = !0,
        r = e, this.setData({
        grids: this.data.grids,
        selectedDate: r.format("yyyy-MM-dd"),
        dayInfo: this.getDayInfo(r),
        dayInfoGanzhi: this.getDayGanzhiInfo(r),
        notToday: r.getFullYear() != n.getFullYear() || r.getMonth() != n.getMonth() || r.getDate() != n.getDate()
      }), this.getYiJiData(), this.getTrafficList());
    }
  },
  bindPrevMonthTap: function() {
    this.gotoPrevNextMonth(!1);
  },
  bindNextMonthTap: function() {
    this.gotoPrevNextMonth(!0);
  },
  bindTodayTap: function() {
    r.getFullYear() == n.getFullYear() && r.getMonth() == n.getMonth() && r.getDate() == n.getDate() || this.gotoDate(n);
  },
  bindDateChange: function(t) {
    this.gotoDate(new Date(t.detail.value));
  },
  toList: function() {
    wx.navigateTo({
      url: "/pages/schedule/list"
    });
  },



  // 登录相关
  bindGetUserInfo(e) {
    // console.log(e.detail.userInfo)

    // 用户同意授权，才将数据上传到login接口
    if (e.detail.userInfo) {
      this.stoBaseInfo(e.detail.userInfo)
    }

  },
  // 拼合用户信息和openid等信息，存入storage
  stoBaseInfo(userInfo) {
    // console.log(userInfo)
    const that = this
    let baseInfo = userInfo || {}

    getApp().login((data) => {
      // console.log(data)

      baseInfo.openid = data.original.openid || ''
      baseInfo.session_key = data.original.session_key || ''

      // 小程序注册接口
      const url = requestApi.register
      const params = baseInfo

      getApp().ajax({
        url: url,
        type: 'POST',
        para: params,
        login: false,
        success: function (data) {
          // console.log(data)

        },
        fail: function (error) {

        },
        complete: function () {
          that.setData({
            userInfo: baseInfo
          })
          wx.setStorageSync('userinfo', baseInfo)

        }

      })

    })

  },
});