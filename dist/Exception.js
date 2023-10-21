"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("Controller");
class Exception extends Controller_1.default {
    constructor() {
        super();
        this.view = "error/index";
    }
    handle(exception = null) { }
    before_handle() { }
}
exports.default = Exception;
;
