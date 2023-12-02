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
const Routes_1 = require("Routes");
const Response_1 = require("Response");
/**
 * Controller :
 * Core class for page display.
 */
class Controller {
    constructor() {
        this.view = null;
        this.template = null;
    }
    /**
     * ***setView*** :
     * Set the page view path to display.
     * If not specified, automatically determined by "{Controller Name}/{action name}"
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     */
    setView(value) {
        this.view = value;
        const routes = Routes_1.default.getRoute();
        Response_1.default.__rendering(routes, this);
    }
    /**
     * ***setTemplate*** :
     * Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     */
    setTemplate(value) {
        this.template = value;
        const routes = Routes_1.default.getRoute();
        Response_1.default.__rendering(routes, this);
    }
    /**
     * handleBegin :
     * Event handler that is executed when the controller is called for the first time during page transition.
     * This event hand is not executed when the page transitions between the same Controllers..
     */
    handleBegin() { }
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
     * @param {string} action before access controller action name
     */
    handleLeave(action) { }
}
exports.default = Controller;
