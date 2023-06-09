"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VDomControl_1 = require("VDomControl");
const Dom_1 = require("Dom");
/**
 * VDom
 * @param refName ref name
 * @returns {VDomControl} VDomControl Class Object
 */
const VDom = function (refName) {
    let v = [];
    if (refName) {
        let v1;
        let v2;
        v1 = (0, Dom_1.default)().findOnVirtual("__ref", refName);
        for (var n = 0; n < v1._qs.length; n++) {
            var q_ = v1._qs[n];
            v.push(q_);
        }
        if (refName.indexOf("*") > -1) {
            var rns = refName.split("*");
            let selector = "";
            if (!rns[0].trim()) {
                selector = "[ref$=\"" + rns[1] + "\"]";
            }
            else {
                selector = "[ref^=\"" + rns[0] + "\"]";
            }
            v2 = (0, Dom_1.default)(selector);
            for (var n = 0; n < v2.length; n++) {
                var v2_ = v2.index(n);
                var refName2 = v2_.attr("ref");
                v2_.virtual("__ref", refName2);
            }
        }
        else {
            v2 = (0, Dom_1.default)("[ref=\"" + refName + "\"]");
            v2.virtual("__ref", refName);
        }
        v2.removeAttr("ref");
        for (var n = 0; n < v2._qs.length; n++) {
            var q_ = v2._qs[n];
            v.push(q_);
        }
    }
    return new VDomControl_1.default(v);
};
exports.default = VDom;
