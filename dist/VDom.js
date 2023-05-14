"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VDomControl_1 = require("VDomControl");
const Dom_1 = require("Dom");
const DomControl_1 = require("DomControl");
const VDom = function (refName, qs = null) {
    let v;
    if (qs) {
        v = new DomControl_1.default(qs).findOnVirtual("__ref", refName);
    }
    else {
        v = (0, Dom_1.default)().findOnVirtual("__ref", refName);
    }
    if (!v.length) {
        v = (0, Dom_1.default)("[ref=\"" + refName + "\"]");
        v.virtual("__ref", refName);
    }
    return new VDomControl_1.default(v._qs);
};
exports.default = VDom;
