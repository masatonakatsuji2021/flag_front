"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const app_1 = require("app/config/app");
class Routes {
    static searchRoute(url = null) {
        if (!this._routes) {
            if (app_1.default) {
                Routes._routes = Routes.routeConvert(app_1.default.routes);
            }
            else {
                let _App = use("app/config/app");
                Routes._routes = Routes.routeConvert(_App.routes);
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
        Routes._decision = Routes.routeSelect(targetUrl);
        return Routes._decision;
    }
    static getRoute() {
        return Routes._decision;
    }
    static routeConvert(routes) {
        var res = {};
        var columns = Object.keys(routes);
        for (var n = 0; n < columns.length; n++) {
            var url = columns[n];
            var val = routes[url];
            if (typeof val == "string") {
                var vals = val.split("|");
                var buffer = {
                    controller: null,
                    view: null,
                    action: null,
                };
                for (var n2 = 0; n2 < vals.length; n2++) {
                    var v_ = vals[n2];
                    if (v_.indexOf("controller:") === 0) {
                        buffer.controller = v_.substring("controller:".length);
                    }
                    else if (v_.indexOf("c:") === 0) {
                        buffer.controller = v_.substring("c:".length);
                    }
                    else if (v_.indexOf("action:") === 0) {
                        buffer.action = v_.substring("action:".length);
                    }
                    else if (v_.indexOf("a:") === 0) {
                        buffer.action = v_.substring("a:".length);
                    }
                    else if (v_.indexOf("view:") === 0) {
                        buffer.view = v_.substring("view:".length);
                    }
                    else if (v_.indexOf("v:") === 0) {
                        buffer.view = v_.substring("v:".length);
                    }
                }
                res[url] = buffer;
            }
            else {
                var buffers = Routes.routeConvert(val);
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
    }
    static routeSelect(targetUrl) {
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
                view: decision.view,
            };
        }
        else {
            res = {
                url: targetUrl,
                mode: "notfound",
            };
        }
        return res;
    }
}
Routes._routes = null;
Routes._decision = null;
exports.default = Routes;
