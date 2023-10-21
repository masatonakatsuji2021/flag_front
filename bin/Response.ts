import Util from "Util";
import Dom from "Dom";
import VDom from "VDom";
import Data from "Data";
import Controller from "Controller";

export default new class Response{

    __before_controller : Controller = null;
    __before_controller_path : string = null;
    __before_action : string = null;
    __page_status : boolean = true;

    /**
     * pageDisable
     * 
     * Temporarily suspend the page move operation.
     * 
     * @returns {Response} Response Class Object (method chain)
     */
    pageDisable() : Response{
        this.__page_status = false;
        return this;
    }

    /**
     * pageEnable
     * 
     * unpause the page move operation
     * 
     * @returns {Response} Response Class Object (method chain)
     */
    pageEnable() : Response{
        this.__page_status = true;
        return this;
    }

    /**
     * setPageStatus
     * 
     * Get the page navigation state.
     * 
     * @returns {boolean} page status
     */
    setPageStatus() : boolean{
        return this.__page_status;
    }

    /**
     * redirect
     * 
     * redirect to another page.  
     * @param {string} url Destination page URL
     * @returns {void}
     */
    redirect(url : string) : void;

    /**
     * redirect
     * 
     * redirect to another page.  
     * @param {string} url Destination page URL
     * @param {boolean} sliented When set to true, page transition processing is not performed only by changing the page URL
     * @returns {void}
     */
    redirect(url : string, sliented : boolean) : void;

    redirect(url : string, sliented? : boolean) : void{

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

    rendering(routes) : void{

        (async function(){

            try{

                if(this.__before_controller){
                    var befCont = this.__before_controller;
                    await befCont.handleLeave(this.__before_action);
                }

                if(routes.mode == "notfound"){
                    throw("404 not found");
                }
               
                var controllerName = routes.controller.substring(0,1).toUpperCase() + routes.controller.substring(1) + "Controller";
        
                var contPath = "app/Controller/" + controllerName;
        
                if(!useExists(contPath)){
                    throw("\"" + controllerName + "\" Class is not found.");
                }

                const Controller = use(contPath);
                var cont = new Controller();

                if(this.__before_controller_path != contPath){
                    this.__before_controller_path = contPath;
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
                    var method = "before_" + routes.action;

                    if(routes.aregment){
                        await cont[method](...routes.aregment);
                    }
                    else{
                        await cont[method]();
                    }    
                }

                await cont.handleAfter();
        
                await cont.__rendering();
        
                await cont.handleRenderBefore();

                if(cont[routes.action]){
                    let method : string = routes.action;

                    if(routes.aregment){
                        await cont[method](...routes.aregment);
                    }
                    else{
                        await cont[method]();
                    }
                }
        
                await cont.handleRenderAfter(); 

                this.__before_controller = cont;
                this.__before_action = routes.action;
                
            }catch(error){
                console.error(error);

                try{
                    
                    var expPath = "app/Exception/Exception";

                    if(!useExists(expPath)){
                        console.error("\Exception\" Class is not found.");
                        this.#_defautShowException();
                        return;
                    }

                    const Exception = use(expPath);
                    var exps = new Exception;

                    if(!(
                        exps.handle ||
                        cont.before_handle
                    )){
                        console.error("\handle\" method on \"Exception\" class is not found.");
                        return;
                    }

                    await exps.handleBefore(error);

                    if(exps.before_handle){
                        await exps.before_handle(error);
                    }

                    await exps.handleAfter(error);

                    await exps.__rendering();

                    await exps.handleRenderBefore();
            
                    if(exps.handle){
                        await exps.handle(error);
                    }
            
                    await exps.handleRenderAfter(); 

                }catch(error2){
                    console.error(error2);
                }
            }
   
        }).bind(this)();
    }

    /**
     * view
     * 
     * Get View's content information.
     * 
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    view(viewName : string) : string{

        var viewPath = "View/" + viewName + ".html";
        if(!useExists(viewPath)){
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.</div>"; 
        }
        
        var content = use(viewPath);
        content = Util.base64Decode(content);
        
        return content;
    }

    /**
     * template
     * 
     * Get template content information.
     * 
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    template(templateName : string) : string{

        var templatePath = "Template/" + templateName + ".html";

        if(!useExists(templatePath)){
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.</div>"; 
        }

        var content = use(templatePath);
        content = Util.base64Decode(content);
        
        return content;
    }

    /**
     * viewPart
     * 
     * Get viewPart content information.
     * 
     * @param {string} viewPartName ViewPart Name
     * @returns {string} viewPart contents
     */
    viewPart(viewPartName : string) : string{

        var viewPartPath = "ViewPart/" + viewPartName + ".html";
        if(!useExists(viewPartPath)){
            return "<div style=\"font-weight:bold;\">ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.</div>";
        }
        
        var content = use(viewPartPath);
        content = Util.base64Decode(content);
        
        return content;
    }

    private __bind(type : string, arg1: string, arg2? : string, vdomFlg? : boolean) : object{
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
        target.html(content);

        return {
            already: false,
            name : name,
        };
    }

    private _loadRenderingClass(type : string, option : any) : void{
        const classPath = "app/" + type + "/" + option.name;

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
     * 
     * bindView :
     * 
     * Binds the View content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the View class is set.  
     * (Requires handle method.)
     * @param {string} viewName View content name and binding destination element tag VDom selector name (ref attribute).
     * @returns {void}
     */
    bindView(viewName : string) : void;

    /**
     * 
     * bindView :
     * 
     * Binds the View content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the View class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewName View content name
     * @returns {void}
     */
    bindView(selector : string, viewName : string) : void;

    /**
     * 
     * bindView :
     * 
     * Binds the View content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the View class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewName View content name
     * @param {boolean} vdomFlg If specified as true, it will be bound by virtual Dom control.
     * @returns {void}
     */
    bindView(selector : string, viewName : string, vdomFlg : boolean) : void;

    bindView(arg1 : string, arg2? : string, vdomFlg? : boolean) : void{
        const res = this.__bind("view", arg1, arg2, vdomFlg);
        this._loadRenderingClass("View", res);
    }

    bindTemplate(templateName : string) : void;

    bindTemplate(selector : string, templateName : string) : void;

    bindTemplate(selector : string, templateName : string, vdomFlg : boolean) : void;

    bindTemplate(arg1 : string, arg2? : string, vdomFlg? : boolean) : void{
        const res = this.__bind("template", arg1, arg2, vdomFlg);
        this._loadRenderingClass("Template", res);
    }

    /**
     * 
     * bindViewPart :
     * 
     * Binds the ViewPart content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the ViewPart class is set.  
     * (Requires handle method.)
     * @param {string} viewPartName ViewPart content name and binding destination element tag VDom selector name (ref attribute).
     * @returns {void}
     */
    bindViewPart(viewPartName : string) : void;

    /**
     * 
     * bindViewPart :
     * 
     * Binds the ViewPart content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the ViewPart class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewPartName ViewPart content name
     * @returns {void}
     */
    bindViewPart(selector : string, viewPartName : string) : void;

    /**
     * 
     * bindViewPart :
     * 
     * Binds the ViewPart content to the specified selector's element tag.  
     * This method will execute the event handler at the same time if the ViewPart class is set.  
     * (Requires handle method.)
     * @param {string} selector Element tag selector to bind to
     * @param {string} viewPartName ViewPart content name
     * @param {boolean} vdomFlg If specified as true, it will be bound by virtual Dom control.
     * @returns {void}
     */
    bindViewPart(selector : string, viewPartName : string, vdomFlg : boolean) : void;

    bindViewPart(arg1 : string, arg2? : string, vdomFlg? : boolean) : void{
        const res = this.__bind("viewpart", arg1, arg2, vdomFlg);
        this._loadRenderingClass("ViewPart", res);
    }

    #_defautShowException(){
        var content = use("ExceptionHtml");
        content = Util.base64Decode(content);
        Dom("body").removeVirtual("__before_render__").html(content);
        this.__before_controller = null;
        Data.before_template = null;
    }
};