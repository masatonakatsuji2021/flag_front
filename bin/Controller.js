/**
 * FLAG - Single Page Action(SPA) FW
 * 
 * Controller
 * 
 * Date   : 2023/04/21
 * Author : nakatsuji masato
 */
const Data = use("Data");
const Routes = use("Routes");
const Response = use("Response");

return class Controller{

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
     * leave
     */
    leave(){}

    __rendering(){


        if(!this.view){
            var routes = Routes.getRoute();

            this.view = routes.controller + "/" + routes.action;
        }

        if(this.template){
            
            if(Data.before_template != this.template){

                Data.before_template = this.template;

                Response.bindTemplate(null, this.template);
                Response.bindView("[spa-contents]", this.view);
            }
            else{
                Response.bindView("[spa-contents]", this.view);
            }

        }
        else{
            Data.before_template = null;
            Response.bindView(null, this.view);
        }

    }
}