"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomControl_1 = require("DomControl");
const DomStatic_1 = require("DomStatic");
class VDomControl extends DomControl_1.default {
    get ref() {
        return this.virtual("__ref");
    }
    /**
     * ***refresh*** :
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
     * ***first*** :
     * Specifies the first element.
     * @returns {VDomControl} VDomControl Class Object
     */
    get first() {
        let v = super.first;
        return new VDomControl(v._qs);
    }
    /**
     * ***last*** :
     * Specifies the last element.
     * @returns {VDomControl} VDomControl Class Object
     */
    get last() {
        let v = super.last;
        return new VDomControl(v._qs);
    }
    /**
     * ***parent*** :
     * Specifies the parent element one level above.
     * @returns {VDomControl} VDomControl Class Object
     */
    get parent() {
        let v = super.parent;
        return new VDomControl(v._qs);
    }
    /**
     * ***index*** :
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {VDomControl} VDomControl Class Object
     */
    index(index) {
        let v = super.index(index);
        return new VDomControl(v._qs);
    }
    /**
     * ***even*** :
     * Extract even element information only.
     * @returns {VDomControl} VDomControl Class Object
     */
    get even() {
        const v = super.even;
        return new VDomControl(v._qs);
    }
    /**
     * ***odd** :
     * Extract only odd element information
     * @returns {VDomControl} VDomControl Class Object
     */
    get odd() {
        const v = super.odd;
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
        const v = super.findOnAttr(name, value);
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
        const v = super.findOnVirtual(name, value);
        return new VDomControl(v._qs);
    }
    append(contents) {
        const v = super.append(contents);
        return new VDomControl(v._qs);
    }
    /**
     * ***stamp*** :
     *
     * @param {string} stampSource
     * @param {Function} callback
     * @returns {VDomControl} VDomControl Class Object
     */
    stamp(stampSource, callback) {
        const v = super.stamp(stampSource, callback);
        return new VDomControl(v._qs);
    }
    before(contents) {
        const v = super.before(contents);
        return new VDomControl(v._qs);
    }
    after(contents) {
        const v = super.after(contents);
        return new VDomControl(v._qs);
    }
    /**
     * ***remove*** :
     * remove the element
     * @returns {VDomControl} VDomControl Class Object
     */
    remove() {
        const v = super.remove();
        return new VDomControl(v._qs);
    }
    /**
     * ***empty*** :
     * clear inside element
     * @returns {VDomControl} VDomControl Class Object
     */
    empty() {
        const v = super.empty();
        return new VDomControl(v._qs);
    }
    /**
     * ***on*** :
     * set the event handler.
     * @param {string} eventName event name
     * @param {Function} callback callback function
     * @returns {VDomControl} VDomControl Class Object
     */
    on(eventName, callback) {
        const v = super.on(eventName, callback);
        return new VDomControl(v._qs);
    }
    attribute(name, value) {
        const v = super.attribute(name, value);
        if (typeof v == "string") {
            return v;
        }
        else {
            return new VDomControl(v._qs);
        }
    }
    attr(name, value) {
        return this.attribute(name, value);
    }
    /**
     * ***removeAttribute*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {VDomControl} VDomControl Class Object
     */
    removeAttribute(name) {
        const v = super.removeAttribute(name);
        return new VDomControl(v._qs);
    }
    /**
     * ***removeAttr*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {VDomControl} VDomControl Class Object
     */
    removeAttr(name) {
        return this.removeAttribute(name);
    }
    virtual(name, value) {
        const v = super.virtual(name, value);
        if (typeof v == "string") {
            return v;
        }
        else {
            return new VDomControl(v._qs);
        }
    }
    /**
     * ***removeVirtual*** :
     * Delete virtual attribute information
     * @param {string} name virtual attribute name
     * @returns {VDomControl} VDomControl Class Object
     */
    removeVirtual(name) {
        const v = super.removeVirtual(name);
        return new VDomControl(v._qs);
    }
    /**
     * ***style*** :
     * Sets stylesheet information.
     * @param {object} options stylesheet attribute information
     * @returns {VDomControl} VDomControl Class Object
     */
    style(options) {
        const v = super.style(options);
        return new VDomControl(v._qs);
    }
    addClass(className) {
        const v = super.addClass(className);
        return new VDomControl(v._qs);
    }
    /**
     * ***removeClass*** :
     * remove the class attribute
     * @param {string} className Delete class name
     * @returns {VDomControl} VDomControl Class Object
     */
    removeClass(className) {
        const v = super.removeClass(className);
        return new VDomControl(v._qs);
    }
    value(value) {
        const v = super.value(value);
        if (v instanceof DomControl_1.default) {
            return new VDomControl(v._qs);
        }
        else {
            return v;
        }
    }
    default(value) {
        const v = super.default(value);
        if (v instanceof DomControl_1.default) {
            return new VDomControl(v._qs);
        }
        else {
            return v;
        }
    }
    valueIncrement(step) {
        const v = super.valueIncrement(step);
        return new VDomControl(v._qs);
    }
    valueDecrement(step) {
        const v = super.valueDecrement(step);
        return new VDomControl(v._qs);
    }
    /**
     * ***click*** :
     * performs a click on an element.
     * @returns {VDomControl} VDomControl Class Object
     */
    click() {
        const v = super.click();
        return new VDomControl(v._qs);
    }
    /**
     * ***dblclick*** :
     * Performs a double click on an element.
     * @returns {VDomControl} VDomControl Class Object
     */
    dblclick() {
        const v = super.dblclick();
        return new VDomControl(v._qs);
    }
    /**
     * ***submit*** :
     * Executes element submission.
     * @returns {VDomControl} VDomControl Class Object
     */
    submit() {
        const v = super.submit();
        return new VDomControl(v._qs);
    }
    /**
     * ***focus*** :
     * Performs element focus.
     * @returns {DomControl} DomControl Class Object
     */
    focus() {
        const v = super.focus();
        return new VDomControl(v._qs);
    }
}
exports.default = VDomControl;
