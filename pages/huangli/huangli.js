require("../../utils/util.js");
import { save } from '../../utils/dataCount'

var t = getApp(), a = new Date();

Page({
    onShareAppMessage: function(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        // console.log(res.target)
      } else if (res.from === 'menu') {
        // 来自页面内转发按钮
        // console.log(res.target)
      }

      // console.log("/pages/huangli/huangli?date=" + a.format("yyyy-MM-dd"))

      return {
        title: "日历工具",
        desc: "简单、好用的日历,农历、黄历",
        path:  "/pages/huangli/huangli?date=" + a.format("yyyy-MM-dd") + "&type=share_detail",
        success: function () {

          const para = {
            type: 2
          }
          save(para) // 统计首页分享数据，存入数据库

        },
        fail: function () {},
        complete: function () {}
      };
    },
    data: {
        gongli: "",
        date: "",
        nongli: "",
        nongli_str: "",
        ganzhi: "",
        yi: "",
        ji: "",
        xishen: "",
        fushen: "",
        caishen: "",
        yangguishen: "",
        yinguishen: "",
        taishen: "",
        xingxiu: "",
        pengzubaiji: "",
        chongsha: "",
        wuxing: "",
        jishiarray: {
            name: "子时",
            time: "23:00-00:59",
            caishen: "南北",
            xishen: "东北",
            jishi: "吉"
        },
        result: {},
        test: {},
        indicatorDots: !0,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3
    },
    nextTap: function() {
        a.setDate(a.getDate() + 1), this.fetchData();
    },
    prevTap: function() {
        a.setDate(a.getDate() - 1), this.fetchData();
    },
    todayTap: function() {
        a = new Date(), this.fetchData();
    },
    onLoad: function(t) {
        console.log("onLoad " + t.date), a = t.date ? new Date(t.date) : new Date(), this.fetchData();

      // console.log(path)
      // 数据统计
      if (t && t.type == 'share_detail') {
        const para = {
          type: 4 // 该用户是从其他用户的详情页(黄历页)分享进入
        }
        save(para) // 统计首页分享数据，存入数据库
      }
    },
    fetchData: function() {
        var e = a.format("yyyyMMdd"), i = this.data.result[e];
        void 0 == i ? t.getHuangliByMonth(a, this.callback) : this.bindData(i);
    },
    callback: function(t) {
        this.setData({
            result: t
        });
        var e = a.format("yyyyMMdd");
        this.bindData(t[e]);
    },
    bindData: function(t) {
        console.log("bindData: " + t);
        for (var e = t.cai.split(""), i = t.xi.split(""), n = parseInt(t.jishi).toString(2).split(""), s = 12 - n.length, h = 0; h < s; h++) n.unshift(0);
        for (var g = "正北 东北 正东 南北 正南 西南 正西 西北".split(" "), o = "凶吉".split(""), u = "23 01 03 05 07 09 11 13 15 17 19 21".split(" "), l = "00 02 04 06 08 10 12 14 16 18 20 22".split(" "), r = "子时 丑时 寅时 卯时 辰时 巳时 午时 未时 申时 酉时 戌时 亥时".split(" "), c = new Date(), y = new Array(), h = 0; h < 12; h++) {
            var d = new Object();
            d.name = r[h], d.time = u[h] + ":00-" + l[h] + ":59", d.caishen = g[e[h] - 1], d.xishen = g[i[h] - 1], 
            d.jishi = o[n[h]], console.log("time: " + c.getHours()), (c.getHours() + 1) / 2 >= h && (c.getHours() + 1) / 2 < h + 1 && !this.notToday() && (d.isSelected = !0), 
            y[h] = d;
        }
        this.setData({
            gongli: "公元 " + a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日",
            date: a.getDate(),
            nongli: t.nongli,
            nongli_str: t.nongli.split(' ')[1],
            ganzhi: t.ganzhi,
            yi: t.yi,
            ji: t.ji,
            xishen: t.xishen,
            fushen: t.fushen,
            caishen: t.caishen,
            yangguishen: t.yangguishen,
            yinguishen: t.yinguishen,
            taishen: t.taishen,
            xingxiu: t.xingxiu,
            pengzubaiji: t.pengzubaiji,
            chongsha: t.chongsha,
            wuxing: t.riwuxing,
            jishiarray: y,
            notToday: this.notToday()
        });
    },
    notToday: function() {
        var t = new Date();
        return a.getFullYear() != t.getFullYear() || a.getMonth() != t.getMonth() || a.getDate() != t.getDate();
    }
});