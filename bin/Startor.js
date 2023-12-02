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
const Response_1 = require("Response");
exports.default = (function () {
    return __awaiter(this, void 0, void 0, function* () {
        window.addEventListener("load", function () {
            return __awaiter(this, void 0, void 0, function* () {
                window.addEventListener("popstate", (e) => {
                    if (!Response_1.default.pageEnable) {
                        if (Data_1.default.__before_url) {
                            history.pushState(null, null, Data_1.default.__before_url);
                        }
                        else {
                            history.pushState(null, null);
                        }
                        return false;
                    }
                    var url = location.hash.substring(1);
                    Data_1.default.__before_url = location.hash;
                    var routes = Routes_1.default.searchRoute(url);
                    Response_1.default.rendering(routes);
                });
                const Config = use("app/config/app");
                // background class method load.
                if (Config.backgrounds) {
                    for (let n = 0; n < Config.backgrounds.length; n++) {
                        let bgPath = PATH_BACKGROUND + "/" + Util_1.default.ucFirst(Config.backgrounds[n]);
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
