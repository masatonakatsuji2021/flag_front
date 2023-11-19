"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomControl_1 = require("DomControl");
const DomStatic_1 = require("DomStatic");
class VDomControl extends DomControl_1.default {
    get ref() {
        return this.virtual("__ref");
    }
    /**
     * refresh
     * @returns {VDomControl} VDomCOntrol Class Object
     */
    refresh() {
        const refCheckCode = "__refcheck__";
        let c = Object.keys(DomStatic_1.default.__uids);
        for (var n = 0; n < c.length; n++) {
            var uid = c[n];
            var obj = DomStatic_1.default.__uids[uid];
            obj.target.setAttribute(refCheckCode, uid);
            if (!document.querySelector("[" + refCheckCode + "=\"" + uid + "\"]")) {
                delete DomStatic_1.default.__uids[uid];
            }
            obj.target.removeAttribute(refCheckCode);
        }
        return this;
    }
    /**
     * childDom
     * Specifies the child element of the argument selector,
     * @param {string} selector
     * @returns {VDomControl} VDomControl Class Object
     */
    childDom(selector) {
        let v = super.child(selector);
        return new VDomControl(v._qs);
    }
    child(refName) {
        let v = [];
        let v1;
        let v2;
        v1 = super.child().findOnVirtual("__ref", refName);
        for (var n = 0; n < v1._qs.length; n++) {
            var q_ = v1._qs[n];
            v.push(q_);
        }
        if (!refName) {
            refName = "*";
        }
        if (refName.indexOf("*") > -1) {
            var rns = refName.split("*");
            if (!rns[0].trim()) {
                v2 = super.child("[ref$=\"" + rns[1] + "\"]");
            }
            else {
                v2 = super.child("[ref^=\"" + rns[0] + "\"]");
            }
            for (var n = 0; n < v2.length; n++) {
                var v2_ = v2.index(n);
                var ref = v2_.attr("ref");
                v2_.virtual("__ref", ref);
            }
        }
        else {
            v2 = super.child("[ref=\"" + refName + "\"]");
            v2.virtual("__ref", refName);
        }
        v2.removeAttr("ref");
        for (var n = 0; n < v2._qs.length; n++) {
            var q_ = v2._qs[n];
            v.push(q_);
        }
        return new VDomControl(v);
    }
    /**
     * first
     * Specifies the first element.
     * @returns {VDomControl} VDomControl Class Object
     */
    first() {
        let v = super.first();
        return new VDomControl(v._qs);
    }
    /**
     * last
     * Specifies the last element.
     * @returns {VDomControl} VDomControl Class Object
     */
    last() {
        let v = super.last();
        return new VDomControl(v._qs);
    }
    /**
     * parent
     * Specifies the parent element one level above.
     * @returns {VDomControl} VDomControl Class Object
     */
    parent() {
        let v = super.parent();
        return new VDomControl(v._qs);
    }
    /**
     * index
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {VDomControl} VDomControl Class Object
     */
    index(index) {
        let v = super.index(index);
        return new VDomControl(v._qs);
    }
    /**
     * even
     * Extract even element information only.
     * @param {number} index element index
     * @returns {VDomControl} VDomControl Class Object
     */
    even() {
        let v = super.even();
        return new VDomControl(v._qs);
    }
    /**
     * odd :
     * Extract only odd element information
     * @returns {VDomControl} VDomControl Class Object
     */
    odd() {
        let v = super.odd();
        return new VDomControl(v._qs);
    }
    /**
     * findOnAttr
     * Specifies only elements that contain attribute information that matches the conditions of the argument.
     * @param {string} name attribute name
     * @param {string|number} value attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    findOnAttr(name, value) {
        let v = super.findOnAttr(name, value);
        return new VDomControl(v._qs);
    }
    /**
     * findOnVirtual
     * Specify only elements that contain Virtual attribute information that matches the argument conditions.
     * @param {string} name virtual attribute name
     * @param {string|number} value virtual attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    findOnVirtual(name, value) {
        let v = super.findOnVirtual(name, value);
        return new VDomControl(v._qs);
    }
}
exports.default = VDomControl;
