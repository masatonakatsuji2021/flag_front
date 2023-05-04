"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ajax_instances, _Ajax_setRequestData, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new (_a = class Ajax {
        constructor() {
            _Ajax_instances.add(this);
        }
        request(url, option) {
            if (!option) {
                option = {};
            }
            if (!option.method) {
                option.method = "GET";
            }
            if (!option.contentType) {
                option.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
            }
            if (!option.data) {
                option.data = {};
            }
            var req = new XMLHttpRequest();
            req.open(option.method, url, true);
            if (option.timeout) {
                req.timeout = option.timeout;
            }
            if (option.method.toUpperCase() != "GET") {
                req.setRequestHeader('content-type', option.contentType);
            }
            if (option.headers) {
                var columns = Object.keys(option.headers);
                for (var n = 0; n < columns.length; n++) {
                    var key = columns[n];
                    var val = option.headers[key];
                    req.setRequestHeader(key, val);
                }
            }
            if (option.method.toUpperCase() == "GET") {
                req.send(__classPrivateFieldGet(this, _Ajax_instances, "m", _Ajax_setRequestData).call(this, option.data));
            }
            else {
                if (option.contentType == "text/json" ||
                    option.contentType == "application/json") {
                    req.send(JSON.stringify(option.data));
                }
                else {
                    req.send(__classPrivateFieldGet(this, _Ajax_instances, "m", _Ajax_setRequestData).call(this, option.data));
                }
            }
            var AjaxResponse = function (option, req) {
                this.then = function (callback) {
                    req.onload = function (e) {
                        var body = req.responseText;
                        if (option.dataType == "json") {
                            body = JSON.parse(req.responseText);
                        }
                        callback(body, req);
                    };
                    return this;
                };
                this.catch = function (callback) {
                    req.onerror = function (error) {
                        callback(error, req);
                    };
                    return this;
                };
            };
            return new AjaxResponse(option, req);
        }
    },
    _Ajax_instances = new WeakSet(),
    _Ajax_setRequestData = function _Ajax_setRequestData(data) {
        var str = "";
        var strList = [];
        var columns = Object.keys(data);
        for (var n = 0; n < columns.length; n++) {
            var key = columns[n];
            var val = data[key];
            strList.push(key + "=" + encodeURIComponent(val));
        }
        str = strList.join("&");
        return str;
    },
    _a);
