var e = {
    baseUrl: "https://www.365rili.com",
    load: function(a) {
        (a = a || {}).url = a.url || "", a.data = a.data || {}, a.method = a.method || "GET", 
        a.dataType = a.dataType || "json";
        var t = a.success || function() {};
        if (a.fail = a.fail || function() {}, a.xkey = a.xkey || "", a.success = function(e) {
            "wrongpass" != e.data.state ? t(e) : wx.navigateBack({});
        }, a.xkey && a.sessionID) {
            if ("GET" == a.method) {
                var r = "";
                for (var n in a.data) r += "" == r ? "?" : "&", r += n + "=" + a.data[n];
                a.url += r, a.data = {};
            }
            var s = e.getToken(a.url.replace(e.baseUrl, ""), a.xkey, a.sessionID);
            a.header = s;
        }
        a.header = a.header || {}, a.header["content-type"] = "application/x-www-form-urlencoded", 
        a.url.indexOf("http://") < 0 && a.url.indexOf("https://") < 0 && (a.url = e.baseUrl + a.url), 
        wx.request(a);
    },
    getToken: function(a, t, r) {
        var n = new Date().getTime(), s = n + "+" + 1e3 * n, i = a + "+" + s;
        return {
            "x-365-http-key": t,
            "x-ts-header": s,
            "x-req-sig": e.calculateHMAC(i, r)
        };
    },
    calculateHMAC: function(e, a) {
        var t = require("crypto-js.js");
        return t.HmacSHA1(e, a).toString(t.enc.Base64);
    },
    getDeviceID: function() {
        return require("md5.js").str_md5("rili_wx_" + new Date().getTime());
    }
};

module.exports = {
    load: e.load,
    baseUrl: e.baseUrl
};