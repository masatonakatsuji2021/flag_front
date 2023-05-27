"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("Data");
const FgDateTime_1 = require("FgDateTime");
exports.default = new class Util {
    /**
     * base64Encode :
     * Encode the text to base64 format
     * @param {string} content text content
     * @returns {string} base64 encode content
     */
    base64Encode(content) {
        return btoa(unescape(encodeURIComponent(content)));
    }
    /**
     * base64Decode :
     * Decode base64 text to plaintext
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    base64Decode(b64text) {
        return decodeURIComponent(escape(atob(b64text)));
    }
    uniqId(length = null) {
        if (!length) {
            length = 32;
        }
        const lbn = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str = "";
        for (var n = 0; n < length; n++) {
            let index = parseInt((Math.random() * 10000).toString());
            let s = lbn[index % lbn.length];
            str += s;
        }
        return str;
    }
    /**
     * ucFirst :
     * Outputs text with the first letter converted to uppercase
     * @param {string} content text content
     * @returns {string} convert text content
     */
    ucFirst(content) {
        return content.substring(0, 1).toUpperCase() + content.substring(1);
    }
    /**
     * lcFirst :
     * Outputs text with the first letter converted to lowercase
     * @param {string} content text content
     * @returns {string} convert text content
     */
    lcFirst(content) {
        return content.substring(0, 1).toLowerCase() + content.substring(1);
    }
    getClassName(string, classType) {
        return string.substring(0, string.indexOf(classType));
    }
    searchForm(formName) {
        if (Data_1.default.__form[formName]) {
            return Data_1.default.__form[formName];
        }
    }
    dt(datetime) {
        return new FgDateTime_1.default(datetime);
    }
    /**
     * sleep :
     * Stop processing for a certain period of time.(Synchronous processing)
     * This method is synchronized by executing it with await inside the asynced function.
     *
     * Example)
     *
     * await sleep(1000);        <= Stop processing for 1000ms
     *
     * @param {number} time Stop time
     * @returns {promise<unknown>} Promise Object
     */
    sleep(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
    promise(callback) {
        return new Promise(callback);
    }
    addHeadTag(type, option) {
        if (!option) {
            option = {};
        }
        let el = document.createElement(type);
        let c = Object.keys(option);
        for (let n = 0; n < c.length; n++) {
            let key = c[n];
            let val = option[key];
            el.setAttribute(key, val);
        }
        document.head.appendChild(el);
        return {
            _el: el,
            remove: () => {
                el.remove();
            },
        };
    }
    addHeadScript(path, option) {
        if (!option) {
            option = {};
        }
        option.src = path;
        return this.addHeadTag("script", option);
    }
    addHeadStyle(path, option) {
        if (!option) {
            option = {};
        }
        option.rel = "stylesheet";
        option.href = path;
        return this.addHeadTag("link", option);
    }
};
