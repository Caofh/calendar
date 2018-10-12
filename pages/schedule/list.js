var t = require("../../utils/util.js"), a = require("../../utils/common.js"), e = getApp();

Page({
    data: {},
    onLoad: function(t) {
        e.globalData.userInfo && e.globalData.xkey && e.globalData.sessionID ? this.load() : e.userInfoReadyCallback = function() {
            e.globalData.userInfo && e.globalData.xkey && e.globalData.sessionID ? this.load() : wx.showToast({
                title: "请授权后查看页面内容"
            });
        }.bind(this);
    },
    loadList: function() {
        wx.showLoading({
            title: "加载中..."
        }), a.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/schedule/wxList.do?cid=" + this.cid,
            method: "GET",
            dataType: "json",
            success: function(t) {
                wx.hideLoading(), console.log(t), "ok" == t.data.state ? this.initData(t.data) : (this.setData({
                    failed: !0
                }), wx.showToast({
                    title: "加载失败！"
                }));
            }.bind(this),
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "加载失败！"
                }), this.setData({
                    failed: !0
                });
            }
        });
    },
    load: function() {
        if (e.globalData.cid) return this.cid = e.globalData.cid, void this.loadList();
        wx.showLoading({
            title: "加载中..."
        }), a.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/account/getPersonalDetail.do",
            method: "GET",
            dataType: "json",
            success: function(t) {
                wx.hideLoading(), "ok" == t.data.state ? (this.cid = t.data.primary_cid, this.loadList()) : (wx.showToast({
                    title: "加载失败"
                }), this.setData({
                    failed: !0
                }));
            }.bind(this),
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "加载失败"
                }), this.setData({
                    failed: !0
                });
            }.bind(this)
        });
    },
    onReady: function() {},
    onShow: function() {
        1 == e.globalVariable.refreshList && (e.globalVariable.refreshList = !1, this.load());
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getWeek: function(a) {
        var e = new Date(Date.parse(a));
        return t.getChineseWeekday(e).replace("星期", "周");
    },
    initData: function(t) {
        var a = [], e = !0, i = !0, s = null;
        if (t.preData && t.preData.length > 0) {
            for (D = 0; D < t.preData.length; D++) if (t.preData[D].displayTime = this.displayTime(t.preData[D]), 
            t.preData[D].birthId) {
                r = "";
                1 != t.preData[D].isIgnoreYear ? (r = (h = (d = new Date(Date.parse(t.preData[D].start_time.replace(new RegExp("-", "gm"), "/")))).getFullYear()) - t.preData[D].year, 
                t.preData[D].birthText = 0 == r ? t.preData[D].name + ("[纪念日]" == t.preData[D].note ? "今天纪念日" : "今天出生") : t.preData[D].name + r + ("[纪念日]" == t.preData[D].note ? "周年" : "岁生日")) : t.preData[D].birthText = t.preData[D].name + ("[纪念日]" == t.preData[D].note ? "纪念日" : "生日");
            }
            for (D = 0; D < t.preData.length; ) {
                for (var n = t.preData[D].start_time.split(" ")[0], o = [], l = D; l < t.preData.length && (u = t.preData[l].start_time.split(" ")[0]) == n; l++) o.push(t.preData[l]);
                D = l, a.push({
                    time: n,
                    week: this.getWeek(n),
                    display_time: n.substr(5),
                    list: o
                });
            }
        } else i = !1;
        if (t.nextData && t.nextData.length > 0) {
            for (D = 0; D < t.nextData.length; D++) if (t.nextData[D].displayTime = this.displayTime(t.nextData[D]), 
            t.nextData[D].birthId) {
                var r = "";
                if (1 != t.nextData[D].isIgnoreYear) {
                    var d = new Date(Date.parse(t.nextData[D].start_time.replace(new RegExp("-", "gm"), "/"))), h = d.getFullYear();
                    r = h - t.nextData[D].year, t.nextData[D].birthText = 0 == r ? t.nextData[D].name + ("[纪念日]" == t.nextData[D].note ? "今天纪念日" : "今天出生") : t.nextData[D].name + r + ("[纪念日]" == t.nextData[D].note ? "周年" : "岁生日");
                } else t.nextData[D].birthText = t.nextData[D].name + ("[纪念日]" == t.nextData[D].note ? "纪念日" : "生日");
            }
            for (var D = 0; D < t.nextData.length; ) {
                for (var n = t.nextData[D].start_time.split(" ")[0], o = [], l = D; l < t.nextData.length; l++) {
                    var u = t.nextData[l].start_time.split(" ")[0];
                    if (u != n) break;
                    o.push(t.nextData[l]);
                }
                var p = {
                    time: n,
                    week: this.getWeek(n),
                    display_time: n.substr(5),
                    list: o
                };
                if (0 == D) {
                    p.viewid = "first_to_show", s = "first_to_show";
                }
                D = l, a.push(p);
            }
        } else e = !1;
        this.setData({
            failed: !1,
            next: t.next,
            previous: t.previous,
            toView: s,
            hasPrevData: i,
            hasFutureData: e,
            scheduleList: a
        });
    },
    toUpper: function() {
        if (1 == this.data.hasPrevData) {
            if (this.loading) return;
            this.loading = !0, this.loadPrevData();
        }
    },
    onScroll: function(t) {},
    toLower: function(t) {
        if (1 == this.data.hasFutureData) {
            if (this.loading) return;
            this.loading = !0, this.loadNextData();
        }
    },
    displayTime: function(a) {
        if (a.birthId) return null != a.note && "[纪念日]" == a.note ? "纪念日" : "生日";
        if (a.allday_event) return "全天日程";
        var e = "", i = a.start_time.replace(new RegExp("-", "gm"), "/");
        if (i = i.substr(0, i.lastIndexOf(":")), a.duration > 0) {
            var s = new Date(a.start_time.replace(new RegExp("-", "gm"), "/"));
            s.setTime(s.getTime() + 1e3 * a.duration);
            var n = t.formatTime(s);
            return n = n.substr(0, n.lastIndexOf(":")), e = " - " + n, i.split(" ")[0] == n.split(" ")[0] ? "时间：" + i.split(" ")[1] + " - " + n.split(" ")[1] : "时间：" + i + e;
        }
        return "时间：" + i.split(" ")[1];
    },
    appendData: function(t, a) {
        var e, i = this.data.scheduleList, s = [];
        if (t.data.length > 0) {
            for (o = 0; o < t.data.length; o++) if (t.data[o].displayTime = this.displayTime(t.data[o]), 
            t.data[o].birthId) {
                var n = "";
                1 != t.data[o].isIgnoreYear ? (n = new Date(Date.parse(t.data[o].start_time.replace(new RegExp("-", "gm"), "/"))).getFullYear() - t.data[o].year, 
                t.data[o].birthText = 0 == n ? t.data[o].name + ("[纪念日]" == t.data[o].note ? "今天纪念日" : "今天出生") : t.data[o].name + n + ("[纪念日]" == t.data[o].note ? "周年" : "岁生日")) : t.data[o].birthText = t.data[o].name + ("[纪念日]" == t.data[o].note ? "纪念日" : "生日");
            }
            for (var o = 0; o < t.data.length; ) {
                for (var l = t.data[o].start_time.split(" ")[0], r = [], d = o; d < t.data.length && t.data[d].start_time.split(" ")[0] == l; d++) r.push(t.data[d]);
                o = d;
                var h = {
                    time: l,
                    week: this.getWeek(l),
                    display_time: l.substr(5),
                    list: r
                };
                s.push(h);
            }
            "append" == a ? (i[i.length - 1].viewid = "next_show_" + new Date().getTime(), this.setData({
                next: t.next,
                hasFutureData: !0,
                scheduleList: i.concat(s)
            })) : (s[s.length - 1].viewid = "next_show_" + new Date().getTime(), e = s[s.length - 1].viewid, 
            this.setData({
                toView: e,
                previous: t.previous,
                hasPrevData: !0,
                scheduleList: s.concat(i)
            }));
        } else "append" == a ? this.setData({
            hasFutureData: !1
        }) : this.setData({
            hasPrevData: !1
        });
    },
    loadNextData: function() {
        wx.showLoading({
            title: "加载中..."
        }), a.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/schedule/wxNextDataList.do?fromDate=" + this.data.next + "&cid=" + this.cid,
            method: "GET",
            dataType: "json",
            success: function(t) {
                console.log(t), "ok" == t.data.state ? this.appendData(t.data, "append") : wx.showToast({
                    title: "加载失败！"
                }), wx.hideLoading(), this.loading = !1;
            }.bind(this),
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "加载失败！"
                }), this.loading = !1;
            }
        });
    },
    loadPrevData: function() {
        wx.showLoading({
            title: "加载中..."
        }), a.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/schedule/wxPreDataList.do?fromDate=" + this.data.previous + "&cid=" + this.cid,
            method: "GET",
            dataType: "json",
            success: function(t) {
                "ok" == t.data.state ? this.appendData(t.data, "prepend") : wx.showToast({
                    title: "加载失败！"
                }), wx.hideLoading(), this.loading = !1;
            }.bind(this),
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "加载失败！"
                }), this.loading = !1;
            }
        });
    },
    onSchedule: function(t) {
        var a = t.currentTarget.dataset.item;
        if (a.birthId) wx.navigateTo({
            url: "/pages/schedule/birth?bid=" + a.birthId
        }); else {
            var e = a.cid, i = a.uuid;
            wx.navigateTo({
                url: "/pages/schedule/detail?cid=" + e + "&uuid=" + i
            });
        }
    },
    onReload: function(t) {
        this.load();
    }
});