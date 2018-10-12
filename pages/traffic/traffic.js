require("../../utils/citycode.js"), require("../../utils/util.js");

var t = null, e = null;

getApp();

Page({
    onShareAppMessage: function() {
        return {
            title: "365日历，动动指尖，规划时间",
            desc: "简单、好用的日历，随时查看日历、农历、黄历、限行",
            path: "/pages/traffic/traffic?date=" + t + "&citycode=" + e
        };
    },
    data: {
        limitclass: "",
        city: "",
        number1: "",
        number2: "",
        tomorrowinfo: "",
        afterinfo: "",
        tomorrow1: "n_none",
        tomorrow2: "n_none",
        after1: "n_none",
        after2: "n_none",
        G: []
    },
    onLoad: function(a) {
        console.log("onLoad traffic:" + a.date + "\n citycode:" + a.citycode), t = a.date, 
        e = a.citycode, this.requestData(a.citycode, a.date);
    },
    requestCB: function(t) {
        console.log("requestCB:" + JSON.stringify(t));
        var e = t.data[0];
        this.setDate(e), this.setLimitNum(e), this.setCity(t.city), this.setOtherLimitInfo(t.data[1], !0), 
        this.setOtherLimitInfo(t.data[2], !1), this.setRule(t.desc);
    },
    requestData: function(t, e) {
        console.log("requestdata:" + t);
        var a = this;
        wx.request({
            url: "https://www.365rili.com/traffic/detailwx.do",
            data: {
                citycode: t,
                date: e
            },
            success: function(t) {
                console.log("request success"), console.log("traffic data:" + JSON.stringify(t.data)), 
                a.setData({
                    G: t.data.data
                }), a.requestCB(t.data);
            },
            fail: function(t) {
                console.log("request failed"), console.log(JSON.stringify(t));
            },
            complete: function() {
                console.log("request complete");
            }
        });
    },
    setLimitNum: function(t) {
        0 == t.category ? -1 == t.number[0] ? this.setData({
            limitclass: "noLimit",
            number1: "不",
            number2: "限"
        }) : 1 == t.number.length ? this.setData({
            limitclass: "single",
            number1: t.number[0]
        }) : this.setData({
            number1: t.number[0],
            number2: t.number[1]
        }) : (1 == t.number[0] ? this.setData({
            number1: "单"
        }) : this.setData({
            number1: "双"
        }), this.setData({
            number2: "号"
        }));
    },
    setCity: function(t) {
        this.setData({
            city: t
        });
    },
    setOtherLimitInfo: function(t, e) {
        console.log("tommo:" + e), 0 == t.category ? -1 == t.number[0] ? e ? this.setData({
            tomorrowinfo: "不限行"
        }) : this.setData({
            afterinfo: "不限行"
        }) : 1 == t.number.length ? e ? this.setData({
            tomorrow1: "n_" + t.number[0]
        }) : this.setData({
            after1: "n_" + t.number[0]
        }) : (e ? this.setData({
            tomorrow1: "n_" + t.number[0]
        }) : this.setData({
            after1: "n_" + t.number[0]
        }), e ? this.setData({
            tomorrow2: "n_" + t.number[1]
        }) : this.setData({
            after2: "n_" + t.number[1]
        })) : 1 == t.number[0] ? e ? this.setData({
            tomorrowinfo: "单号限行"
        }) : this.setData({
            afterinfo: "单号限行"
        }) : e ? this.setData({
            tomorrowinfo: "双号限行"
        }) : this.setData({
            afterinfo: "双号限行"
        });
    },
    setDate: function(t) {
        var e = new Date(t.time.replace(/-/g, "/")), a = new Date();
        a.setHours(0, 0, 0, 0), +e == +a ? this.setData({
            date: a.getMonth() + 1 + "-" + a.getDate() + " 星期" + [ "天", "一", "二", "三", "四", "五", "六" ][a.getDay()]
        }) : this.setData({
            date: e.getMonth() + 1 + "月" + e.getDate() + "日 星期" + [ "天", "一", "二", "三", "四", "五", "六" ][e.getDay()]
        });
    },
    setRule: function(t) {
        this.setData({
            rule: t
        });
    }
});