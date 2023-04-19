const Util = use("Util");
const Routes = use("Routes");
const Dom = use("Dom");

return new class Response{

    constructor(){
        this.__before_controller = null;
    }

    redirect(url, sliented){

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

    rendering(routes){

        (async function(){

            try{

                if(this.__before_controller){
                    var befCont = this.__before_controller;
                    await befCont.leave();
                }

                if(routes.mode == "notfound"){
                    throw("404 not found");
                }
               
                var controllerName = routes.controller.substring(0,1).toUpperCase() + routes.controller.substring(1) + "Controller";
        
                var contPath = "app/Controller/" + controllerName + ".js";
        
                if(!useExists(contPath)){
                    throw("\"" + controllername + "\" Class is not found.");
                }
        
                const Controller = use(contPath);
                var cont = new Controller;
        
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
                    var method = routes.action;

                    if(routes.aregment){
                        await cont[method](...routes.aregment);
                    }
                    else{
                        await cont[method]();
                    }
                }
        
                await cont.handleRenderAfter(); 

                this.__before_controller = cont;
                
            }catch(error){
                console.error(error);

                try{
                    
                    var expPath = "app/Exception/Exception.js";

                    if(!useExists(expPath)){
                        console.error("\Exception\" Class is not found.");
                        return;
                    }

                    const Exception = use(expPath);
                    var exps = new Exception;

                    if(!(
                        exps.handle ||
                        cont.before_handle
                    )){
                        throw("\handle\" method on \"Exception\" class is not found.");
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

    view(viewName){

        var viewPath = "View/" + viewName + ".html";
        if(!useExists(viewPath)){
            console.error("View data does not exist. Check if source file \"" + viewPath + "\" exists.");
            return;
        }
        
        var content = use(viewPath);
        content = Util.base64Decode(content);
        
        return content;
    }

    template(templateName){

        var templatePath = "Template/" + templateName + ".html";

        if(!useExists(templatePath)){
            console.error("Template data does not exist. Check if source file \"" + templatePath + "\" exists.");
            return;
        }

        var content = use(templatePath);
        content = Util.base64Decode(content);
        
        return content;
    }

    viewPart(viewPartName){

        var viewPartPath = "ViewPart/" + viewPartName + ".html";
        if(!useExists(viewPartPath)){
            console.error("ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.");
            return;
        }
        
        var content = use(viewPartPath);
        content = Util.base64Decode(content);
        
        return content;
    }

    bindView(selector, viewName){
        var content = this.view(viewName);
        Dom(selector).innerHTML = content;
    }

    bindTemplate(selector, templateName){
        var content = this.template(templateName);
        Dom(selector).innerHTML = content;
    }

    bindViewPart(selector, viewPartName){
        var content = this.viewPart(viewPartName);
        Dom(selector).innerHTML = content;
    }
}