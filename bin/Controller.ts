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
import Dom from "Dom";

/**
 * Controller : 
 * Core class for page display.
 */
export default class Controller{

    public view : string = null;

    /**
     * ***setView*** : 
     * Set the page view path to display.  
     * If not specified, automatically determined by "{Controller Name}/{action name}"  
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     */
    public setView(value : string)  : void{
        this.view = value;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }
    
    public template : string = null;

    /**
     * ***setTemplate*** : 
     * Specifies the template name to use on the displayed page.  
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.  
     */
    public setTemplate(value : string){
        this.template = value;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * handleBefore : 
     * Event handler executed just before transitioning to the page.
     */
    handleBefore(beginStatus? : boolean) : void{}

    /**
     * handleAfter : 
     * Event handler executed immediately after transitioning to the page
     */
    handleAfter(beginStatus? : boolean) : void{}

    /**
     * handleRenderBefore : 
     * Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore(beginStatus? : boolean) : void{}

    /**
     * handleRenderAfter : 
     * Event handler that is executed after page transition, after rendering process to the screen is completed, 
     * and after the event for each action is completed.
     */
    handleRenderAfter(beginStatus? : boolean) : void{}

    /**
     * handleLeave : 
     * Event handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    handleLeave(action? : string){}
}