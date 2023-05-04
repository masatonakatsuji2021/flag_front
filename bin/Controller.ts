/**
 * FLAG - Single Page Action(SPA) FW
 * 
 * Controller
 * 
 * Date   : 2023/04/21
 * Author : nakatsuji masato
 */

import Data from "Data";
import Routes from "Routes";
import Response from "Response";

export default class Controller{

    view: string = null;
    
    template: string = null;

    /**
     * handleBefore
     */
    handleBefore(){}

    /**
     * handleAfter
     */
    handleAfter(){}

    /**
     * handleRenderBefore
     */
    handleRenderBefore(){}

    /**
     * handleRenderAfter
     */
    handleRenderAfter(){}

    /**
     * handleLeave
     */
    handleLeave(){}

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
    }
};