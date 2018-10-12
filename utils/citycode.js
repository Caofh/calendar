var t = "citycode", o = null;

module.exports = {
    getCitycode: function(e, c) {
        console.log("getCitycode");
        var i = e ? wx.getStorageSync(t) : null;
        i ? c && c(i) : (console.log("wgs84..."), o = c, wx.getLocation({
            type: "wgs84",
            success: function(e) {
                console.log("getCityInfo..."), wx.request({
                    url: "https://www.365rili.com/location/getCityInfo.do",
                    data: {
                        lat: e.latitude,
                        lng: e.longitude,
                        province: "a",
                        city: "b"
                    },
                    success: function(e) {
                        var c = e.data;
                        console.log("cityinfo from net:" + JSON.stringify(c)), wx.setStorage({
                            key: t,
                            data: c.location.cityID
                        }), o && o(c.location.cityID);
                    }
                });
            }
        }));
    }
};