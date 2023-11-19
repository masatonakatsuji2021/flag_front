"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * #### ViewPart Class
 *
 * This class is used to implement logic that automatically runs when the ViewPart is used, etc.
 * If necessary, create a "{ViewPart name to use}ViewPart" class as a derived class of this ViewPart and override the required methods.
 */
class ViewPart {
    /**
     * handle :
     * An event handler that runs automatically when the ViewPart is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle() { }
    /**
     * handleAlways :
     * An event handler that runs automatically when the ViewPart is displayed on screen.
     * This event is always executed even if the same ViewPart has already been rendered..
     */
    handleAlways() { }
}
exports.default = ViewPart;
