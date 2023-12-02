"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("Util");
const DomStatic_1 = require("DomStatic");
class DomControl {
    constructor(qs) {
        this._qs = null;
        this._qs = qs;
        for (var n = 0; n < this._qs.length; n++) {
            var qs_ = this._qs[n];
            if (!qs_.uid) {
                var uid = Util_1.default.uniqId();
                qs_.uid = uid;
            }
        }
    }
    static load(selector) {
        let fullSelector = "";
        if (selector) {
            if (typeof selector == "string") {
                fullSelector = "html " + selector;
            }
            else {
                let selectList = [];
                if (!Array.isArray(selector)) {
                    selectList = [selector];
                }
                else {
                    selectList = selector;
                }
                return new DomControl(selectList);
            }
        }
        else {
            fullSelector = "html *";
        }
        var qs = document.querySelectorAll(fullSelector);
        return new DomControl(qs);
    }
    /**
     * ***get*** :
     * Get the document information of the get DOM.
     */
    get get() {
        return this._qs;
    }
    /**
     * ***length*** :
     * Get the number of elements in the get DOM.
     * @returns {number} length
     */
    get length() {
        return this._qs.length;
    }
    /**
     * ***exists*** :
     * Determine whether an element exists.
     * @returns {bolean} judgment result
     */
    get exists() {
        if (this._qs.length) {
            return true;
        }
        return false;
    }
    /**
     * ***first*** :
     * Specifies the first element.
     * @returns {DomControl} DomControl Class Object
     */
    get first() {
        return new DomControl([this._qs[0]]);
    }
    /**
     * ***last*** :
     * Specifies the last element.
     * @returns {DomControl} DomControl Class Object
     */
    get last() {
        return new DomControl([this._qs[this._qs.length - 1]]);
    }
    /**
     * ***parent*** :
     * Specifies the parent element one level above.
     * @returns {DomControl} DomControl Class Object
     */
    get parent() {
        return new DomControl([this._qs[this._qs.length - 1].parentNode]);
    }
    /**
     * ***index*** :
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {DomControl} DomControl Class Object
     */
    index(index) {
        return new DomControl([this._qs[index]]);
    }
    /**
     * ***even*** :
     * Extract even element information only.
     * @returns {DomControl} DomControl Class Object
     */
    get even() {
        var qs_ = [];
        for (var n = 0; n < this._qs.length; n++) {
            var q_ = this._qs[n];
            if (n % 2 == 0) {
                qs_.push(q_);
            }
        }
        return new DomControl(qs_);
    }
    /**
     * ***odd*** :
     * Extract only odd element information
     * @returns {DomControl} DomControl Class Object
     */
    get odd() {
        var qs_ = [];
        for (var n = 0; n < this._qs.length; n++) {
            var q_ = this._qs[n];
            if (n % 2 == 1) {
                qs_.push(q_);
            }
        }
        return new DomControl(qs_);
    }
    /**
     * ***findOnAttr*** :
     * Specifies only elements that contain attribute information that matches the conditions of the argument.
     * @param {string} name attribute name
     * @param {string|number} value attribute value
     * @returns {DomControl} DomControl Class Object
     */
    findOnAttr(name, value) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!qs.attributes[name]) {
                continue;
            }
            if (qs.attributes[name].value == value) {
                qss.push(qs);
            }
        }
        return new DomControl(qss);
    }
    /**
     * ***findOnVirtual*** :
     * Specify only elements that contain Virtual attribute information that matches the argument conditions.
     * @param {string} name virtual attribute name
     * @param {any} value virtual attribute value
     * @returns {DomControl} DomControl Class Object
     */
    findOnVirtual(name, value) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!qs.uid) {
                continue;
            }
            if (!DomStatic_1.default.__uids[qs.uid]) {
                continue;
            }
            var uids = DomStatic_1.default.__uids[qs.uid];
            if (!uids.virtual) {
                continue;
            }
            if (!uids.virtual[name]) {
                continue;
            }
            let targetValue = uids.virtual[name].toString();
            if (value.toString().indexOf("*") > -1) {
                let vns = value.split("*");
                let judge = false;
                if (!vns[0].trim()) {
                    if (targetValue.indexOf(vns[1]) > 0) {
                        judge = true;
                    }
                }
                else {
                    if (targetValue.indexOf(vns[0]) === 0) {
                        judge = true;
                    }
                }
                if (!judge) {
                    continue;
                }
            }
            else {
                if (uids.virtual[name] != value) {
                    continue;
                }
            }
            qss.push(qs);
        }
        return new DomControl(qss);
    }
    child(selector) {
        if (!selector) {
            selector = "*";
        }
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var buff = qs.querySelectorAll(selector);
            buff.forEach(function (b_) {
                qss.push(b_);
            });
        }
        return new DomControl(qss);
    }
    /**
     * ***text*** :
     * get/set the text inside the element tag
     */
    get text() {
        return this._qs[this._qs.length - 1].innerText;
    }
    set text(text) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.innerText = text;
        }
    }
    /**
     * ***html*** :
     * Get/Set the HTML inside the element tag (innerHTML)
     */
    get html() {
        return this._qs[this._qs.length - 1].innerHTML;
    }
    set html(html) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.innerHTML = html;
        }
    }
    /**
     * ***outerHtml*** :
     * Get/Set the HTML inside the element tag (outerHTML)
     */
    get outerHtml() {
        return this._qs[this._qs.length - 1].outerHTML;
    }
    set outerHtml(html) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.outerHtml = html;
        }
    }
    append(contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("beforeend", contents);
            }
            else {
                qs.append(contents);
            }
        });
        return this;
    }
    before(contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("beforebegin", contents);
            }
            else {
                qs.before(contents);
            }
        });
        return this;
    }
    after(contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("afterend", contents);
            }
            else {
                qs.after(contents);
            }
        });
        return this;
    }
    /**
     * ***remove*** :
     * remove the element
     * @returns {DomControl} DomControl Class Object
     */
    remove() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.remove();
        }
        return this;
    }
    /**
     * ***empty*** :
     * clear inside element
     * @returns {DomControl} DomControl Class Object
     */
    empty() {
        this.html = "";
        return this;
    }
    /**
     * ***on*** :
     * set the event handler.
     * @param {string} eventName event name
     * @param {Function} callback callback function
     * @returns {DomControl} DomControl Class Object
     */
    on(eventName, callback) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.addEventListener(eventName, (e) => {
                const targetDom = new DomControl([e.target]);
                callback(targetDom, e);
            });
        }
        return this;
    }
    /**
     * ***onClick*** :
     * Wrapper function when eventname of on method is set to "click".
     * @param {Function} callback callback function
     */
    set onClick(callback) {
        this.on("click", callback);
    }
    /**
     * ***onContextmenu*** :
     * Wrapper function when eventname of on method is set to "contextmenu".
     * @param {Function} callback callback function
     */
    set onContextmenu(callback) {
        this.on("contextmenu", callback);
    }
    /**
     * ***onChange*** :
     * Wrapper function when eventname of on method is set to "change".
     * @param {Function} callback callback function
     */
    set onChange(callback) {
        this.on("change", callback);
    }
    /**
     * ***onKeyUp*** :
     * Wrapper function when eventname of on method is set to "keyup".
     * @param {Function} callback callback function
     */
    set onKeyUp(callback) {
        this.on("keyup", callback);
    }
    /**
     * ***onKeyDown*** :
     * Wrapper function when eventname of on method is set to "onKeyDown".
     * @param {Function} callback callback function
     */
    set onKeyDown(callback) {
        this.on("keyup", callback);
    }
    /**
     * ***onKeyPress*** :
     * Wrapper function when eventname of on method is set to "keypress".
     * @param {Function} callback callback function
     */
    set onKeyPress(callback) {
        this.on("keypress", callback);
    }
    /**
     * ***onMouseUp**** :
     * Wrapper function when eventname of on method is set to "mouseup".
     * @param {Function} callback callback function
     */
    set onMouseUp(callback) {
        this.on("mouseup", callback);
    }
    /**
     * ***onMouseDown*** :
     * Wrapper function when eventname of on method is set to "mousedown".
     * @param {Function} callback callback function
     */
    set onMouseDown(callback) {
        this.on("mousedown", callback);
    }
    /**
     * ***onMouseMove*** :
     * Wrapper function when eventname of on method is set to "mousemove".
     * @param {Function} callback callback function
     */
    set onMouseMove(callback) {
        this.on("mousemove", callback);
    }
    attribute(name, value) {
        if (value == undefined) {
            return this._qs[this._qs.length - 1].attributes[name].value;
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.setAttribute(name, value);
            }
            return this;
        }
    }
    attr(name, value) {
        return this.attribute(name, value);
    }
    /**
     * ***removeAttribute*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    removeAttribute(name) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.removeAttribute(name);
        }
        return this;
    }
    /**
     * ***removeAttr*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    removeAttr(name) {
        return this.removeAttribute(name);
    }
    virtual(name, value) {
        if (this._qs.length == 0) {
            return;
        }
        if (value == undefined) {
            var qs = this._qs[this._qs.length - 1];
            if (!DomStatic_1.default.__uids[qs.uid]) {
                return null;
            }
            var uids = DomStatic_1.default.__uids[qs.uid];
            if (!uids.virtual) {
                return null;
            }
            if (!uids.virtual[name]) {
                return null;
            }
            return uids.virtual[name];
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (!DomStatic_1.default.__uids[qs.uid]) {
                    DomStatic_1.default.__uids[qs.uid] = {};
                }
                if (!DomStatic_1.default.__uids[qs.uid].virtual) {
                    DomStatic_1.default.__uids[qs.uid].virtual = {};
                    DomStatic_1.default.__uids[qs.uid].target = qs;
                }
                DomStatic_1.default.__uids[qs.uid].virtual[name] = value;
            }
            return this;
        }
    }
    /**
     * ***removeVirtual*** :
     * Delete virtual attribute information
     * @param {string} name virtual attribute name
     * @returns {DomControl} DomControl Class Object
     */
    removeVirtual(name) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!DomStatic_1.default.__uids[qs.uid]) {
                continue;
            }
            if (!DomStatic_1.default.__uids[qs.uid].virtual) {
                continue;
            }
            delete DomStatic_1.default.__uids[qs.uid].virtual[name];
            // @ts-ignore
            if (DomStatic_1.default.__uids[qs.uid].virtual == {}) {
                delete DomStatic_1.default.__uids[qs.uid].virtual;
            }
            // @ts-ignore
            if (DomStatic_1.default.__uids[qs.uid] == {}) {
                delete DomStatic_1.default.__uids[qs.uid];
            }
        }
        return this;
    }
    /**
     * ***style*** :
     * Sets stylesheet information.
     * @param {object} options stylesheet attribute information
     * @returns {DomControl} DomControl Class Object
     */
    style(options) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var columns = Object.keys(options);
            for (var n2 = 0; n2 < columns.length; n2++) {
                var key = columns[n2];
                var val = options[key];
                qs.style[key] = val;
            }
        }
        return this;
    }
    getStyle(name) {
        var qs = this._qs[this._qs.length - 1];
        if (name) {
            if (!qs.style[name]) {
                return null;
            }
            return qs.style[name];
        }
        else {
            return qs.style;
        }
    }
    addClass(className) {
        if (typeof className == "string") {
            className = [className];
        }
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            for (var n2 = 0; n2 < className.length; n2++) {
                var c = className[n2];
                qs.classList.add(c);
            }
        }
        return this;
    }
    /**
     * ***removeClass*** :
     * remove the class attribute
     * @param {string} className Delete class name
     * @returns {DomControl} DomControl Class Object
     */
    removeClass(className) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.classList.remove(className);
        }
        return this;
    }
    /**
     * ***isClass*** :
     * Checks if the specified class exists in the element
     * @param {string} className Delete class name
     * @returns {boolean} exists status
     */
    isClass(className) {
        var qs = this._qs[this._qs.length - 1];
        return qs.classList.contains(className);
    }
    value(value) {
        if (value == undefined) {
            return this.get_value_default(0);
        }
        else {
            return this.set_value_Default(0, value);
        }
    }
    default(value) {
        if (value == undefined) {
            return this.get_value_default(1);
        }
        else {
            return this.set_value_Default(1, value);
        }
    }
    get_value_default(mode) {
        var qs = this._qs[this._qs.length - 1];
        if (qs.type == "radio") {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (qs.checked == true) {
                    return qs.value;
                }
            }
        }
        else if (qs.type == "checkbox") {
            var result = [];
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (qs.checked == true) {
                    result.push(qs.value);
                }
            }
            return result;
        }
        else {
            return qs.value;
        }
    }
    set_value_Default(mode, value) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var type = qs.type;
            if (type == "radio") {
                if (qs.value == value) {
                    if (mode == 0) {
                        qs.checked = true;
                    }
                    else {
                        qs.setAttribute("checked", true);
                    }
                }
                else {
                    if (mode == 0) {
                        qs.checked = false;
                    }
                    else {
                        qs.removeAttribute("checked");
                    }
                }
            }
            else if (type == "checkbox") {
                if (typeof value == "string") {
                    value = [value];
                }
                if (mode == 0) {
                    qs.checked = false;
                }
                else {
                    qs.removeAttribute("checked");
                }
                for (var n2 = 0; n2 < value.length; n2++) {
                    var v = value[n2];
                    if (qs.value == v) {
                        if (mode == 0) {
                            qs.checked = true;
                        }
                        else {
                            qs.setAttribute("checked", true);
                        }
                    }
                }
            }
            else {
                if (mode == 0) {
                    qs.value = value;
                }
                else {
                    qs.setAttribute("value", value);
                }
            }
        }
        return this;
    }
    valueIncrement(step) {
        let value = this.value();
        if (!step) {
            step = parseInt(this.attr("step"));
        }
        let min = this.attr("min");
        let max = this.attr("max");
        value++;
        if (min) {
            if (value < min) {
                value = min;
            }
        }
        if (max) {
            if (value > max) {
                value = max;
            }
        }
        return this.value(value);
    }
    valueDecrement(step) {
        let value = this.value();
        if (!step) {
            step = parseInt(this.attr("step"));
        }
        let min = this.attr("min");
        let max = this.attr("max");
        value--;
        if (min) {
            if (value < min) {
                value = min;
            }
        }
        if (max) {
            if (value > max) {
                value = max;
            }
        }
        return this.value(value);
    }
    /**
     * ***nodeName*** :
     * get the node name of an element.
     */
    get nodeName() {
        var qs = this._qs[this._qs.length - 1];
        return qs.localName;
    }
    /**
     * ***type*** :
     * get the type attribute.
     */
    get type() {
        return this.attr("type");
    }
    /**
     * ***click*** :
     * performs a click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    click() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.click();
        }
        return this;
    }
    /**
     * ***dblclick*** :
     * Performs a double click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    dblclick() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }
    /**
     * ***submit*** :
     * Executes element submission.
     * @returns {DomControl} DomControl Class Object
     */
    submit() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }
    /**
     * ***focus*** :
     * Performs element focus.
     * @returns {DomControl} DomControl Class Object
     */
    focus() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.focus();
        }
        return this;
    }
}
exports.default = DomControl;
;
