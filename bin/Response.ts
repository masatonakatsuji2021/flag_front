import Util from "Util";
import Dom from "Dom";
import Data from "Data";

export default new class Response{

    __before_controller : string = null;
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
     * redirect to another page
     * 
     * @param {string} url Destination page URL
     * @param {boolean} sliented When set to true, page transition processing is not performed only by changing the page URL
     * @returns {void}
     */
    redirect(url : string, sliented : boolean = false) : void{

        if(!url){
            url = "/";
        }
        
        if(sliented){
            location.replace("#" + url);
        }
        else{
            location.href = "#" + url;
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
            var message = "[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.";
            console.error(message);
            return "<pre>" + message + "</pre>"; 
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
            var message = "[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.";
            console.error(message);
            return "<pre>" + message + "</pre>"; 
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
            console.error("ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.");
            return;
        }
        
        var content = use(viewPartPath);
        content = Util.base64Decode(content);
        
        return content;
    }

    bindView(selector : string, viewName : string) : void{
        var content = this.view(viewName);
        Dom(selector).html(content);
    }

    bindTemplate(selector : string, templateName : string) : void{
        var content = this.template(templateName);
        Dom(selector).html(content);
    }

    bindViewPart(selector : string, viewPartName : string) : void{
        var content = this.viewPart(viewPartName);
        Dom(selector).html(content);
    }

    #_defautShowException(){
        var content = use("ExceptionHtml");
        content = Util.base64Decode(content);
        Dom("body").html(content);
        this.__before_controller = null;
        Data.before_template = null;
    }
};