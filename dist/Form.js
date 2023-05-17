"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Form_instances, _Form__getData, _Form__tagInput, _Form__setDefaultsAndValues, _Form__setOptionString;
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("Util");
const Data_1 = require("Data");
const Dom_1 = require("Dom");
const VDom_1 = require("VDom");
const Request_1 = require("Request");
class Form {
    constructor(formName) {
        _Form_instances.add(this);
        this.formName = null;
        if (this.constructor.name == "Form") {
            this.formName = formName;
            var className = "Form";
            if (!Data_1.default.__form[this.formName]) {
                Data_1.default.__form[this.formName] = {
                    class: className,
                    eventSubmit: null,
                    eventReset: null,
                };
            }
        }
    }
    /**
     * handleSubmit
     * Event handler executed when the submit button is pressed.
     * @param {object} postData Input data
     * @returns {void}
     */
    handleSubmit(postData) { }
    /**
     * handleSubmit
     * Event handler executed when the reset button is pressed.
     * @param {object} postData Input data
     * @returns {void}
     */
    handleReset(postData) { }
    /**
     * handleSetting
     * Event handler for input form initialization
     * @param {any} args Arguments for pass-by-value
     * @returns {void}
     */
    handleSetting(...args) { }
    setting(argv) {
        // @ts-ignore
        this.handleSetting(argv);
        var className = Util_1.default.getClassName(this.constructor.name, "Form");
        if (!this.formName) {
            this.formName = Util_1.default.lcFirst(className);
        }
        Data_1.default.__form[this.formName] = {
            class: className,
        };
    }
    tagInput(name, option = null) {
        var str = __classPrivateFieldGet(this, _Form_instances, "m", _Form__tagInput).call(this, name, option);
        let vd = (0, VDom_1.default)(this.formName).child("form-" + name);
        if (vd) {
            vd.html(str);
        }
        return this;
    }
    tagHidden(name, value, option = null) {
        if (option == null) {
            option = {};
        }
        option.type = "hidden";
        option.value = value;
        return this.tagInput(name, option);
    }
    tagNumber(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "number";
        return this.tagInput(name, option);
    }
    tagPassword(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "password";
        return this.tagInput(name, option);
    }
    tagDate(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "date";
        return this.tagInput(name, option);
    }
    tagTime(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "time";
        return this.tagInput(name, option);
    }
    tagColor(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "color";
        return this.tagInput(name, option);
    }
    tagFile(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "file";
        return this.tagInput(name, option);
    }
    tagSelect(name, selects, option = null) {
        if (option == undefined) {
            option = {};
        }
        var optionStr = __classPrivateFieldGet(this, _Form_instances, "m", _Form__setOptionString).call(this, option);
        var selectStr = "";
        if (option.empty) {
            selectStr += "<option value=\"\">" + option.empty + "</option>";
        }
        var columns = Object.keys(selects);
        for (var n = 0; n < columns.length; n++) {
            var key = columns[n];
            var val = selects[key];
            selectStr += "<option value=\"" + key + "\">" + val + "</option>";
        }
        var str = "<select name=\"" + name + "\" " + optionStr + ">" + selectStr + "</select>";
        let vd = (0, VDom_1.default)(this.formName).child("form-" + name);
        if (vd) {
            vd.html(str);
        }
        return this;
    }
    tagTextarea(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        var optionStr = __classPrivateFieldGet(this, _Form_instances, "m", _Form__setOptionString).call(this, option);
        var str = "<textarea name=\"" + name + "\" " + optionStr + "></textarea>";
        let vd = (0, VDom_1.default)(this.formName).child("form-" + name);
        if (vd) {
            vd.html(str);
        }
        return this;
    }
    tagRadio(name, selects, option = null) {
        if (option == undefined) {
            option = {};
        }
        var str = "";
        var columns = Object.keys(selects);
        for (var n = 0; n < columns.length; n++) {
            var key = columns[n];
            var val = selects[key];
            option.type = "radio";
            option.value = key;
            str += "<label>" + __classPrivateFieldGet(this, _Form_instances, "m", _Form__tagInput).call(this, name, option) + val + "</label>";
        }
        let vd = (0, VDom_1.default)(this.formName).child("form-" + name);
        if (vd) {
            vd.html(str);
        }
        return this;
    }
    tagCheckbox(name, selects, option = null) {
        if (option == undefined) {
            option = {};
        }
        var str = "";
        var columns = Object.keys(selects);
        for (var n = 0; n < columns.length; n++) {
            var key = columns[n];
            var val = selects[key];
            option.type = "checkbox";
            option.value = key;
            str += "<label>" + __classPrivateFieldGet(this, _Form_instances, "m", _Form__tagInput).call(this, name, option) + val + "</label>";
        }
        let vd = (0, VDom_1.default)(this.formName).child("form-" + name);
        if (vd) {
            vd.html(str);
        }
        return this;
    }
    /**
     * tagButton
     *
     * generate a button
     *
     * @param {string} name button name
     * @param {string} value display text
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagButton(name, value, option = null) {
        if (option == null) {
            option = {};
        }
        option.type = "button";
        option.default = value;
        return this.tagInput(name, option);
    }
    /**
     * tagButton
     *
     * Generate a Submit button
     *
     * @param {string} name button name
     * @param {string} value display text
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagSubmit(name, value, option = null) {
        if (option == null) {
            option = {};
        }
        option.type = "submit";
        option.default = value;
        return this.tagInput(name, option);
    }
    /**
     * tagButton
     *
     * Generate a Reset button
     *
     * @param {string} name button name
     * @param {string} value display text
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagReset(name, value, option = null) {
        if (option == null) {
            option = {};
        }
        option.type = "reset";
        option.default = value;
        return this.tagInput(name, option);
    }
    /**
     * setValues
     *
     * Set the initial value in the input field.
     * If a reset event occurs, all values and selection values set here will be cleared.
     *
     * After the reset event occurs,
     * if you want to return to the set value,
     * please use the "setDefaults" method instead
     *
     * @param {object} data Setting data
     * @returns {Form} Form Class Object (method chain)
     */
    setValues(data) {
        return __classPrivateFieldGet(this, _Form_instances, "m", _Form__setDefaultsAndValues).call(this, data, 0);
    }
    /**
     * setDefaults
     *
     * Set the initial value in the input field.
     * If a reset event occurs, revert to the set value.
     *
     * @param {object} data Setting data
     * @returns {Form} Form Class Object (method chain)
     */
    setDefaults(data) {
        return __classPrivateFieldGet(this, _Form_instances, "m", _Form__setDefaultsAndValues).call(this, data, 1);
    }
    existSubmitEvent() {
        if (this.constructor.name == "Form") {
            if (__classPrivateFieldGet(this, _Form_instances, "m", _Form__getData).call(this).eventSubmit) {
                return true;
            }
        }
        else {
            if (this.handleSubmit) {
                return true;
            }
        }
        return false;
    }
    existResetEvent() {
        if (this.constructor.name == "Form") {
            if (__classPrivateFieldGet(this, _Form_instances, "m", _Form__getData).call(this).eventReset) {
                return true;
            }
        }
        else {
            if (this.handleReset) {
                return true;
            }
        }
        return false;
    }
    getSubmitEvent() {
        if (this.constructor.name == "Form") {
            return __classPrivateFieldGet(this, _Form_instances, "m", _Form__getData).call(this).eventSubmit;
        }
        else {
            return this.handleSubmit;
        }
    }
    getResetEvent() {
        if (this.constructor.name == "Form") {
            return __classPrivateFieldGet(this, _Form_instances, "m", _Form__getData).call(this).eventReset;
        }
        else {
            return this.handleReset;
        }
    }
    /**
     * submit
     *
     * actively execute the submit event.
     *
     * @returns {Form} Form Class Object (method chain)
     */
    submit() {
        var vd = (0, VDom_1.default)(this.formName);
        var getChildError = vd.child("error-*");
        for (var n = 0; n < getChildError.length; n++) {
            var gce = getChildError[n];
            gce.html("");
        }
        var getChild = vd.childDom("[name]");
        Request_1.default.refresh(getChild);
        var post = Request_1.default.get();
        if (this.existSubmitEvent()) {
            this.getSubmitEvent()(post);
        }
        return this;
    }
    /**
     * reset
     *
     * actively execute the reset event
     *
     * @returns {Form} Form Class Object (method chain)
     */
    reset() {
        var dom = (0, Dom_1.default)("#" + this.formName);
        var getChild = dom.child("[name]");
        Request_1.default.refresh(getChild);
        var post = Request_1.default.get();
        if (this.existResetEvent()) {
            this.getResetEvent()(post);
        }
        return this;
    }
    /**
     * onSubmit
     *
     * A method for setting the callback for the Submit event.
     * When submitted, the callback function specified in this argument will be executed.
     *
     * @param {Function} callback Submit runtime callback
     * @returns {Form} Form Class Object (method chain)
     */
    onSubmit(callback) {
        Data_1.default.__form[this.formName].eventSubmit = callback;
        return this;
    }
    /**
     * onReset
     *
     * A method for setting the callback for the Reset event.
     * When resetted, the callback function specified in this argument will be executed.
     *
     * @param {Function} callback Reset runtime callback
     * @returns {Form} Form Class Object (method chain)
     */
    onReset(callback) {
        Data_1.default.__form[this.formName].eventReset = callback;
        return this;
    }
    /**
     * setError
     *
     * display error results.
     *
     * @param validates
     * @returns {Form} Form Class Object (method chain)
     */
    setError(validates) {
        var v = validates.get();
        var columns = Object.keys(v);
        (0, VDom_1.default)(this.formName).child("error-*").html("");
        for (var n = 0; n < columns.length; n++) {
            var key = columns[n];
            var val = v[key].join("\n");
            (0, VDom_1.default)(this.formName).child("error-" + key).html(val);
        }
        return this;
    }
}
exports.default = Form;
_Form_instances = new WeakSet(), _Form__getData = function _Form__getData() {
    return Data_1.default.__form[this.formName];
}, _Form__tagInput = function _Form__tagInput(name, option) {
    if (option == null) {
        option = {};
    }
    if (!option.type) {
        option.type = "text";
    }
    var optionStr = __classPrivateFieldGet(this, _Form_instances, "m", _Form__setOptionString).call(this, option);
    if (option.type == "submit" ||
        option.type == "button" ||
        option.type == "image" ||
        option.type == "reset") {
        var str = "<input " + optionStr + ">";
    }
    else {
        var str = "<input name=\"" + name + "\" " + optionStr + ">";
    }
    return str;
}, _Form__setDefaultsAndValues = function _Form__setDefaultsAndValues(data, type) {
    let columns = Object.keys(data);
    for (var n = 0; n < columns.length; n++) {
        let name = columns[n];
        let value = data[name];
        var dom = (0, Dom_1.default)("#" + this.formName).child("[name=\"" + name + "\"]");
        if (dom) {
            if (type == 0) {
                dom.value(value);
            }
            else if (type == 1) {
                dom.default(value);
            }
        }
    }
    return this;
}, _Form__setOptionString = function _Form__setOptionString(option) {
    var str = "";
    if (option.default) {
        option.value = option.default;
        delete option.default;
    }
    var columns = Object.keys(option);
    for (var n = 0; n < columns.length; n++) {
        var key = columns[n];
        var val = option[key];
        str += " " + key + "=\"" + val + "\"";
    }
    return str;
};
;
