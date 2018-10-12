function e(e, t) {
    return e.indexOf(t) >= 0;
}

function t(e) {
    if (!e || !e.trim()) return [];
    var t = [];
    return e.split(":").forEach(function(e, a) {
        "MON" == e ? t.push(f) : "TUE" == e ? t.push(m) : "WED" == e ? t.push(M) : "THU" == e ? t.push(b) : "FRI" == e ? t.push(v) : "SAT" == e ? t.push(d) : "SUN" == e && t.push(T);
    }), t;
}

function a(e) {
    return "周" + [ "日", "一", "二", "三", "四", "五", "六" ][e];
}

function r(e, t) {
    return e.getFullYear() == t.getFullYear();
}

function n(n) {
    var p = !1, u = "";
    switch (n.repeatType) {
      case y:
        u = k;
        break;

      case o:
        u = F;
        break;

      case c:
        5 != (z = t(n.repeatDay)).length || e(z, T) || e(z, d) || 1 != n.repeatFrequency ? 3 == z.length && e(z, f) && e(z, M) && e(z, v) && 1 == n.repeatFrequency ? u = q : 2 == z.length && e(z, m) && e(z, b) && 1 == n.repeatFrequency ? u = C : (u = S, 
        p = !0) : u = w;
        break;

      case h:
        u = I;
        break;

      case l:
        u = U + F;
        break;

      case D:
        u = U + I;
        break;

      case g:
        u = E;
        break;

      case i:
        return u = N;
    }
    var j = new Date();
    j.setTime(n.startTime);
    var H = new s.LunarItem(j);
    if (n.repeatFrequency > 1) {
        var W = u.indexOf(A) + 1;
        u = n.repeatType == o || n.repeatType == l ? u.substring(0, W) + n.repeatFrequency + O + u.substring(W) : u.substring(0, W) + "隔" + n.repeatFrequency + u.substring(W);
    }
    if (n.repeatType == D && (u += " " + H.getChinaCurrentMonthAndDayString()), n.repeatType == h && (u += " " + (j.getMonth() + 1) + yue + j.getDate() + ri), 
    n.repeatType == l && (u += " " + H.getChinaDayString(H.getDay())), p) {
        for (var Y = " ", z = n.repeatDay.split(":"), B = 0; B < z.length; B++) Y += x, 
        "MON" == z[B] ? Y += "一" : "TUE" == z[B] ? Y += "二" : "WED" == z[B] ? Y += "三" : "THU" == z[B] ? Y += "四" : "FRI" == z[B] ? Y += "五" : "SAT" == z[B] ? Y += "六" : "SUN" == z[B] && (Y += "日"), 
        z.length - B > 1 && (Y += "、");
        u += Y;
    }
    if (n.repeatType == o) if (null != n.repeatMonthDay && n.repeatMonthDay.length > 0) u += ", " + L + n.repeatMonthDay + R; else {
        var G = parseInt((j.getDate() - 1) / 7) + 1;
        u += ", " + L + H.getChineseNumber(G) + O + a(j.getDay()).replace("周", x);
    }
    var J = "";
    null != n.startTime && ((P = new Date()).setTime(n.startTime), J = null != n.repeatStopTime && r(P, new Date()) ? P.format("MM月dd日") : P.format("yyyy年MM月dd日"), 
    J += "起");
    var K = "";
    if (null != n.repeatStopTime) {
        var P = new Date();
        P.setTime(n.repeatStopTime), K = r(P, new Date()) ? "直至" + P.format("MM月dd日") + "结束" : "直至" + P.format("yyyy年MM月dd日") + "结束";
    } else n.repeatCount > 0 && (K = "发生" + n.repeatCount + "次结束");
    return J + " " + u + " 重复 " + K;
}

function p(e) {
    return e < 10 ? "0" + e : "" + e;
}

function u(e) {
    var a = new Date();
    a.setTime(e.startTime);
    var r, n = new s.LunarItem(a);
    switch (e.repeatType) {
      case y:
        r = k;
        break;

      case o:
        var u = parseInt(e.repeatMonthDay);
        u > 0 ? (r = F, r += e.repeatMonthDay + "日") : r = -1 == u ? "每月最后一天重复" : "每月倒数第" + Math.abs(u) + "日重复";
        break;

      case c:
        var T = t(e.repeatDay);
        r = S, r += [ "", "日", "一", "二", "三", "四", "五", "六" ][T[0]];
        break;

      case h:
        r = I, r += p(parseInt(e.repeatMonth) + 1) + "月" + p(e.repeatMonthDay) + "日";
        break;

      case l:
        r = U + F, r += n.getChinaDayString(n.getDay());
        break;

      case D:
        r = U + I, r += n.getCurrentLunarMonthAndDay();
        break;

      case g:
        r = E;
        break;

      case i:
      default:
        r = N;
    }
    return r;
}

var s = require("./lunaritem.js"), i = 0, y = 1, c = 7, o = 31, h = 365, l = 29, D = 354, g = 5, T = 1, f = 2, m = 3, M = 4, b = 5, v = 6, d = 7, k = (require("./util.js"), 
"每天"), S = "每周", F = "每月", w = "每周一到周五", q = "每周一、周三和周五", C = "每周二和四", I = "每年", U = "农历", E = "法定工作日", N = "不重复", A = "每", O = "个", x = "周", L = "在第", R = "天";

module.exports = {
    getRepeatStr: function(e) {
        return e.repeatType != i && (e.repeatFrequency > 1 || 0 != e.repeatCount || e.repeatStopTime || e.repeatDay && e.repeatDay.split(":").length > 1 || 31 == e.repeatType && !e.repeatMonthDay) ? n(e) : u(e);
    }
};