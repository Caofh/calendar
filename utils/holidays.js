require("util.js");

var t = [ {
    date: "2018-10-07",
    status: 1,
    remark: ""
}, {
    date: "2018-10-06",
    status: 1,
    remark: ""
}, {
    date: "2018-10-05",
    status: 1,
    remark: ""
}, {
    date: "2018-10-04",
    status: 1,
    remark: ""
}, {
    date: "2018-10-03",
    status: 1,
    remark: ""
}, {
    date: "2018-10-02",
    status: 1,
    remark: ""
}, {
    date: "2018-10-01",
    status: 1,
    remark: ""
}, {
    date: "2018-09-30",
    status: 2,
    remark: ""
}, {
    date: "2018-09-29",
    status: 2,
    remark: ""
}, {
    date: "2018-09-24",
    status: 1,
    remark: ""
}, {
    date: "2018-09-23",
    status: 1,
    remark: ""
}, {
    date: "2018-09-22",
    status: 1,
    remark: ""
}, {
    date: "2018-06-18",
    status: 1,
    remark: ""
}, {
    date: "2018-06-17",
    status: 1,
    remark: ""
}, {
    date: "2018-06-16",
    status: 1,
    remark: ""
}, {
    date: "2018-05-01",
    status: 1,
    remark: ""
}, {
    date: "2018-04-30",
    status: 1,
    remark: ""
}, {
    date: "2018-04-29",
    status: 1,
    remark: ""
}, {
    date: "2018-04-28",
    status: 2,
    remark: ""
}, {
    date: "2018-04-08",
    status: 2,
    remark: ""
}, {
    date: "2018-04-07",
    status: 1,
    remark: ""
}, {
    date: "2018-04-06",
    status: 1,
    remark: ""
}, {
    date: "2018-04-05",
    status: 1,
    remark: ""
}, {
    date: "2018-02-24",
    status: 2,
    remark: ""
}, {
    date: "2018-02-21",
    status: 1,
    remark: ""
}, {
    date: "2018-02-20",
    status: 1,
    remark: ""
}, {
    date: "2018-02-19",
    status: 1,
    remark: ""
}, {
    date: "2018-02-18",
    status: 1,
    remark: ""
}, {
    date: "2018-02-17",
    status: 1,
    remark: ""
}, {
    date: "2018-02-16",
    status: 1,
    remark: ""
}, {
    date: "2018-02-15",
    status: 1,
    remark: ""
}, {
    date: "2018-02-11",
    status: 2,
    remark: ""
}, {
    date: "2018-01-01",
    status: 1,
    remark: ""
}, {
    date: "2017-12-31",
    status: 1,
    remark: ""
}, {
    date: "2017-12-30",
    status: 1,
    remark: ""
}, {
    date: "2017-10-08",
    status: 1,
    remark: ""
}, {
    date: "2017-10-07",
    status: 1,
    remark: ""
}, {
    date: "2017-10-06",
    status: 1,
    remark: ""
}, {
    date: "2017-10-05",
    status: 1,
    remark: ""
}, {
    date: "2017-10-04",
    status: 1,
    remark: ""
}, {
    date: "2017-10-03",
    status: 1,
    remark: ""
}, {
    date: "2017-10-02",
    status: 1,
    remark: ""
}, {
    date: "2017-10-01",
    status: 1,
    remark: ""
}, {
    date: "2017-09-30",
    status: 2,
    remark: ""
}, {
    date: "2017-05-30",
    status: 1,
    remark: ""
}, {
    date: "2017-05-29",
    status: 1,
    remark: ""
}, {
    date: "2017-05-28",
    status: 1,
    remark: ""
}, {
    date: "2017-05-27",
    status: 2,
    remark: ""
}, {
    date: "2017-05-01",
    status: 1,
    remark: ""
}, {
    date: "2017-04-30",
    status: 1,
    remark: ""
}, {
    date: "2017-04-29",
    status: 1,
    remark: ""
}, {
    date: "2017-04-04",
    status: 1,
    remark: ""
}, {
    date: "2017-04-03",
    status: 1,
    remark: ""
}, {
    date: "2017-04-02",
    status: 1,
    remark: ""
}, {
    date: "2017-04-01",
    status: 2,
    remark: ""
}, {
    date: "2017-02-04",
    status: 2,
    remark: ""
}, {
    date: "2017-02-03",
    status: 2,
    remark: ""
}, {
    date: "2017-02-02",
    status: 1,
    remark: ""
}, {
    date: "2017-02-01",
    status: 1,
    remark: ""
}, {
    date: "2017-01-31",
    status: 1,
    remark: ""
}, {
    date: "2017-01-30",
    status: 1,
    remark: ""
}, {
    date: "2017-01-29",
    status: 1,
    remark: ""
}, {
    date: "2017-01-28",
    status: 1,
    remark: ""
}, {
    date: "2017-01-27",
    status: 1,
    remark: ""
}, {
    date: "2017-01-22",
    status: 2,
    remark: ""
}, {
    date: "2017-01-02",
    status: 1,
    remark: ""
}, {
    date: "2017-01-01",
    status: 1,
    remark: ""
}, {
    date: "2016-12-31",
    status: 1,
    remark: ""
}, {
    date: "2016-10-09",
    status: 2,
    remark: ""
}, {
    date: "2016-10-08",
    status: 2,
    remark: ""
}, {
    date: "2016-10-07",
    status: 1,
    remark: ""
}, {
    date: "2016-10-06",
    status: 1,
    remark: ""
}, {
    date: "2016-10-05",
    status: 1,
    remark: ""
}, {
    date: "2016-10-04",
    status: 1,
    remark: ""
}, {
    date: "2016-10-03",
    status: 1,
    remark: ""
}, {
    date: "2016-10-02",
    status: 1,
    remark: ""
}, {
    date: "2016-10-01",
    status: 1,
    remark: ""
}, {
    date: "2016-09-18",
    status: 2,
    remark: ""
}, {
    date: "2016-09-17",
    status: 1,
    remark: ""
}, {
    date: "2016-09-16",
    status: 1,
    remark: ""
}, {
    date: "2016-09-15",
    status: 1,
    remark: ""
}, {
    date: "2016-06-12",
    status: 2,
    remark: ""
}, {
    date: "2016-06-11",
    status: 1,
    remark: ""
}, {
    date: "2016-06-10",
    status: 1,
    remark: ""
}, {
    date: "2016-06-09",
    status: 1,
    remark: ""
}, {
    date: "2016-05-02",
    status: 1,
    remark: ""
}, {
    date: "2016-05-01",
    status: 1,
    remark: ""
}, {
    date: "2016-04-30",
    status: 1,
    remark: ""
}, {
    date: "2016-04-04",
    status: 1,
    remark: ""
}, {
    date: "2016-04-03",
    status: 1,
    remark: ""
}, {
    date: "2016-04-02",
    status: 1,
    remark: ""
}, {
    date: "2016-02-14",
    status: 2,
    remark: ""
}, {
    date: "2016-02-13",
    status: 1,
    remark: ""
}, {
    date: "2016-02-12",
    status: 1,
    remark: ""
}, {
    date: "2016-02-11",
    status: 1,
    remark: ""
}, {
    date: "2016-02-10",
    status: 1,
    remark: ""
}, {
    date: "2016-02-09",
    status: 1,
    remark: ""
}, {
    date: "2016-02-08",
    status: 1,
    remark: ""
}, {
    date: "2016-02-07",
    status: 1,
    remark: ""
}, {
    date: "2016-02-06",
    status: 2,
    remark: ""
}, {
    date: "2016-01-03",
    status: 1,
    remark: ""
}, {
    date: "2016-01-02",
    status: 1,
    remark: ""
}, {
    date: "2016-01-01",
    status: 1,
    remark: ""
} ];

module.exports = {
    holidayStatusForDate: function(a) {
        for (var r = a.format("yyyy-MM-dd"), e = 0; e < t.length; e++) if (r == t[e].date) return t[e].status;
        return 0;
    }
};