"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * #### View Class
 *
 * This class is used to implement logic that automatically executes the page when it is displayed.
 * If necessary for each page, create a derived class of this View for each controller name and action name and override the necessary methods.
 */
class View {
    /**
     * #### handle
     * An event handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle() { }
    /**
     * #### handleAlways
     * An event handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
}
exports.default = View;
