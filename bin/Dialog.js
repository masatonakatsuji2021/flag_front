"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("Util");
const Dom_1 = require("Dom");
/**
 * Dialog :
 * A class object for displaying the dialog by default.
 */
class Dialog {
    open(contents, option = null) {
        if (option == null) {
            option = {};
        }
        var uid = Util_1.default.uniqId();
        var baseHtml = use("DialogHtml");
        baseHtml = Util_1.default.base64Decode(baseHtml);
        baseHtml = baseHtml.split("{{uid}}").join(uid);
        baseHtml = baseHtml.split("{{contents}}").join(contents);
        (0, Dom_1.default)("body").append(baseHtml);
        var v = (0, Dom_1.default)("[data-uid=\"" + uid + "\"]");
        if (option.class) {
            v.child(".window").addClass(option.class);
        }
        return v;
    }
    loading(message = null, option = null) {
        if (!option) {
            option = {};
        }
        if (!option.class) {
            option.class = [];
        }
        option.class.push("loading_circle");
        var str = "<div class=\"icon\"></div>";
        if (message) {
            str += "<div class=\"message\">" + message + "</div>";
        }
        var v = this.open(str, option);
        return v;
    }
    alert(message, title = null, option = null) {
        if (option == null) {
            option = {};
        }
        if (!option.close) {
            option.close = {};
        }
        if (!option.close.text) {
            option.close.text = "Close";
        }
        var str = "<div class=\"message\">" + message + "</div><div style=\"text-align:right\"><a class=\"close_btn\">" + option.close.text + "</a></div>";
        if (title) {
            str = "<div class=\"title\">" + title + "</div>" + str;
        }
        var v = this.open(str, option);
        v.child(".close_btn").on("click", () => {
            if (option.close.callback) {
                option.close.callback.bind(v)();
            }
            v.remove();
        });
        return v;
    }
}
exports.default = Dialog;
;
