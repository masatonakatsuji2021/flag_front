"use strict";
/**
 * FLAG - Single Page Action(SPA) FW
 *
 * Controller
 *
 * Date   : 2023/04/21
 * Author : nakatsuji masato
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("Data");
const Routes_1 = require("Routes");
const Response_1 = require("Response");
class Controller {
    constructor() {
        this.view = null;
        this.template = null;
    }
    /**
     * handleBefore
     */
    handleBefore() { }
    /**
     * handleAfter
     */
    handleAfter() { }
    /**
     * handleRenderBefore
     */
    handleRenderBefore() { }
    /**
     * handleRenderAfter
     */
    handleRenderAfter() { }
    /**
     * handleLeave
     */
    handleLeave() { }
    __rendering() {
        if (!this.view) {
            var routes = Routes_1.default.getRoute();
            this.view = routes.controller + "/" + routes.action;
        }
        if (this.template) {
            if (Data_1.default.before_template != this.template) {
                Data_1.default.before_template = this.template;
                Response_1.default.bindTemplate("body", this.template);
                Response_1.default.bindView("[spa-contents]", this.view);
            }
            else {
                Response_1.default.bindView("[spa-contents]", this.view);
            }
        }
        else {
            Data_1.default.before_template = null;
            Response_1.default.bindView("body", this.view);
        }
    }
}
exports.default = Controller;
;
