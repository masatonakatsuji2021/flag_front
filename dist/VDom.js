"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dom_1 = require("Dom");
const VDom = function (refName, qs = null) {
    if (qs) {
        //        var v = Dom(null , qs).findOnVirtual("__ref", refName);
    }
    else {
        var v = (0, Dom_1.default)().findOnVirtual("__ref", refName);
    }
    if (!v.length) {
        var v = (0, Dom_1.default)("[ref=\"" + refName + "\"]");
        v.virtual("__ref", refName);
        v.removeAttr("ref");
    }
    // @ts-ignore
    v.find = (refName) => {
        if (refName) {
            return VDom(refName);
        }
        else {
        }
    };
    return v;
};
exports.default = VDom;
