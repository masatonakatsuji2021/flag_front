"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("Controller");
class Exception extends Controller_1.default {
    constructor() {
        super();
        this.view = "error/index";
    }
    /**
     * handle :
     * Event handler when an error occurs.
     * @param {Exception} exception Error Exception
     * @returns {void}
     *
    handle(exception : Exception) : void;
    */
    handle(exception) { }
    handleBefore() { }
}
exports.default = Exception;
;
