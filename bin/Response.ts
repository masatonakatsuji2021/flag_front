import Util from "Util";
import Dom from "Dom";
import VDom from "VDom";
import Data from "Data";
import Controller from "Controller";
import View from "View";

export default class Response{

    /**
     * ***pageEnable*** : 
     * Temporarily suspend the page move operation.
     */
    public static set pageEnable(status : boolean){
        Data.__page_status = status;
    }
    public static get pageEnable() : boolean{
        return Data.__page_status;
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

                const templateHtml = Response.template(context.template);
                Dom("body").html = templateHtml;
            }

            const viewHtml = Response.view(context.view);
            Dom("[spa-contents]").html = viewHtml;
        }
        else{
            Data.before_template = null;
            const viewHtml = Response.view(context.view);
            Dom("body").html = viewHtml;
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

        if(Data.__before_controller_path != contPath){
            Data.__before_controller_path = contPath;
            if(cont.handleBegin){
                await cont.handleBegin();
            }
        }

        Data.__before_controller = cont;
        Data.__before_action = routes.action;
        Data.__before_view = null;
        Data.__child_classs = {};
        
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

    }
    
    private static async renderingOnView(routes){
        const viewName : string = Util.ucFirst(routes.view) + "View";
        const viewPath : string = "app/View/" + viewName;

        if(!useExists(viewPath)){
            throw("\"" + viewName + "\" Class is not found.");
        }

        const View_ = use(viewPath);
        const vm : View = new View_();

        if(Data.__before_view_path != viewPath){
            Data.__before_view_path = viewPath;
            if(vm.handleBegin){
                await vm.handleBegin();
            }
        }

        Data.__before_view = vm;
        Data.__before_controller = null;
        Data.__before_action = null;
        Data.__child_classs = {};

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
    }

    public static async rendering(routes){

        try{

            if(Data.__before_controller){
                var befCont = Data.__before_controller;
                await befCont.handleLeave(Data.__before_action);
            }

            if(Data.__before_view){
                var befView = Data.__before_view;
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

    private static setRenderingClass(type : string, className : string){
        const classPath : string = "app/" + type + "/" + className;

        if(!useExists(classPath)){
            return;
        }

        const _class = use(classPath);
        const classObj = new _class();

        if(!classObj){
            return;
        }

        Data.__child_classs[classPath] = classObj;

        return classObj;
    }

    private static loadRenderingClass(type : string, className : string) : void{
        const classObj = Response.setRenderingClass(type, className);

        if(!classObj){
            return;
        }
        
        if(classObj.handle){
            classObj.handle();
        }

        if(classObj.handleAlways){
            classObj.handleAlways();
        }
    }

    private static defautShowException(){
        var content = use("ExceptionHtml");
        content = Util.base64Decode(content);
        Dom("body").removeVirtual("__before_render__").html = content;
        Data.__before_controller = null;
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
            Response.loadRenderingClass("ViewPart", vwname);
        }
    }
};