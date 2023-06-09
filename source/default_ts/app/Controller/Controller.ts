import _Controller from "Controller";
import v from "VDom";
import DomStatic from "DomStatic";

export default class Controller extends _Controller{

    title : string = "App Title";

    handleBefore(){
        super.handleBefore();
        
        this.template = "default";
    }

    handleRenderBefore(): void {
        v("htitle").text(this.title);
    }

};