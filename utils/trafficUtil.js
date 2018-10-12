function t(t, e) {
    console.log("requestLimitInfo:" + t), i.getCitycode(!0, function(i) {
        wx.request({
            url: "https://www.365rili.com/traffic/list.do",
            data: {
                citycode: i
            },
            success: function(i) {
                var n = i.data;
                console.log("traffic list from net:" + JSON.stringify(n)), wx.setStorage({
                    key: o,
                    data: n.data
                }), e && e(n.data[t]);
            }
        });
    });
}

var i = require("./citycode.js"), o = "limitinfo";

module.exports = {
    getLimitInfo: function(i, e) {
        console.log("getLimitInfo:" + i);
        var n = wx.getStorageSync(o);
        return n && n[i] ? (console.log("limitinfo existed:" + JSON.stringify(n[i])), e && e(n[i])) : t(i, e), 
        n[i];
    }
};