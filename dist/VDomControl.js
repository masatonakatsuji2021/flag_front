"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomControl_1 = require("DomControl");
const DomStatic_1 = require("DomStatic");
class VDomControl extends DomControl_1.default {
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
        console.log(DomStatic_1.default);
        return this;
    }
    /**
     * child
     * Specifies the child element of the argument selector,
     * If no selector is specified, all child elements are included
     * @param {string} refName ref name
     * @returns {VDomControl} VDomControl Class Object
     */
    child(refName) {
        let v = [];
        let v1;
        let v2;
        v1 = super.child().findOnVirtual("__ref", refName);
        for (var n = 0; n < v1._qs.length; n++) {
            var q_ = v1._qs[n];
            v.push(q_);
        }
        v2 = super.child("[ref=\"" + refName + "\"]");
        v2.virtual("__ref", refName);
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
