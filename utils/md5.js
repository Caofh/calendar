function r(r) {
    return l(n(i(r), r.length * A));
}

function n(r, n) {
    r[n >> 5] |= 128 << n % 32, r[14 + (n + 64 >>> 9 << 4)] = n;
    for (var t = 1732584193, f = -271733879, h = -1732584194, i = 271733878, g = 0; g < r.length; g += 16) {
        var l = t, v = f, m = h, d = i;
        f = c(f = c(f = c(f = c(f = o(f = o(f = o(f = o(f = e(f = e(f = e(f = e(f = u(f = u(f = u(f = u(f, h = u(h, i = u(i, t = u(t, f, h, i, r[g + 0], 7, -680876936), f, h, r[g + 1], 12, -389564586), t, f, r[g + 2], 17, 606105819), i, t, r[g + 3], 22, -1044525330), h = u(h, i = u(i, t = u(t, f, h, i, r[g + 4], 7, -176418897), f, h, r[g + 5], 12, 1200080426), t, f, r[g + 6], 17, -1473231341), i, t, r[g + 7], 22, -45705983), h = u(h, i = u(i, t = u(t, f, h, i, r[g + 8], 7, 1770035416), f, h, r[g + 9], 12, -1958414417), t, f, r[g + 10], 17, -42063), i, t, r[g + 11], 22, -1990404162), h = u(h, i = u(i, t = u(t, f, h, i, r[g + 12], 7, 1804603682), f, h, r[g + 13], 12, -40341101), t, f, r[g + 14], 17, -1502002290), i, t, r[g + 15], 22, 1236535329), h = e(h, i = e(i, t = e(t, f, h, i, r[g + 1], 5, -165796510), f, h, r[g + 6], 9, -1069501632), t, f, r[g + 11], 14, 643717713), i, t, r[g + 0], 20, -373897302), h = e(h, i = e(i, t = e(t, f, h, i, r[g + 5], 5, -701558691), f, h, r[g + 10], 9, 38016083), t, f, r[g + 15], 14, -660478335), i, t, r[g + 4], 20, -405537848), h = e(h, i = e(i, t = e(t, f, h, i, r[g + 9], 5, 568446438), f, h, r[g + 14], 9, -1019803690), t, f, r[g + 3], 14, -187363961), i, t, r[g + 8], 20, 1163531501), h = e(h, i = e(i, t = e(t, f, h, i, r[g + 13], 5, -1444681467), f, h, r[g + 2], 9, -51403784), t, f, r[g + 7], 14, 1735328473), i, t, r[g + 12], 20, -1926607734), h = o(h, i = o(i, t = o(t, f, h, i, r[g + 5], 4, -378558), f, h, r[g + 8], 11, -2022574463), t, f, r[g + 11], 16, 1839030562), i, t, r[g + 14], 23, -35309556), h = o(h, i = o(i, t = o(t, f, h, i, r[g + 1], 4, -1530992060), f, h, r[g + 4], 11, 1272893353), t, f, r[g + 7], 16, -155497632), i, t, r[g + 10], 23, -1094730640), h = o(h, i = o(i, t = o(t, f, h, i, r[g + 13], 4, 681279174), f, h, r[g + 0], 11, -358537222), t, f, r[g + 3], 16, -722521979), i, t, r[g + 6], 23, 76029189), h = o(h, i = o(i, t = o(t, f, h, i, r[g + 9], 4, -640364487), f, h, r[g + 12], 11, -421815835), t, f, r[g + 15], 16, 530742520), i, t, r[g + 2], 23, -995338651), h = c(h, i = c(i, t = c(t, f, h, i, r[g + 0], 6, -198630844), f, h, r[g + 7], 10, 1126891415), t, f, r[g + 14], 15, -1416354905), i, t, r[g + 5], 21, -57434055), h = c(h, i = c(i, t = c(t, f, h, i, r[g + 12], 6, 1700485571), f, h, r[g + 3], 10, -1894986606), t, f, r[g + 10], 15, -1051523), i, t, r[g + 1], 21, -2054922799), h = c(h, i = c(i, t = c(t, f, h, i, r[g + 8], 6, 1873313359), f, h, r[g + 15], 10, -30611744), t, f, r[g + 6], 15, -1560198380), i, t, r[g + 13], 21, 1309151649), h = c(h, i = c(i, t = c(t, f, h, i, r[g + 4], 6, -145523070), f, h, r[g + 11], 10, -1120210379), t, f, r[g + 2], 15, 718787259), i, t, r[g + 9], 21, -343485551), 
        t = a(t, l), f = a(f, v), h = a(h, m), i = a(i, d);
    }
    return Array(t, f, h, i);
}

function t(r, n, t, u, e, o) {
    return a(h(a(a(n, r), a(u, o)), e), t);
}

function u(r, n, u, e, o, c, f) {
    return t(n & u | ~n & e, r, n, o, c, f);
}

function e(r, n, u, e, o, c, f) {
    return t(n & e | u & ~e, r, n, o, c, f);
}

function o(r, n, u, e, o, c, f) {
    return t(n ^ u ^ e, r, n, o, c, f);
}

function c(r, n, u, e, o, c, f) {
    return t(u ^ (n | ~e), r, n, o, c, f);
}

function f(r, t) {
    var u = i(r);
    u.length > 16 && (u = n(u, r.length * A));
    for (var e = Array(16), o = Array(16), c = 0; c < 16; c++) e[c] = 909522486 ^ u[c], 
    o[c] = 1549556828 ^ u[c];
    var f = n(e.concat(i(t)), 512 + t.length * A);
    return n(o.concat(f), 640);
}

function a(r, n) {
    var t = (65535 & r) + (65535 & n);
    return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
}

function h(r, n) {
    return r << n | r >>> 32 - n;
}

function i(r) {
    for (var n = Array(), t = (1 << A) - 1, u = 0; u < r.length * A; u += A) n[u >> 5] |= (r.charCodeAt(u / A) & t) << u % 32;
    return n;
}

function g(r) {
    for (var n = "", t = (1 << A) - 1, u = 0; u < 32 * r.length; u += A) n += String.fromCharCode(r[u >> 5] >>> u % 32 & t);
    return n;
}

function l(r) {
    for (var n = m ? "0123456789ABCDEF" : "0123456789abcdef", t = "", u = 0; u < 4 * r.length; u++) t += n.charAt(r[u >> 2] >> u % 4 * 8 + 4 & 15) + n.charAt(r[u >> 2] >> u % 4 * 8 & 15);
    return t;
}

function v(r) {
    for (var n = "", t = 0; t < 4 * r.length; t += 3) for (var u = (r[t >> 2] >> t % 4 * 8 & 255) << 16 | (r[t + 1 >> 2] >> (t + 1) % 4 * 8 & 255) << 8 | r[t + 2 >> 2] >> (t + 2) % 4 * 8 & 255, e = 0; e < 4; e++) 8 * t + 6 * e > 32 * r.length ? n += d : n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(u >> 6 * (3 - e) & 63);
    return n;
}

var m = 0, d = "", A = 8;

module.exports = {
    hex_md5: r,
    b64_md5: function(r) {
        return v(n(i(r), r.length * A));
    },
    str_md5: function(r) {
        return g(n(i(r), r.length * A));
    },
    hex_hmac_md5: function(r, n) {
        return l(f(r, n));
    },
    b64_hmac_md5: function(r, n) {
        return v(f(r, n));
    },
    str_hmac_md5: function(r, n) {
        return g(f(r, n));
    }
};