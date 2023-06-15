"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Form_instances, _Form__getData, _Form__tagInput, _Form__setDefaultsAndValues, _Form__setClearValues, _Form__setOptionString;
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("Data");
const VDom_1 = require("VDom");
const Request_1 = require("Request");
class Form {
    constructor(formName) {
        _Form_instances.add(this);
        this._active = false;
        this.formName = null;
        if (formName) {
            this._active = true;
            this.formName = formName;
            if (!Data_1.default.__form[this.formName]) {
                Data_1.default.__form[this.formName] = this;
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
        if (!this.formName) {
            this.formName = this.constructor.name;
        }
        Data_1.default.__form[this.formName] = this;
    }
    /**
     * tagNone
     * @param {string} name
     * @returns
     */
    tagNone(name) {
        let vd = (0, VDom_1.default)(this.formName).child("form-" + name);
        if (vd) {
            vd.html("");
        }
        return this;
    }
    /**
     * tagNoneM
     * @param {string} name
     * @returns
     */
    tagNoneM(name, index) {
        let buffer = this._getMultiName(name, index);
        let vd = (0, VDom_1.default)(this.formName).child(buffer.targetName).last();
        if (vd) {
            vd.html("");
        }
        return this;
    }
    tagInput(name, option) {
        var str = __classPrivateFieldGet(this, _Form_instances, "m", _Form__tagInput).call(this, name, option);
        let vd = (0, VDom_1.default)(this.formName).child("form-" + name);
        if (vd) {
            vd.html(str);
        }
        return this;
    }
    _getMultiName(name, index) {
        let targetName = "form";
        let baseName = name;
        if (name.indexOf("*") > -1) {
            let buffer = name.split(".");
            for (let n = 0; n < buffer.length; n++) {
                let b_ = buffer[n];
                if (b_ == "*") {
                    continue;
                }
                targetName += "-" + b_;
            }
            baseName = baseName.split("*").join(index.toString());
        }
        else {
            targetName += name;
        }
        return {
            targetName: targetName,
            baseName: baseName,
        };
    }
    tagInputM(name, index, option) {
        let buffer = this._getMultiName(name, index);
        var str = __classPrivateFieldGet(this, _Form_instances, "m", _Form__tagInput).call(this, buffer.baseName, option);
        let vd = (0, VDom_1.default)(this.formName).child(buffer.targetName).last();
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
    tagHiddenM(name, index, value, option) {
        if (option == null) {
            option = {};
        }
        option.type = "hidden";
        option.value = value;
        return this.tagInputM(name, index, option);
    }
    tagNumber(name, option) {
        if (option == undefined) {
            option = {};
        }
        option.type = "number";
        return this.tagInput(name, option);
    }
    tagNumberM(name, index, option) {
        if (option == undefined) {
            option = {};
        }
        option.type = "number";
        return this.tagInputM(name, index, option);
    }
    tagPassword(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "password";
        return this.tagInput(name, option);
    }
    tagPasswordM(name, index, option) {
        if (option == undefined) {
            option = {};
        }
        option.type = "password";
        return this.tagInputM(name, index, option);
    }
    tagDate(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "date";
        return this.tagInput(name, option);
    }
    tagDateM(name, index, option) {
        if (option == undefined) {
            option = {};
        }
        option.type = "date";
        return this.tagInputM(name, index, option);
    }
    tagTime(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "time";
        return this.tagInput(name, option);
    }
    tagTimeM(name, index, option) {
        if (option == undefined) {
            option = {};
        }
        option.type = "time";
        return this.tagInputM(name, index, option);
    }
    tagColor(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "color";
        return this.tagInput(name, option);
    }
    tagColorM(name, index, option) {
        if (option == undefined) {
            option = {};
        }
        option.type = "color";
        return this.tagInputM(name, index, option);
    }
    tagFile(name, option = null) {
        if (option == undefined) {
            option = {};
        }
        option.type = "file";
        return this.tagInput(name, option);
    }
    tagFileM(name, index, option) {
        if (option == undefined) {
            option = {};
        }
        option.type = "file";
        return this.tagInputM(name, index, option);
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
    tagSelectM(name, index, selects, option) {
        let buffer = this._getMultiName(name, index);
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
        var str = "<select name=\"" + buffer.baseName + "\" " + optionStr + ">" + selectStr + "</select>";
        let vd = (0, VDom_1.default)(this.formName).child(buffer.targetName).last();
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
    tagTextareaM(name, index, option) {
        let buffer = this._getMultiName(name, index);
        if (option == undefined) {
            option = {};
        }
        var optionStr = __classPrivateFieldGet(this, _Form_instances, "m", _Form__setOptionString).call(this, option);
        var str = "<textarea name=\"" + buffer.baseName + "\" " + optionStr + "></textarea>";
        let vd = (0, VDom_1.default)(this.formName).child(buffer.targetName).last();
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
    tagRadioM(name, index, selects, option) {
        let buffer = this._getMultiName(name, index);
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
            str += "<label>" + __classPrivateFieldGet(this, _Form_instances, "m", _Form__tagInput).call(this, buffer.baseName, option) + val + "</label>";
        }
        let vd = (0, VDom_1.default)(this.formName).child(buffer.targetName).last();
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
    tagCheckboxM(name, index, selects, option) {
        let buffer = this._getMultiName(name, index);
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
            str += "<label>" + __classPrivateFieldGet(this, _Form_instances, "m", _Form__tagInput).call(this, buffer.baseName, option) + val + "</label>";
        }
        let vd = (0, VDom_1.default)(this.formName).child(buffer.targetName).last();
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
    tagButtonM(name, index, value, option = null) {
        if (option == null) {
            option = {};
        }
        option.type = "button";
        option.default = value;
        return this.tagInputM(name, index, option);
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
        if (data) {
            return __classPrivateFieldGet(this, _Form_instances, "m", _Form__setDefaultsAndValues).call(this, data, 0);
        }
        else {
            return __classPrivateFieldGet(this, _Form_instances, "m", _Form__setClearValues).call(this);
        }
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
        if (data) {
            return __classPrivateFieldGet(this, _Form_instances, "m", _Form__setDefaultsAndValues).call(this, data, 1);
        }
        else {
            return __classPrivateFieldGet(this, _Form_instances, "m", _Form__setClearValues).call(this);
        }
    }
    existSubmitEvent() {
        if (this._active) {
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
        if (this._active) {
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
        if (this._active) {
            return __classPrivateFieldGet(this, _Form_instances, "m", _Form__getData).call(this).eventSubmit;
        }
        else {
            return this.handleSubmit;
        }
    }
    getResetEvent() {
        if (this._active) {
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
            var gce = getChildError.index(n);
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
        var getChild = (0, VDom_1.default)(this.formName).childDom("[name]");
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
        if (validates.constructor.name == "ValidateResult") {
            var v = validates.get();
        }
        else {
            var v = validates;
        }
        var columns = Object.keys(v);
        (0, VDom_1.default)(this.formName).child("error-*").html("");
        for (var n = 0; n < columns.length; n++) {
            var key = columns[n];
            var val = v[key];
            if (typeof val == "string") {
                val = [val];
            }
            val = val.join("\n");
            (0, VDom_1.default)(this.formName).child("error-" + key).html(val);
        }
        return this;
    }
    getDom(name) {
        let res = (0, VDom_1.default)(this.formName).childDom("[name=" + name + "]");
        if (res.length) {
            return res;
        }
        res = (0, VDom_1.default)(this.formName).child("form-" + name).childDom("input");
        return res;
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
}, _Form__setDefaultsAndValues = function _Form__setDefaultsAndValues(data, type, baforeName) {
    if (!baforeName) {
        baforeName = "";
    }
    let columns = Object.keys(data);
    for (var n = 0; n < columns.length; n++) {
        let name = columns[n];
        let value = data[name];
        if (typeof value == "object") {
            if (!Array.isArray(value)) {
                let beforeName_ = baforeName + name + ".";
                __classPrivateFieldGet(this, _Form_instances, "m", _Form__setDefaultsAndValues).call(this, value, type, beforeName_);
                continue;
            }
        }
        let targetName = "";
        if (baforeName) {
            targetName = baforeName + name;
        }
        else {
            targetName = name;
        }
        var vd = (0, VDom_1.default)(this.formName).childDom("[name=\"" + targetName + "\"]");
        if (vd) {
            if (type == 0) {
                vd.value(value);
            }
            else if (type == 1) {
                vd.default(value);
            }
        }
    }
    return this;
}, _Form__setClearValues = function _Form__setClearValues() {
    var vd = (0, VDom_1.default)(this.formName).childDom("[name]");
    if (vd) {
        vd.value("");
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
