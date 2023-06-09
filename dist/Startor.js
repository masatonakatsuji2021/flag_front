"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("Util");
const Data_1 = require("Data");
const Routes_1 = require("Routes");
const Request_1 = require("Request");
const Response_1 = require("Response");
const VDomControl_1 = require("VDomControl");
// @ts-ignore
const app_1 = require("app/config/app");
exports.default = (function () {
    return __awaiter(this, void 0, void 0, function* () {
        window.addEventListener("load", function () {
            return __awaiter(this, void 0, void 0, function* () {
                window.addEventListener("popstate", function (e) {
                    if (!Response_1.default.setPageStatus()) {
                        if (Data_1.default.__before_url) {
                            history.pushState(null, null, Data_1.default.__before_url);
                        }
                        else {
                            history.pushState(null, null);
                        }
                        return false;
                    }
                    Request_1.default.clear();
                    // VDom().refresh();
                    var url = location.hash.substring(1);
                    Data_1.default.__before_url = location.hash;
                    var routes = Routes_1.default.searchRoute(url);
                    Response_1.default.rendering(routes);
                });
                window.addEventListener("submit", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    let vd = new VDomControl_1.default([e.target]);
                    var targetRef = vd.ref;
                    var formBuffer = Util_1.default.searchForm(targetRef);
                    if (formBuffer) {
                        formBuffer.submit();
                    }
                });
                window.addEventListener("reset", function (e) {
                    // @ts-ignore
                    var targetId = e.target.id;
                    var formBuffer = Util_1.default.searchForm(targetId);
                    if (formBuffer) {
                        formBuffer.reset();
                    }
                });
                window.addEventListener('change', function (e) {
                    // @ts-ignore
                    var targetType = e.target.type;
                    if (targetType != "file") {
                        return;
                    }
                    // @ts-ignore
                    var name = e.target.name;
                    var buffers = [];
                    var ind = 0;
                    // @ts-ignore
                    let files = e.target.files;
                    for (var n = 0; n < files.length; n++) {
                        var file = files[n];
                        var buffer = {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                        };
                        buffers.push(buffer);
                        var file_reader = new FileReader();
                        file_reader.addEventListener('load', function (e2) {
                            let result = e2.target.result;
                            // @ts-ignore
                            buffers[ind].result = Util_1.default.base64Encode(result);
                            ind++;
                        });
                        file_reader.readAsText(file);
                    }
                    Request_1.default.__file_uploads[name].push(buffers);
                });
                // background class method load.
                if (app_1.default.backgrounds) {
                    for (let n = 0; n < app_1.default.backgrounds.length; n++) {
                        let bgPath = PATH_BACKGROUND + "/" + Util_1.default.ucFirst(app_1.default.backgrounds[n]);
                        if (useExists(bgPath)) {
                            const bg = use(bgPath);
                            yield bg.handleBegin();
                        }
                    }
                }
                var routes = Routes_1.default.searchRoute();
                Response_1.default.rendering(routes);
            });
        });
    });
})();
