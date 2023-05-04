import _Controller from "Controller";

export default class Controller extends _Controller{

    handleBefore(){
        super.handleBefore();
        
        this.template = "default";
    }

};