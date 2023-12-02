import BaseController from "Controller";
import VDom from "VDom";

export default class Controller extends BaseController{

    public template : string = "default";
    public title : string = "App Title";

    handleRenderBefore(): void {
        v("htitle").text = this.title;
    }

};