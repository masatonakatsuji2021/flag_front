const { Util, Routes, Dom, Data } = uses([
    "Util",
    "Routes",
    "Dom",
    "Data",
]);

return new class Response{

    __page_status = true;

    constructor(){
        this.__before_controller = null;
    }

    pageDisable(){
        this.__page_status = false;
        return this;
    }

    pageEnable(){
        this.__page_status = true;
        return this;
    }

    setPageStatus(){
        return this.__page_status;
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
                    await befCont.handleLeave();
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

    view(viewName){

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

    template(templateName){

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
        Dom(selector).html(content);
    }

    bindTemplate(selector, templateName){
        var content = this.template(templateName);
        Dom(selector).html(content);
    }

    bindViewPart(selector, viewPartName){
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