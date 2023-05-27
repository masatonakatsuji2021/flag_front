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

import Data from "Data";
import Routes from "Routes";
import Response from "Response";
import VDom from "VDom";

/**
 * Controller : 
 * Core class for page display.
 */
export default class Controller{

    /**
     * view : 
     * Set the page view path to display
     * If not specified, automatically determined by "{Controller Name}/{action name}"
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     */
    view: string = null;
    
    /**
     * template : 
     * Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     */
    template: string = null;

    /**
     * handleBefore : 
     * Event handler executed just before transitioning to the page.
     */
    handleBefore() : void{}

    /**
     * handleAfter : 
     * Event handler executed immediately after transitioning to the page
     */
    handleAfter() : void{}

    /**
     * handleRenderBefore : 
     * Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore() : void{}

    /**
     * handleRenderAfter : 
     * Event handler that is executed after page transition, after rendering process to the screen is completed, 
     * and after the event for each action is completed.
     */
    handleRenderAfter() : void{}

    /**
     * handleLeave : 
     * Event handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    handleLeave(action? : string){}

    __rendering(){

        if(!this.view){
            var routes = Routes.getRoute();

            this.view = routes.controller + "/" + routes.action;
        }

        if(this.template){
            
            if(Data.before_template != this.template){

                Data.before_template = this.template;

                Response.bindTemplate("body", this.template);
                Response.bindView("[spa-contents]", this.view);
            }
            else{
                Response.bindView("[spa-contents]", this.view);
            }

        }
        else{
            Data.before_template = null;
            Response.bindView("body", this.view);
        }

        VDom().refresh();
    }
};