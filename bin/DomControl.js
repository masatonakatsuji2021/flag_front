"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DomControl_instances, _DomControl__get_value_default, _DomControl__set_value_Default;
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("Util");
const DomStatic_1 = require("DomStatic");
class DomControl {
    constructor(qs) {
        _DomControl_instances.add(this);
        this._qs = null;
        this._qs = qs;
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!qs.uid) {
                var uid = Util_1.default.uniqId();
                qs.uid = uid;
            }
        }
    }
    get get() {
        return this._qs;
    }
    get length() {
        return this._qs.length;
    }
    first() {
        return new DomControl([this._qs[0]]);
    }
    last() {
        return new DomControl([this._qs[this._qs.length - 1]]);
    }
    parent() {
        return new DomControl([this._qs[this._qs.length - 1].parentNode]);
    }
    index(index) {
        return new DomControl([this._qs[index]]);
    }
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
            if (uids.virtual[name] != value) {
                continue;
            }
            qss.push(qs);
        }
        return new DomControl(qss);
    }
    child(selector = null) {
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
    text(string = null) {
        if (string == undefined) {
            return this._qs[this._qs.length - 1].innerText;
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.innerText = string;
            }
            return this;
        }
    }
    html(string = null) {
        if (string == undefined) {
            return this._qs[this._qs.length - 1].innerHTML;
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.innerHTML = string;
            }
            return this;
        }
    }
    append(string) {
        this._qs.forEach(function (qs) {
            qs.insertAdjacentHTML("beforeend", string);
        });
        return this;
    }
    before(string) {
        this._qs.forEach(function (qs) {
            qs.insertAdjacentHTML("beforebegin", string);
        });
        return this;
    }
    after(string) {
        this._qs.forEach(function (qs) {
            qs.insertAdjacentHTML("afterend", string);
        });
        return this;
    }
    remove() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.remove();
        }
        return this;
    }
    empty() {
        return this.html("");
    }
    on(eventName, callback) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.addEventListener(eventName, callback.bind(this));
        }
        return this;
    }
    attribute(name, value = null) {
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
    removeAttribute(name) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.removeAttribute(name);
        }
        return this;
    }
    removeAttr(name) {
        return this.removeAttribute(name);
    }
    virtual(name, value = null) {
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
                }
                DomStatic_1.default.__uids[qs.uid].virtual[name] = value;
            }
            return this;
        }
    }
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
    getStyle(name = null) {
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
    removeClass(className) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.classList.remove(className);
        }
        return this;
    }
    isClass(className) {
        var qs = this._qs[this._qs.length - 1];
        return qs.classList.contains(className);
    }
    value(value = null) {
        if (value == undefined) {
            return __classPrivateFieldGet(this, _DomControl_instances, "m", _DomControl__get_value_default).call(this, 0);
        }
        else {
            return __classPrivateFieldGet(this, _DomControl_instances, "m", _DomControl__set_value_Default).call(this, 0, value);
        }
    }
    default(value = null) {
        if (value == undefined) {
            return __classPrivateFieldGet(this, _DomControl_instances, "m", _DomControl__get_value_default).call(this, 1);
        }
        else {
            return __classPrivateFieldGet(this, _DomControl_instances, "m", _DomControl__set_value_Default).call(this, 1, value);
        }
    }
    click() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.click();
        }
        return this;
    }
    dblclick() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }
    submit() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }
    focus() {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.focus();
        }
        return this;
    }
}
exports.default = DomControl;
_DomControl_instances = new WeakSet(), _DomControl__get_value_default = function _DomControl__get_value_default(mode) {
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
}, _DomControl__set_value_Default = function _DomControl__set_value_Default(mode, value) {
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
};
;
