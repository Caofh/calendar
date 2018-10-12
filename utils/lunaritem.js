function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = function() {
    function n(e) {
        t(this, n), this.chineseNumber = [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "", "" ], 
        this.chineseMonth = [ "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊", "", "" ], 
        this.lunarInfo = [ 19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 92821, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984, 27296, 108228, 43744, 37600, 53987, 51552, 54615, 54432, 55376, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732, 53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680, 53584, 62034, 54560 ];
        var i = new Date();
        i.setFullYear(1900), i.setMonth(0), i.setDate(31), i.setHours(0), i.setMinutes(0), 
        i.setMilliseconds(0);
        var a = new Date(e);
        a.setMilliseconds(0), a.setSeconds(0), a.setMinutes(0), a.setHours(12);
        var r = parseInt((a.getTime() - i.getTime()) / 864e5);
        console.log("offset " + r), this.calculate(r);
    }
    return e(n, [ {
        key: "yearDays",
        value: function(t) {
            if (t > 2049 || t < 1900) return 0;
            for (var e = 348, n = 32768; n > 8; n >>= 1) 0 != (this.lunarInfo[t - 1900] & n) && (e += 1);
            return e + this.leapDays(t);
        }
    }, {
        key: "leapDays",
        value: function(t) {
            return t > 2049 || t < 1900 ? 0 : 0 != this.leapMonth(t) ? 0 != (65536 & this.lunarInfo[t - 1900]) ? 30 : 29 : 0;
        }
    }, {
        key: "leapMonth",
        value: function(t) {
            return t > 2049 || t < 1900 ? 0 : 15 & this.lunarInfo[t - 1900];
        }
    }, {
        key: "getMonthDays",
        value: function(t, e) {
            return t > 2049 || t < 1900 ? 30 : 0 == (this.lunarInfo[t - 1900] & 65536 >> e) ? 29 : 30;
        }
    }, {
        key: "calculate",
        value: function(t) {
            var e, n;
            e = 14;
            var i, a = 0;
            for (i = 1900; i < 2050 && t > 0; i++) t -= a = this.yearDays(i), e += 12;
            t < 0 && (t += a, i--, e -= 12), this.year = i, n = this.leapMonth(i), this.leap = !1;
            var r, s = 0;
            for (r = 1; r < 13 && t > 0; r++) n > 0 && r == n + 1 && !leap ? (--r, this.leap = !0, 
            s = this.leapDays(this.year)) : s = this.getMonthDays(this.year, r), t -= s, this.leap && r == n + 1 && (this.leap = !1), 
            this.leap || e++;
            0 == t && n > 0 && r == n + 1 && (this.leap ? this.leap = !1 : (this.leap = !0, 
            --r, --e)), t < 0 && (t += s, --r, --e), this.month = r, this.day = t + 1;
        }
    }, {
        key: "getChinaCurrentMonthAndDayString",
        value: function() {
            return this.getChinaMonth(this.month) + this.getChinaDayString(this.day);
        }
    }, {
        key: "getCurrentLunarMonthAndDay",
        value: function() {
            return this.getChinaMonth(this.month) + this.getChinaDayString(this.day);
        }
    }, {
        key: "getChinaCurrentYearAndMonthAndDayString",
        value: function() {
            return "农历" + year + "年" + this.getChinaMonth(this.month) + this.getChinaDayString(this.day);
        }
    }, {
        key: "getChinaYearAndMonthAndDayString",
        value: function() {
            var t, e = 0;
            return e = this.leap ? this.leapDays(this.year) : this.getMonthDays(this.year, this.month), 
            t = 30 == e ? "大" : "小", this.getChinaYearString(this.year) + "  " + this.getChinaMonthString(this.month, this.leap) + "(" + t + ")" + this.getChinaDayString(this.day);
        }
    }, {
        key: "getChinaDayString",
        value: function(t) {
            var e = [ "初", "十", "廿", "卅" ], n = this.day % 10 == 0 ? 9 : this.day % 10 - 1;
            return console.log("lalala the day" + t + " " + n + " " + parseInt(this.day / 10)), 
            this.day > 30 ? "" : 20 == this.day ? "二十" : 10 == this.day ? "初十" : 30 == this.day ? "三十" : e[parseInt(this.day / 10)] + this.chineseNumber[n];
        }
    }, {
        key: "getChinaYearString",
        value: function(t) {
            var e = [ "零", "一", "二", "三", "四", "五", "六", "七", "八", "九" ];
            return e[parseInt(this.year / 1e3)] + e[parseInt(this.year / 100) % 10] + e[parseInt(this.year / 10) % 10] + e[this.year % 10] + "年";
        }
    }, {
        key: "getChinaMonthString",
        value: function(t, e) {
            return t <= 12 ? isLeap ? "闰" + this.chineseMonth[t - 1] + "月" : this.chineseMonth[t - 1] + "月" : "";
        }
    }, {
        key: "getChinaMonth",
        value: function(t) {
            return t <= 12 ? this.leap ? "闰" + this.chineseNumber[t - 1] + "月" : this.chineseNumber[t - 1] + "月" : "";
        }
    }, {
        key: "getChineseNumber",
        value: function(t) {
            return console.log(t), console.log(this.chineseNumber), t - 1 < this.chineseNumber.length && t - 1 >= 0 ? this.chineseNumber[t - 1] : "";
        }
    }, {
        key: "toString",
        value: function() {
            if (1 != this.day) return this.getChinaDayString(this.day);
            switch (this.month) {
              case 1:
                return "正月";

              case 11:
                return "冬月";

              case 12:
                return "腊月";

              default:
                return this.chineseNumber[month - 1] + "月";
            }
        }
    }, {
        key: "getYear",
        value: function() {
            return this.year;
        }
    }, {
        key: "getMonth",
        value: function() {
            return this.month - 1;
        }
    }, {
        key: "getDay",
        value: function() {
            return this.day;
        }
    }, {
        key: "pad",
        value: function(t) {
            return t < 10 ? "0" + t : "" + t;
        }
    } ]), n;
}();

exports.LunarItem = n;