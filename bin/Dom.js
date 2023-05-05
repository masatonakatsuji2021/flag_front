"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomControl_1 = require("DomControl");
/**
 * Dom
 *
 * Get element information for DOM manipulation.
 *
 * @param {string} selectName query selector
 * @returns {DomControl} DomControl Class Object
 */
const Dom = function (selectName = null) {
    if (selectName) {
        var selector = "html " + selectName;
    }
    else {
        var selector = "html *";
    }
    var qs = document.querySelectorAll(selector);
    return new DomControl_1.default(qs);
};
exports.default = Dom;
