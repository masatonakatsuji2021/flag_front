"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FgDateTime_1 = require("FgDateTime");
/**
 * #### Util
 * This class provides various functions required for static.
 */
class Util {
    /**
     * #### framework
     */
    static get framework() {
        // @ts-ignore
        return FRAMEWORK;
    }
    /**
     * #### base64Encode
     * Encode the text to base64 format.
     * @param {string} content text content
     * @returns {string} base64 encode content
     */
    static base64Encode(content) {
        return btoa(unescape(encodeURIComponent(content)));
    }
    /**
     * #### base64Decode
     * Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    static base64Decode(b64text) {
        return decodeURIComponent(escape(atob(b64text)));
    }
    static loadHtml(path, binds) {
        let content = use(path);
        content = Util.base64Decode(content);
        if (binds) {
            const c = Object.keys(binds);
            for (let n = 0; n < c.length; n++) {
                const key = c[n];
                const val = binds[key];
                content = content.replace("{" + key + "}", val);
            }
        }
        return content;
    }
    static uniqId(length) {
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
     * #### ucFirst
     * Outputs text with the first letter converted to uppercase.
     * @param {string} content text content
     * @returns {string} convert text content
     */
    static ucFirst(content) {
        return content.substring(0, 1).toUpperCase() + content.substring(1);
    }
    /**
     * #### lcFirst
     * Outputs text with the first letter converted to lowercase.
     * @param {string} content text content
     * @returns {string} convert text content
     */
    static lcFirst(content) {
        return content.substring(0, 1).toLowerCase() + content.substring(1);
    }
    static getClassName(string, classType) {
        return string.substring(0, string.indexOf(classType));
    }
    static datetime(datetime) {
        return new FgDateTime_1.default(datetime);
    }
    /**
     * #### sleep
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
    static sleep(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
    /**
     * ##### promise
     * Simple version of promise class method.
     * @param callback
     * @returns
     */
    static promise(callback) {
        return new Promise(callback);
    }
    static addHeadTag(type, body, option) {
        if (!option) {
            option = {};
        }
        let el = document.createElement(type);
        let c = Object.keys(option);
        for (let n = 0; n < c.length; n++) {
            let key = c[n];
            let val = option[key];
            if (val) {
                el.setAttribute(key, val);
            }
        }
        if (body) {
            el.innerHTML = body;
        }
        document.head.appendChild(el);
        return {
            _el: el,
            remove: () => {
                el.remove();
            },
        };
    }
    static addHeadScript(path, body, option) {
        if (!option) {
            option = {};
        }
        option.src = path;
        return Util.addHeadTag("script", body, option);
    }
    static addHeadStyle(path, body, option) {
        if (!option) {
            option = {};
        }
        option.href = path;
        let type = "link";
        if (body) {
            type = "style";
        }
        else {
            option.rel = "stylesheet";
        }
        return Util.addHeadTag(type, body, option);
    }
}
exports.default = Util;
;
