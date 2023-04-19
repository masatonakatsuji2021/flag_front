const Data = use("Data");
const Routes = use("Routes");
const Response = use("Response");

return class Controller{

    handleBefore(){}
    handleAfter(){}
    handleRenderBefore(){}
    handleRenderAfter(){}

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