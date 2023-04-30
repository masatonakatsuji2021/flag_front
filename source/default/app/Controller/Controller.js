const BaseController = use("Controller");

return class Controller extends BaseController{

    handleBefore(){
        super.handleBefore();
        this.template = "default";
    }
}