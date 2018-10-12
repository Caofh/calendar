function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

Date.prototype.format = function(t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var r in e) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[r] : ("00" + e[r]).substr(("" + e[r]).length)));
    return t;
}, module.exports = {
    formatTime: function(e) {
        var r = e.getFullYear(), n = e.getMonth() + 1, s = e.getDate(), g = e.getHours(), a = e.getMinutes(), o = e.getSeconds();
        return [ r, n, s ].map(t).join("/") + " " + [ g, a, o ].map(t).join(":");
    },
    getDateStr: function(t) {
        var e = new Date();
        return e.setDate(e.getDate() + t), e.getFullYear() + "-" + (e.getMonth() + 1 >= 10 ? e.getMonth() + 1 : "0" + (e.getMonth() + 1)) + "-" + (e.getDate() >= 10 ? e.getDate() : "0" + e.getDate());
    },
    getChineseWeekday: function(t) {
        switch (t.getDay()) {
          case 0:
            return "星期日";

          case 1:
            return "星期一";

          case 2:
            return "星期二";

          case 3:
            return "星期三";

          case 4:
            return "星期四";

          case 5:
            return "星期五";

          case 6:
            return "星期六";
        }
        return "未知";
    }
};