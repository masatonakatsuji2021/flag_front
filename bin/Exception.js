"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("Data");
const Controller_1 = require("Controller");
class Exception extends Controller_1.default {
    constructor() {
        super();
        Data_1.default.before_template = null;
        this.view = "error/index";
    }
    handle(exception = null) { }
    before_handle() { }
}
exports.default = Exception;
;
