import Data from "Data";
import Controller from "Controller";

export default class Exception extends Controller{

    constructor(){
        super();

        Data.before_template = null;
        this.view = "error/index";
    }

    handle(exception : Exception = null){}

    before_handle(){}
};