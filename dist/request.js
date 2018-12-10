"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var util_1 = require("./util");
exports["default"] = (function (config) {
    var host = config.host, _a = config.prefix, prefix = _a === void 0 ? '' : _a, _b = config.timeout, timeout = _b === void 0 ? 100000 : _b, handleLogin = config.handleLogin;
    var apiDomain = "" + host + prefix;
    var instance = axios_1["default"].create({
        baseURL: apiDomain,
        timeout: timeout,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        responseType: 'json',
        transformResponse: [function (data) {
                // 对 data 进行任意转换处理
                if (!data) {
                    return data;
                }
                if (data.status === 401) {
                    handleLogin();
                }
                return data;
            }]
    });
    return {
        GET: exports._get(instance),
        POST: _post(instance),
        DELETE: _delete(instance),
        PATCH: _patch(instance),
        PUT: _put(instance)
    };
});
exports._get = function (instance) { return function (url, param) {
    var params = [];
    url = url + "?traceId=" + util_1.generateUnionId();
    if (param) {
        Object.keys(param).forEach(function (key) {
            params.push(key + "=" + encodeURIComponent(param[key]));
        });
        url = url + '&' + params.join('&');
    }
    return instance.get(url);
}; };
var _post = function (instance) { return function (url, param) {
    return instance.post(url + "?traceId=" + util_1.generateUnionId(), param);
}; };
var _put = function (instance) { return function (url, param) {
    return instance.put(url + "?traceId=" + util_1.generateUnionId(), param);
}; };
var _delete = function (instance) { return function (url, param) {
    return instance["delete"](url + "?traceId=" + util_1.generateUnionId(), param);
}; };
var _patch = function (instance) { return function (url, param) {
    return instance.patch(url + "?traceId=" + util_1.generateUnionId(), param);
}; };
