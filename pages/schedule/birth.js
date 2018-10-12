var t = require("../../utils/common.js"), e = getApp();

Page({
    data: {},
    onLoad: function(t) {
        this.bid = t.bid, this.bid ? e.globalData.userInfo && e.globalData.xkey && e.globalData.sessionID ? this.load() : e.userInfoReadyCallback = function() {
            e.globalData.userInfo && e.globalData.xkey && e.globalData.sessionID ? this.load() : wx.showToast({
                title: "请授权后查看页面内容"
            });
        }.bind(this) : wx.navigateBack({});
    },
    load: function() {
        wx.showLoading({
            title: "加载中..."
        }), t.load({
            xkey: e.globalData.xkey,
            sessionID: e.globalData.sessionID,
            url: "/birthday/getDetail.do",
            method: "POST",
            data: {
                id: this.bid
            },
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
    initData: function(t) {
        (t = this.getDetail(t)).failed = !1, console.log(t), "[纪念日]" == t.birth.note ? wx.setNavigationBarTitle({
            title: "纪念日详情"
        }) : wx.setNavigationBarTitle({
            title: "生日详情"
        }), this.setData(t);
    },
    noteDetail: function(t) {
        var e = new Date();
        e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
        var a = t.birth.year, i = t.birth.month, r = t.birth.day;
        if ("S" == t.birth.calendarType.toUpperCase()) {
            var s = e.getFullYear() - a, l = new Date(e.getFullYear() + "/" + i + "/" + r);
            if (l - e == 0 && (t.birth.age = s, t.birth.dis = 0), l - e > 0) {
                n = parseInt(Math.abs(l - e) / 864e5);
                t.birth.age = s, t.birth.dis = n;
            }
            if (l - e < 0) {
                s += 1;
                var h = new Date(e.getFullYear() + 1 + "/" + i + "/" + r), n = parseInt(Math.abs(h - e) / 864e5);
                t.birth.age = s, t.birth.dis = n, console.log("hhhh " + n), console.log(e);
            }
            t.birth.displayBirth = a + "-" + i + "-" + r;
        } else {
            var s = e.getFullYear() - a, o = e.getFullYear();
            e.getFullYear();
            if (o % (o % 100 ? 4 : 400)) {
                if ((b = this.getSolarDate(o, i, r, 1)) - e == 0 && (t.birth.age = s, t.birth.dis = 0), 
                b - e > 0) {
                    n = parseInt(Math.abs(e - b) / 864e5);
                    t.birth.age = s, t.birth.dis = n;
                }
                if (b - e < 0) {
                    s += 1;
                    var b = this.getSolarDate(e.getFullYear() + 1, i, r, 1), n = parseInt(Math.abs(e - b) / 864e5);
                    t.birth.age = s, t.birth.dis = n;
                }
            } else {
                if ((b = this.getSolarDate(o, i, r, 0)) - e == 0 && (t.birth.age = s, t.birth.dis = 0), 
                b - e > 0) {
                    n = parseInt(Math.abs(e - b) / 864e5);
                    t.birth.age = s, t.birth.dis = n;
                }
                if (b - e < 0) {
                    s += 1;
                    b = e.getFullYear() + 1 % (e.getFullYear() + 1 ? 4 : 400) ? this.getSolarDate(e.getFullYear() + 1, i, r, 1) : this.getSolarDate(e.getFullYear() + 1, i, r, 0);
                    n = parseInt(Math.abs(e - b) / 864e5);
                    t.birth.age = s, t.birth.dis = n;
                }
            }
            t.birth.displayBirth = a + "年" + this.getLunarNum(i, r);
        }
        return t;
    },
    getDetail: function(t) {
        var e = new Date();
        e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
        for (var a = t.birth.year, i = t.birth.month, r = t.birth.day, s = t.birth.alarmList, l = "[纪念日]" == t.birth.note, h = 0; h < s.length; h++) 0 == s[h].beforeMinutes && (t.birth.alarmList[h].text = (l ? "纪念日" : "生日") + "当天提醒"), 
        1440 == s[h].beforeMinutes && (t.birth.alarmList[h].text = "提前1天提醒"), 4320 == s[h].beforeMinutes && (t.birth.alarmList[h].text = "提前3天提醒"), 
        10080 == s[h].beforeMinutes && (t.birth.alarmList[h].text = "提前1周提醒"), 43200 == s[h].beforeMinutes && (t.birth.alarmList[h].text = "提前1月提醒");
        if (l) return this.noteDetail(t);
        if ("S" == t.birth.calendarType || "s" == t.birth.calendarType) {
            g = e.getFullYear() - a;
            if (a) {
                if ((b = new Date(e.getFullYear() + "/" + i + "/" + r)) - e == 0 && (t.birth.age = g, 
                t.birth.dis = 0), b - e > 0) {
                    o = parseInt(Math.abs(b - e) / 864e5);
                    t.birth.age = g, t.birth.dis = o;
                }
                if (b - e < 0) {
                    g += 1;
                    var n = new Date(e.getFullYear() + 1 + "/" + i + "/" + r), o = parseInt(Math.abs(n - e) / 864e5);
                    t.birth.age = g, t.birth.dis = o;
                }
                t.birth.displayBirth = a + "-" + i + "-" + r;
            } else {
                var b = new Date(e.getFullYear() + "/" + i + "/" + r);
                if (b - e == 0 && (t.birth.age = 0, t.birth.dis = 0), b - e > 0) {
                    o = parseInt(Math.abs(b - e) / 864e5);
                    t.birth.age = 0, t.birth.dis = o;
                }
                if (b - e < 0) {
                    g += 1;
                    var n = new Date(e.getFullYear() + 1 + "/" + i + "/" + r), o = parseInt(Math.abs(n - e) / 864e5);
                    t.birth.age = 0, t.birth.dis = o;
                }
                t.birth.displayBirth = i + "-" + r;
            }
        } else if (a) {
            var g = e.getFullYear() - a, u = e.getFullYear();
            e.getFullYear();
            if (u % (u % 100 ? 4 : 400)) {
                if ((d = this.getSolarDate(u, i, r, 1)) - e == 0 && (t.birth.age = g, t.birth.dis = 0), 
                d - e > 0) {
                    o = parseInt(Math.abs(e - d) / 864e5);
                    t.birth.age = g, t.birth.dis = o;
                }
                if (d - e < 0) {
                    g += 1;
                    var d = this.getSolarDate(e.getFullYear() + 1, i, r, 1), o = parseInt(Math.abs(e - d) / 864e5);
                    t.birth.age = g, t.birth.dis = o;
                }
            } else {
                if ((d = this.getSolarDate(u, i, r, 0)) - e == 0 && (t.birth.age = g, t.birth.dis = 0), 
                d - e > 0) {
                    o = parseInt(Math.abs(e - d) / 864e5);
                    t.birth.age = g, t.birth.dis = o;
                }
                if (d - e < 0) {
                    g += 1;
                    d = e.getFullYear() + 1 % (e.getFullYear() + 1 ? 4 : 400) ? this.getSolarDate(e.getFullYear() + 1, i, r, 1) : this.getSolarDate(e.getFullYear() + 1, i, r, 0);
                    o = parseInt(Math.abs(e - d) / 864e5);
                    t.birth.age = g, t.birth.dis = o;
                }
            }
            t.birth.displayBirth = a + "年" + this.getLunarNum(i, r);
        } else {
            if (e.getFullYear() % (e.getFullYear() % 100 ? 4 : 400)) {
                if ((d = this.getSolarDate(e.getFullYear(), i, r, 1)) - e == 0 && (t.birth.age = 0, 
                t.birth.dis = 0), d - e > 0) {
                    o = parseInt(Math.abs(e - d) / 864e5);
                    t.birth.age = 0, t.birth.dis = o;
                }
                if (d - e < 0) {
                    d = e.getFullYear() + 1 % (e.getFullYear() + 1 ? 4 : 400) ? this.getSolarDate(e.getFullYear() + 1, i, r, 1) : this.getSolarDate(e.getFullYear() + 1, i, r, 0);
                    o = parseInt(Math.abs(d - e) / 864e5);
                    t.birth.age = 0, t.birth.dis = o;
                }
            } else {
                if ((d = this.getSolarDate(e.getFullYear(), i, r, 0)) - e == 0 && (t.birth.age = 0, 
                t.birth.dis = 0), d - e > 0) {
                    o = parseInt(Math.abs(e - d) / 864e5);
                    t.birth.age = 0, t.birth.dis = o;
                }
                if (d - e < 0) {
                    d = e.getFullYear() + 1 % (e.getFullYear() + 1 ? 4 : 400) ? this.getSolarDate(e.getFullYear() + 1, i, r, 1) : this.getSolarDate(e.getFullYear() + 1, i, r, 0);
                    o = parseInt(Math.abs(d - e) / 864e5);
                    t.birth.age = 0, t.birth.dis = o;
                }
            }
            t.birth.displayBirth = this.getLunarNum(i, r);
        }
        return t;
    },
    yearIndex: function(t) {
        return t - 1900;
    },
    mapItemForYear: function(t) {
        return new Array(3951576, 6441696, 5023088, 3691733, 14471776, 4512080, 3237204, 5658272, 12622544, 2774482, 5262048, 3843510, 14722256, 4772432, 3396181, 5813568, 12768928, 2928034, 5412272, 4147575, 14961008, 5022896, 3585205, 6056528, 13004096, 3124052, 5647200, 4232560, 11293426, 5261680, 3827046, 6214816, 13167184, 3369621, 5790416, 4467552, 11503331, 5411552, 4049111, 6474064, 13423776, 3528870, 5944656, 4609696, 11642292, 5645776, 4231888, 2806450, 13674832, 3716439, 6188192, 4765008, 11883349, 5787040, 4367792, 3097971, 13914800, 3975592, 6351184, 5008032, 11972262, 5942096, 4606816, 3189476, 14067056, 4215392, 2683491, 5167440, 12213079, 6182560, 4757200, 3427797, 14306e3, 4367568, 2938068, 5427792, 12375384, 6337856, 4896416, 3642790, 14456240, 4606384, 3189108, 5678256, 12628602, 6580816, 5139776, 3714886, 14592864, 4756848, 3427061, 5917040, 12870832, 2913443, 5302864, 3959640, 14834368, 4893536, 3577557, 6066912, 13027680, 3070292, 5559456, 4119120, 11171154, 5133984, 3713975, 6301136, 13275856, 3328693, 5810512, 4371616, 11319972, 5287248, 3954137, 6441888, 13411760, 3625334, 6050480, 4630832, 11565396, 5532320, 4107600, 2775890, 13650784, 3712742, 6202592, 4772448, 11725413, 5690672, 4348576, 2913955, 13801168, 3951355, 6441680, 5022928, 12046518, 5952080, 4511008, 3071301, 13940128, 4085456, 2774450, 5261744, 12232055, 6202544, 4762192, 3387989, 14183712, 4238752, 2968419, 5411696, 12470776, 6441328, 5006512, 3631270, 14346832, 4483744, 3122884, 5548768, 12620512, 2675427, 5163360, 3724631, 14603424, 4642896, 3300693, 5789344, 12756688, 2905556, 5395152, 3975608, 14854480, 4895904, 3454630, 5942608, 12998048, 3058596, 5547440, 4215472, 11186803, 5138736, 3699511, 6187680, 13151568, 3361621, 5786464, 4367728, 11424996, 5296480, 3860840, 6346016, 13294240, 3500710, 5920464, 4606688, 11577812, 5546704, 4116816, 2683474, 5166368)[this.yearIndex(t)];
    },
    getSolarDate: function(t, e, a, i) {
        for (var r = this.mapItemForYear(t), s = (8257536 & r) >> 17, l = 15 & r, h = 0 != l ? 0 != (65536 & r) ? 30 : 29 : 0, n = 1; n < e; n++) s += 0 == (r & 65536 >> n) ? 29 : 30, 
        n == l && (s += h);
        i && e == l && (s += h), s += a - 1;
        var o = new Date(t, 0, 1);
        return new Date(o.valueOf() + 864e5 * s);
    },
    getLunarNum: function(t, e) {
        var a = {
            monthCn: [ "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" ],
            dateCn: [ "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十", "卅一" ]
        };
        return a.monthCn[t - 1] + "月" + a.dateCn[e - 1];
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onReload: function() {
        this.load();
    },
    toIndex: function(t) {
        wx.reLaunch({
            url: "/pages/schedule/list"
        });
    }
});