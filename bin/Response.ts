import Util from "Util";
import Dom from "Dom";
import VDom from "VDom";
import Data from "Data";
import Controller from "Controller";
import View from "View";

export default class Response{

    public static __before_controller : Controller = null;
    public static __before_controller_path : string = null;
    public static __before_view : View = null;
    public static __before_view_path : string = null;
    public static __before_action : string = null;
    public static __page_status : boolean = true;

    /**
     * ***pageEnable*** : 
     * Temporarily suspend the page move operation.
     */
    public static set pageEnable(status : boolean){
        Response.__page_status = status;
    }
    public static get pageEnable() : boolean{
        return Response.__page_status;
    }

    /**
     * ***redirect*** : 
     * redirect to another page.  
     * @param {string} url Destination page URL
     * @returns {void}
     */
    public static redirect(url : string) : void;

    /**
     * ***redirect*** :
     * redirect to another page.  
     * @param {string} url Destination page URL
     * @param {boolean} sliented When set to true, page transition processing is not performed only by changing the page URL
     * @returns {void}
     */
    public static redirect(url : string, sliented : boolean) : void;

    public static redirect(url : string, sliented? : boolean) : void{

        if(!url){
            url = "/";
        }
        
        if(sliented){
            location.href = "#" + url;
        }
        else{
            location.replace("#" + url);
        }
    }

    public static async __rendering(routes, context){

        if(!context.view){
            if(routes.controller){
                context.view = routes.controller + "/" + routes.action;
            }
            else if(routes.view){
                context.view = routes.view;
            }
        }

        if(context.template){

            if(Data.before_template != context.template){

                Data.before_template = context.template;

                Response.bindTemplate("body", context.template);
                Response.bindView("[spa-contents]", context.view);
            }
            else{
                Response.bindView("[spa-contents]", context.view);
            }

        }
        else{
            Data.before_template = null;
            Response.bindView("body", context.view);
        }

        Response.setBindViewPart();

        VDom().refresh();
    }

    private static async renderingOnController(routes){

        const controllerName : string = Util.ucFirst(routes.controller) + "Controller";
        const contPath : string = "app/Controller/" + controllerName;

        if(!useExists(contPath)){
            throw("\"" + controllerName + "\" Class is not found.");
        }

        const Controller_ = use(contPath);
        const cont : Controller = new Controller_();

        if(Response.__before_controller_path != contPath){
            Response.__before_controller_path = contPath;
            if(cont.handleBegin){
                await cont.handleBegin();
            }
        }

        if(!(
            cont[routes.action] ||
            cont["before_" + routes.action]
        )){
            throw("\"" + routes.action + "\" method on \"" + controllerName + "\" class is not found.");
        }

        await cont.handleBefore();
        
        if(cont["before_" + routes.action]){
            const method : string = "before_" + routes.action;

            if(routes.aregment){
                await cont[method](...routes.aregment);
            }
            else{
                await cont[method]();
            }    
        }

        await cont.handleAfter();

        await Response.__rendering(routes, cont);

        await cont.handleRenderBefore();

        if(cont[routes.action]){
            const method : string = routes.action;

            if(routes.aregment){
                await cont[method](...routes.aregment);
            }
            else{
                await cont[method]();
            }
        }

        await cont.handleRenderAfter(); 

        Response.__before_controller = cont;
        Response.__before_action = routes.action;
        Response.__before_view = null;
    }
    
    private static async renderingOnView(routes){
        const viewName : string = Util.ucFirst(routes.view) + "View";
        const viewPath : string = "app/View/" + viewName;

        if(!useExists(viewPath)){
            throw("\"" + viewName + "\" Class is not found.");
        }

        const View_ = use(viewPath);
        const vm : View = new View_();

        if(Response.__before_view_path != viewPath){
            Response.__before_view_path = viewPath;
            if(vm.handleBegin){
                await vm.handleBegin();
            }
        }

        await vm.handleBefore();

        await vm.handleAfter();

        await Response.__rendering(routes, vm);

        await vm.handleRenderBefore();

        if(routes.aregment){
            await vm.handle(...routes.aregment);
        }
        else{
            await vm.handle();
        }        

        await vm.handleRenderAfter(); 

        Response.__before_view = vm;
        Response.__before_controller = null;
        Response.__before_action = null;
    }

    public static async rendering(routes){

        try{

            if(Response.__before_controller){
                var befCont = Response.__before_controller;
                await befCont.handleLeave(Response.__before_action);
            }

            if(Response.__before_view){
                var befView = Response.__before_view;
                await befView.handleLeave();
            }

            if(routes.mode == "notfound"){
                throw("404 not found");
            }
            
            if(routes.controller){
                await Response.renderingOnController(routes);
            }
            else if(routes.view){
                await Response.renderingOnView(routes);
            }
                
        }catch(error){

            console.error(error);

            try{
                    
                const expPath : string = "app/Exception/Exception";

                if(!useExists(expPath)){
                    console.error("\Exception\" Class is not found.");
                    Response.defautShowException();
                    return;
                }

                const Exception_ = use(expPath);
                const exps = new Exception_;

                if(!(exps.handle)){
                    console.error("\handle\" method on \"Exception\" class is not found.");
                    return;
                }

                await exps.handleBefore(error);

                if(exps.before_handle){
                    await exps.before_handle(error);
                }

                await exps.handleAfter(error);

                await Response.__rendering(routes, exps);

                await exps.handleRenderBefore();
            
                if(exps.handle){
                    await exps.handle(error);
                }
            
                await exps.handleRenderAfter(); 

            }catch(error2){
                console.error(error2);
            }
        }   
    }

