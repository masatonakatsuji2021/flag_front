"use strict";
/**
 * -----------------------------------------------------
 *
 * FLAG - Single Page Action(SPA) FW
 *
 * Controller
 *
 * Date   : 2023/04/21
 * Author : nakatsuji masato
 *
 * -----------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("Data");
const Routes_1 = require("Routes");
const Response_1 = require("Response");
const VDom_1 = require("VDom");
const DomStatic_1 = require("DomStatic");
/**
 * Controller :
 * Core class for page display.
 */
class Controller {
    constructor() {
        /**
         * view :
         * Set the page view path to display
         * If not specified, automatically determined by "{Controller Name}/{action name}"
         * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
         */
        this.view = null;
        /**
         * template :
         * Specifies the template name to use on the displayed page.
         * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
         */
        this.template = null;
    }
    /**
     * handleBefore :
     * Event handler executed just before transitioning to the page.
     */
    handleBefore() { }
    /**
     * handleAfter :
     * Event handler executed immediately after transitioning to the page
     */
    handleAfter() { }
    /**
     * handleRenderBefore :
     * Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore() { }
    /**
     * handleRenderAfter :
     * Event handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter() { }
    /**
     * handleLeave :
     * Event handler executed when leaving the page
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
        (0, VDom_1.default)().refresh();
        console.log(DomStatic_1.default);
    }
}
exports.default = Controller;
;
