const _Controller = use("Controller");
const v = use("VDom");

return class Controller extends _Controller{

    title = "App Title";

    handleBefore(){
        super.handleBefore();
        this.template = "default";
    }

    handleRenderBefore() {
        v("htitle").text(this.title);
    }
};