"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("Controller");
class Controller extends Controller_1.default {
    handleBefore() {
        super.handleBefore();
        this.template = "default";
    }
}
exports.default = Controller;
;
