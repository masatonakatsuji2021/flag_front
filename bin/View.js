"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = require("Routes");
const Response_1 = require("Response");
/**
 * #### View Class
 *
 * This class is used to implement logic that automatically executes the page when it is displayed.
 * If necessary for each page, create a derived class of this View for each controller name and action name and override the necessary methods.
 */
class View {
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
     * ***handle*** :
     * An event handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle(aregment) { }
    /**
     * ***handleAlways*** :
     * An event handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
    handleBegin() { }
    handleBefore(beginStatus) { }
    handleAfter(beginStatus) { }
    handleRenderBefore(beginStatus) { }
    handleRenderAfter(beginStatus) { }
    handleLeave() { }
}
exports.default = View;