    /**
     * *** view *** : 
     * Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    public static view(viewName : string) : string{

        const viewPath : string = "View/" + viewName + ".html";
        if(!useExists(viewPath)){
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.</div>"; 
        }
        
        let content : string = use(viewPath);
        content = Util.base64Decode(content);
        
        return content;
    }

    /**
     * ***template*** : 
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    public static template(templateName : string) : string{

        const templatePath : string = "Template/" + templateName + ".html";

        if(!useExists(templatePath)){
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.</div>"; 
        }

        var content : string = use(templatePath);
        content = Util.base64Decode(content);
        
        return content;
    }

    /**
     * ***viewPart*** : 
     * Get viewPart content information.
     * @param {string} viewPartName ViewPart Name
     * @returns {string} viewPart contents
     */
    public static viewPart(viewPartName : string) : string{

        const viewPartPath : string = "ViewPart/" + viewPartName + ".html";
        if(!useExists(viewPartPath)){
            return "<div style=\"font-weight:bold;\">ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.</div>";
        }
        
        var content = use(viewPartPath);
        content = Util.base64Decode(content);

        const vw = document.createElement("div");
        vw.innerHTML = content;
        Response.setBindViewPart(vw);
    
        return vw.innerHTML;
    }

    private static __bind(type : string, arg1: string, arg2? : string, vdomFlg? : boolean) : object{
        let target = null;
        let name : string = "";
        if(arg2){
            name = arg2;
            if(vdomFlg){
                target = VDom(arg1);
            }
            else{
                target = Dom(arg1);
            }
        }
        else{
            name = arg1;
            target = VDom(arg1);
        }
        
        if(target.virtual("__before_render__") == type + "-" + name){
            return {
                already: true,
                name : name,
            };
        }

        target.virtual("__before_render__", type + "-" + name);

        let methodName : string = type;        
        if(type == "viewpart"){
            methodName = "viewPart";
        }

        var content = this[methodName](name);
        target.html = content;

        return {
            already: false,
            name : name,
        };
    }

    private static loadRenderingClass(type : string, option : any) : void{
        const classPath : string = "app/" + type + "/" + option.name;

        if(!useExists(classPath)){
            return;
        }

        const _class = use(classPath);
        const classObj = new _class();

        if(!classObj){
            return;
        }

        if(!option.already){
            if(classObj.handle){
                classObj.handle();
            }
        }

        if(classObj.handleAlways){
            classObj.handleAlways();
        }
    }

    /**
     * ***bindView*** : 
     * Binds the View content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the View class is set.  
     * (Requires handle method.)
     * @param {string} viewName View content name and binding destination element tag VDom selector name (ref attribute).
     * @returns {void}
     */
    public static bindView(viewName : string) : void;

    /**
     * 
     * ***bindView*** : 
     * Binds the View content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the View class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewName View content name
     * @returns {void}
     */
    public static  bindView(selector : string, viewName : string) : void;

    /**
     * ***bindView*** : 
     * Binds the View content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the View class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewName View content name
     * @param {boolean} vdomFlg If specified as true, it will be bound by virtual Dom control.
     * @returns {void}
     */
    public static bindView(selector : string, viewName : string, vdomFlg : boolean) : void;

    public static bindView(arg1 : string, arg2? : string, vdomFlg? : boolean) : void{
        const res = Response.__bind("view", arg1, arg2, vdomFlg);
        Response.loadRenderingClass("View", res);
    }

    public static bindTemplate(templateName : string) : void;

    public static bindTemplate(selector : string, templateName : string) : void;

    public static bindTemplate(selector : string, templateName : string, vdomFlg : boolean) : void;

    public static bindTemplate(arg1 : string, arg2? : string, vdomFlg? : boolean) : void{
        const res = Response.__bind("template", arg1, arg2, vdomFlg);
        Response.loadRenderingClass("Template", res);
    }

    /**
     * ***bindViewPart*** : 
     * Binds the ViewPart content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the ViewPart class is set.  
     * (Requires handle method.)
     * @param {string} viewPartName ViewPart content name and binding destination element tag VDom selector name (ref attribute).
     * @returns {void}
     */
    public static bindViewPart(viewPartName : string) : void;

    /**
     * ***bindViewPart*** : 
     * Binds the ViewPart content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the ViewPart class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewPartName ViewPart content name
     * @returns {void}
     */
    public static bindViewPart(selector : string, viewPartName : string) : void;

    /**
     * ***bindViewPart*** : 
     * Binds the ViewPart content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the ViewPart class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewPartName ViewPart content name
     * @param {boolean} vdomFlg If specified as true, it will be bound by virtual Dom control.
     * @returns {void}
     */
    public static bindViewPart(selector : string, viewPartName : string, vdomFlg : boolean) : void;

    public static bindViewPart(arg1 : string, arg2? : string, vdomFlg? : boolean) : void{
        const res = Response.__bind("viewpart", arg1, arg2, vdomFlg);
        Response.loadRenderingClass("ViewPart", res);
    }

    private static defautShowException(){
        var content = use("ExceptionHtml");
        content = Util.base64Decode(content);
        Dom("body").removeVirtual("__before_render__").html = content;
        this.__before_controller = null;
        Data.before_template = null;
    }

    public static setBindViewPart(parentElement? : Element){
        const name = "v-show-viewpart";
        let viewparts;
        if(parentElement){
            viewparts = parentElement.querySelectorAll("[" + name + "]");
        }
        else{
            viewparts = document.querySelectorAll("[" + name + "]");
        }
        for(let n = 0 ; n < viewparts.length ; n++){
            const viewpart = viewparts[n];
            const vwname = viewpart.getAttribute(name);
            viewpart.removeAttribute(name);
            const content = Response.viewPart(vwname);
            viewpart.outerHTML = content;
            Response.loadRenderingClass("ViewPart", {
                name: vwname,
                already: false,
            });
        }
    }
};