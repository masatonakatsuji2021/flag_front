"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("Data");
const Util_1 = require("Util");
const EventTypes = [
    "click",
    "dblclick",
    "contextmenu",
    "change",
    "focus",
    "mousemove",
    "mouseup",
    "mousedown",
    "keyup",
    "keydown",
    "keypress",
];
class DomControl {
    constructor(qs) {
        this._qs = null;
        this._virtual = false;
        this.renderingRefreshStatus = true;
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
                    if (selector instanceof NodeList) {
                        // @ts-ignore
                        selectList = selector;
                    }
                    else {
                        selectList = [selector];
                    }
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
    static loadOnVirtual(refName) {
        let v = [];
        if (refName) {
            let v1;
            let v2;
            v1 = DomControl.load().findOnVirtual("__ref", refName);
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
                v2 = DomControl.load(selector);
                for (var n = 0; n < v2.length; n++) {
                    var v2_ = v2.index(n);
                    var refName2 = v2_.attr("ref");
                    v2_.virtual("__ref", refName2);
                }
            }
            else {
                v2 = DomControl.load("[ref=\"" + refName + "\"]");
                v2.virtual("__ref", refName);
            }
            v2.removeAttr("ref");
            for (var n = 0; n < v2._qs.length; n++) {
                var q_ = v2._qs[n];
                v.push(q_);
            }
        }
        const vdo = new DomControl(v);
        vdo._virtual = true;
        return vdo;
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
            if (!Data_1.default.__uids[qs.uid]) {
                continue;
            }
            var uids = Data_1.default.__uids[qs.uid];
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
        if (this._virtual) {
            return this.childOnVirtual(selector);
        }
        else {
            return this.childNoVirtual(selector);
        }
    }
    childNoVirtual(selector) {
        let qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            const qs = this._qs[n];
            let buff;
            if (selector) {
                buff = qs.querySelectorAll(selector);
            }
            else {
                buff = qs.childNodes;
            }
            buff.forEach(function (b_) {
                qss.push(b_);
            });
        }
        return new DomControl(qss);
    }
    childOnVirtual(refName) {
        let v = [];
        let v1;
        let v2;
        v1 = this.childNoVirtual().findOnVirtual("__ref", refName);
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
                v2 = this.childNoVirtual("[ref$=\"" + rns[1] + "\"]");
            }
            else {
                v2 = this.childNoVirtual("[ref^=\"" + rns[0] + "\"]");
            }
            for (var n = 0; n < v2.length; n++) {
                var v2_ = v2.index(n);
                var ref = v2_.attr("ref");
                v2_.virtual("__ref", ref);
            }
        }
        else {
            v2 = this.childNoVirtual("[ref=\"" + refName + "\"]");
            v2.virtual("__ref", refName);
        }
        v2.removeAttr("ref");
        for (var n = 0; n < v2._qs.length; n++) {
            var q_ = v2._qs[n];
            v.push(q_);
        }
        return new DomControl(v);
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
        if (this.renderingRefreshStatus) {
            this.renderingRefresh();
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
        if (this.renderingRefreshStatus) {
            this.renderingRefresh();
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
        if (this.renderingRefreshStatus) {
            this.renderingRefresh();
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
        if (this.renderingRefreshStatus) {
            this.renderingRefresh();
        }
        return this;
    }
    /**
     * ***stamp*** :
     *
     * @param {string} stampSource
     * @param {Function} callback
     * @returns {DomControl} DomControl Class Object
     */
    stamp(stampSource, callback) {
        this.append(stampSource);
        let target = this.child().last;
        callback(target);
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
        if (this.renderingRefreshStatus) {
            this.renderingRefresh();
        }
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
        if (this.renderingRefreshStatus) {
            this.renderingRefresh();
        }
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
            if (!Data_1.default.__uids[qs.uid]) {
                return null;
            }
            var uids = Data_1.default.__uids[qs.uid];
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
                if (!Data_1.default.__uids[qs.uid]) {
                    Data_1.default.__uids[qs.uid] = {};
                }
                if (!Data_1.default.__uids[qs.uid].virtual) {
                    Data_1.default.__uids[qs.uid].virtual = {};
                    Data_1.default.__uids[qs.uid].target = qs;
                }
                Data_1.default.__uids[qs.uid].virtual[name] = value;
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
            if (!Data_1.default.__uids[qs.uid]) {
                continue;
            }
            if (!Data_1.default.__uids[qs.uid].virtual) {
                continue;
            }
            delete Data_1.default.__uids[qs.uid].virtual[name];
            // @ts-ignore
            if (Data_1.default.__uids[qs.uid].virtual == {}) {
                delete Data_1.default.__uids[qs.uid].virtual;
            }
            // @ts-ignore
            if (Data_1.default.__uids[qs.uid] == {}) {
                delete Data_1.default.__uids[qs.uid];
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
    /**
   * ***refresh*** :
   * @returns {VDomControl} VDomCOntrol Class Object
   */
    refresh() {
        if (!this._virtual) {
            return this;
        }
        const refCheckCode = "__refcheck__";
        let c = Object.keys(Data_1.default.__uids);
        for (var n = 0; n < c.length; n++) {
            var uid = c[n];
            var obj = Data_1.default.__uids[uid];
            obj.target.setAttribute(refCheckCode, uid);
            if (!document.querySelector("[" + refCheckCode + "=\"" + uid + "\"]")) {
                delete Data_1.default.__uids[uid];
            }
            obj.target.removeAttribute(refCheckCode);
        }
        return this;
    }
    get ref() {
        if (this._virtual) {
            return this.virtual("__ref");
        }
    }
    renderingRefresh() {
        for (let n = 0; n < EventTypes.length; n++) {
            const eventType = EventTypes[n];
            const target = "v-on-" + eventType;
            const search = DomControl.load("[" + target + "]");
            for (let n2 = 0; n2 < search.length; n2++) {
                const s_ = search.index(n2);
                const handleName = s_.attribute(target);
                s_.removeAttribute(target);
                if (Data_1.default.__before_controller) {
                    if (Data_1.default.__before_controller[handleName]) {
                        s_.on(eventType, Data_1.default.__before_controller[handleName]);
                    }
                }
                if (Data_1.default.__before_view) {
                    if (Data_1.default.__before_view[handleName]) {
                        s_.on(eventType, Data_1.default.__before_view[handleName]);
                    }
                }
            }
        }
    }
}
exports.default = DomControl;
;
