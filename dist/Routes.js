"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Routes_instances, _Routes_routeConvert, _Routes_routeSelect, _a;
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const app_1 = require("app/config/app");
exports.default = new (_a = class Routes {
        constructor() {
            _Routes_instances.add(this);
            this._routes = null;
            this._decision = null;
        }
        searchRoute(url = null) {
            if (!this._routes) {
                if (app_1.default) {
                    this._routes = __classPrivateFieldGet(this, _Routes_instances, "m", _Routes_routeConvert).call(this, app_1.default.routes);
                }
                else {
                    let _App = use("app/config/app");
                    this._routes = __classPrivateFieldGet(this, _Routes_instances, "m", _Routes_routeConvert).call(this, _App.routes);
                }
            }
            let targetUrl = location.hash.substring(1);
            if (url) {
                targetUrl = url;
            }
            if (!targetUrl) {
                targetUrl = "/";
            }
            else {
                if (targetUrl != "/") {
                    if (targetUrl.substring(targetUrl.length - 1) == "/") {
                        targetUrl = targetUrl.substring(0, targetUrl.length - 1);
                    }
                }
            }
            this._decision = __classPrivateFieldGet(this, _Routes_instances, "m", _Routes_routeSelect).call(this, targetUrl);
            return this._decision;
        }
        getRoute() {
            return this._decision;
        }
    },
    _Routes_instances = new WeakSet(),
    _Routes_routeConvert = function _Routes_routeConvert(routes) {
        var res = {};
        var columns = Object.keys(routes);
        for (var n = 0; n < columns.length; n++) {
            var url = columns[n];
            var val = routes[url];
            if (typeof val == "string") {
                var vals = val.split("|");
                var buffer = {
                    controller: null,
                    action: null,
                };
                for (var n2 = 0; n2 < vals.length; n2++) {
                    var v_ = vals[n2];
                    if (v_.indexOf("controller") === 0) {
                        buffer.controller = v_.substring("controller:".length);
                    }
                    else if (v_.indexOf("action") === 0) {
                        buffer.action = v_.substring("action:".length);
                    }
                }
                res[url] = buffer;
            }
            else {
                var buffers = __classPrivateFieldGet(this, _Routes_instances, "m", _Routes_routeConvert).call(this, val);
                var columns2 = Object.keys(buffers);
                for (var n2 = 0; n2 < columns2.length; n2++) {
                    var url2 = columns2[n2];
                    var val2 = buffers[url2];
                    if (url2 == "/") {
                        url2 = "";
                    }
                    res[url + url2] = val2;
                }
            }
        }
        return res;
    },
    _Routes_routeSelect = function _Routes_routeSelect(targetUrl) {
        var sect0 = targetUrl.split("/");
        var decision = null;
        var columns = Object.keys(this._routes);
        for (var n = 0; n < columns.length; n++) {
            var url = columns[n];
            var val = this._routes[url];
            var sect1 = url.split("/");
            var status1 = true;
            var status2 = true;
            for (var n2 = 0; n2 < sect0.length; n2++) {
                var aregment = [];
                if (!sect1[n2]) {
                    sect1[n2] = "";
                }
                if (sect0[n2] != sect1[n2]) {
                    if (sect1[n2].indexOf("{") === 0 && sect1[n2].indexOf("}") === (sect1[n2].length - 1)) {
                        if (sect1[n2].indexOf("?}") !== (sect1[n2].length - 2)) {
                            if (!sect0[n2]) {
                                status1 = false;
                            }
                        }
                    }
                    else {
                        status1 = false;
                    }
                }
            }
            for (var n2 = 0; n2 < sect1.length; n2++) {
                if (!sect0[n2]) {
                    sect0[n2] = "";
                }
                if (sect0[n2] != sect1[n2]) {
                    if (sect1[n2].indexOf("{") === 0 && sect1[n2].indexOf("}") === (sect1[n2].length - 1)) {
                        if (sect1[n2].indexOf("?}") !== (sect1[n2].length - 2)) {
                            if (!sect0[n2]) {
                                status1 = false;
                            }
                        }
                        aregment.push(sect0[n2]);
                    }
                    else {
                        status2 = false;
                    }
                }
            }
            if (status1 && status2) {
                decision = val;
                decision.aregment = aregment;
            }
        }
        let res = {};
        if (decision) {
            res = {
                url: targetUrl,
                mode: "success",
                controller: decision.controller,
                action: decision.action,
                aregment: decision.aregment,
            };
        }
        else {
            res = {
                url: targetUrl,
                mode: "notfound",
            };
        }
        return res;
    },
    _a);
