var e = getApp(), t = require("../../utils/common.js"), a = require("../../utils/repeat.js");

Page({
    data: {},
    onLoad: function(t) {
        console.log(t), this.cid = t.cid, this.uuid = t.uuid, this.key = t.share, e.globalData.userInfo && e.globalData.xkey && e.globalData.sessionID ? this.getData() : e.userInfoReadyCallback = function() {
            e.globalData.userInfo && e.globalData.xkey && e.globalData.sessionID ? this.getData() : wx.showToast({
                title: "请授权后查看页面内容"
            });
        }.bind(this);
    },
    getLastEditor: function() {
        t.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/schedule/getScheduleLastEditor.do?cid=" + this.cid + "&uuid=" + this.uuid,
            method: "GET",
            dataType: "json",
            success: function(e) {
                var t = e.data;
                "ok" == t.state && this.setData({
                    lastEditor: t.lastEditor
                });
            }.bind(this),
            fail: function(e) {}
        });
    },
    getData: function() {
        wx.showLoading({
            title: "加载中..."
        }), t.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/schedule/getWeixinSchedule.do?cid=" + this.cid + "&uuid=" + this.uuid + "&key=" + (this.key || ""),
            method: "GET",
            dataType: "json",
            success: function(e) {
                wx.hideLoading(), this.getLastEditor(), console.log(e.data);
                var t = e.data;
                if ("ok" == t.state) {
                    if (t.schedule.timeStr = this.genTime(t.schedule), t.schedule.extend = JSON.parse(t.schedule.extend), 
                    t.schedule.location && (t.schedule.displayLocation = t.schedule.location.substr(0, t.schedule.location.lastIndexOf("@"))), 
                    0 != t.schedule.repeatType && (t.schedule.displayRepeat = a.getRepeatStr(t.schedule)), 
                    t.schedule.alarm) for (var s = t.schedule.alarm.split(","), i = 0; i < s.length; i++) {
                        var o = new Date(t.schedule.startTime);
                        if (o.setMinutes(o.getMinutes() - s[i]), t.schedule.allDayEvent) if ("0" == s[i]) s[i] = "正点提醒"; else if ("1440" == s[i]) s[i] = "提前1天提醒"; else if ("4320" == s[i]) s[i] = "提前3天提醒"; else {
                            var n = s[i] / 1440 + "天";
                            s[i] = "提前" + n + "提醒";
                        } else if ("0" == s[i]) s[i] = "正点提醒"; else if ("5" == s[i]) s[i] = "提前5分钟提醒"; else if ("10" == s[i]) s[i] = "提前10分钟提醒"; else if ("30" == s[i]) s[i] = "提前30分钟提醒"; else if ("60" == s[i]) s[i] = "提前1小时提醒"; else if (1440 == s[i]) s[i] = "提前1天提醒"; else if ("4320" == s[i]) s[i] = "提前3天提醒"; else {
                            var l = s[i] % 1440, d = s[i] % 60;
                            s[i] = l ? d ? "提前" + s[i] + "分钟提醒" : "提前" + s[i] / 60 + "小时提醒" : "提前" + s[i] / 1440 + "天提醒";
                        }
                        t.schedule.displayAlarm = s.join(",");
                    }
                    t.failed = !1, t.schedule.extend.sUUID && t.schedule.extend.sCID && t.isGroupCalendar ? t.personal = !1 : t.personal = !0, 
                    this.setData(t);
                } else wx.showToast({
                    title: "加载失败！"
                }), this.setData({
                    failed: !0
                });
            }.bind(this),
            fail: function(e) {
                wx.hideLoading(), wx.showToast({
                    title: "加载失败！"
                }), this.setData({
                    failed: !0
                });
            }
        });
    },
    timeStr: function(e) {
        var t, a = new Date(e), s = a.getMonth() + 1, i = a.getFullYear(), o = a.getDate(), n = a.getDay(), l = a.getHours(), d = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
        switch (s < 10 && (s = "0" + s), o < 10 && (o = "0" + o), l < 10 && (l = "0" + l), 
        n) {
          case 0:
            t = "周日";
            break;

          case 1:
            t = "周一";
            break;

          case 2:
            t = "周二";
            break;

          case 3:
            t = "周三";
            break;

          case 4:
            t = "周四";
            break;

          case 5:
            t = "周五";
            break;

          case 6:
            t = "周六";
        }
        return i + "年" + s + "月" + o + "日 " + t + " " + l + ":" + d;
    },
    genTime: function(e) {
        var t = e.startTime, a = 1e3 * e.duration, s = this.timeStr(t) + " 开始";
        return a > 0 && (s += "\n" + this.timeStr(t + a) + " 结束"), s;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onUrl: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.setClipboardData({
            data: t
        }), wx.showToast({
            title: "链接已为您复制到剪贴板"
        });
    },
    onPic: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.previewImage({
            urls: [ t ]
        });
    },
    onLocation: function(e) {
        var t = e.currentTarget.dataset.url, a = t.substr(t.lastIndexOf("@") + 1).split(",");
        wx.openLocation({
            latitude: parseFloat(a[0]),
            longitude: parseFloat(a[1])
        });
    },
    toIndex: function(e) {
        wx.reLaunch({
            url: "/pages/schedule/list"
        });
    },
    onJoin: function() {
        wx.showLoading({
            title: "操作中..."
        });
        var a = {
            cid: this.cid,
            uuid: this.uuid
        };
        this.key && (a = {
            key: this.key
        }), t.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: this.key ? "/schedule/joinWeixinSchedule.do" : "/schedule/follow.do",
            data: a,
            method: "POST",
            dataType: "json",
            success: function(e) {
                wx.hideLoading(), console.log(e), "ok" == e.data.state ? this.getData() : wx.showToast({
                    icon: "none",
                    title: e.data.reason
                });
            }.bind(this),
            fail: function(e) {
                wx.hideLoading();
            }
        });
    },
    doDelete: function(a) {
        wx.showLoading({
            title: "操作中..."
        });
        var s;
        s = "delete" == a ? this.data.schedule.id : this.data.fsid || this.data.schedule.id, 
        console.log("the id " + s), t.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/schedule/wxDelete.do",
            data: {
                scheduleId: s
            },
            method: "POST",
            dataType: "json",
            success: function(t) {
                wx.hideLoading(), "ok" == t.data.state ? (e.globalVariable.refreshList = !0, wx.navigateBack({})) : wx.showToast({
                    icon: "none",
                    title: t.data.reason
                });
            }.bind(this),
            fail: function(e) {
                wx.hideLoading();
            }
        });
    },
    onDelete: function() {
        var e, t = this.data;
        t.schedule.repeatType;
        e = t.followers.count > 0 ? t.schedule.repeatType > 0 ? "这是重复日程,删除后相关日程全部删除,且所有参与者将无法查看此日程,您确定要删除日程吗？" : "删除后,所有参与者将无法查看此日程,您确定要删除此日程吗?" : t.schedule.repeatType > 0 ? "这是重复日程,删除后相关日程全部删除且不能恢复,您确定要删除日程吗?" : "删除日程后不能恢复,您确定要删除日程吗?", 
        wx.showModal({
            title: "",
            content: e,
            success: function(e) {
                e.confirm && this.doDelete("delete");
            }.bind(this)
        });
    },
    doExit: function() {
        wx.showLoading({
            title: "操作中..."
        }), t.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/schedule/wxDelete.do",
            data: {
                scheduleId: this.data.schedule.id
            },
            method: "POST",
            dataType: "json",
            success: function(t) {
                wx.hideLoading(), "ok" == t.data.state ? (wx.showToast({
                    title: "退出成功"
                }), e.globalVariable.refreshList = !0, wx.navigateBack({})) : wx.showToast({
                    icon: "none",
                    title: t.data.reason
                });
            }.bind(this),
            fail: function(e) {
                wx.hideLoading();
            }
        });
    },
    onExit: function() {
        wx.showModal({
            title: "",
            content: "您确定要退出日程吗?",
            success: function(e) {
                e.confirm && this.doDelete("exit");
            }.bind(this)
        });
    }
});