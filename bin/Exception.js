const Data = use("Data");
const Controller = use("Controller");

return class Exception extends Controller{

    constructor(){
        super();

        Data.before_template = null;
        this.view = "error/index";
    }

    before_handle(){}

}