import Util from "Util";
import Dom from "Dom";
import VDom from "VDom";
import Data from "Data";
import Controller from "Controller";
import View from "View";
import Routes from "Routes";

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

    public static get vectol() : boolean{
        return Data.__step_mode;
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
            Data.__step_mode = true;
            location.href = "#" + url;
        }
        else{
            location.replace("#" + url);
        }
    }

    public static async __renderingAnimated(targetDomName, routes, context, contentHtml){
        
        return new Promise((resolve)=>{
        
            const target = Dom(targetDomName);

            let main = target.childDom("pagelist");
            if(!main.length){
                target.html = "<pagelist></pagelist>"
                main = target.childDom("pagelist");
            }
    
            const next = main.childDom("page-section[id=\"" + routes.url + "\"]");
    
            if(next.length){
                let nows = [];
                let _next = next._qs[0];
                for(;;){
                    const now = _next.nextElementSibling;
                        if(now){
                            nows.push(now)
                        }
                        else{
                            break;
                        }
                        _next = now;
                    }
    
                    for(let n = 0 ; n < nows.length ; n++){
                        const now = nows[n];
                        now.setAttribute("hold", true);
                            
                        setTimeout(()=>{
                            now.removeAttribute("hold");
                            setTimeout(()=>{
                                now.remove();
                                resolve(true);
                            },20);
                        }, 350);
                    }
            }
            else{
                const newdom = document.createElement("page-section");
                newdom.setAttribute("id", routes.url);
                newdom.setAttribute("hold", "OK");
                newdom.innerHTML = "<base></base><page>" + contentHtml+ "</page>"
                main.append(newdom);
                if(routes.started){
                    newdom.removeAttribute("hold");
                    resolve(true);
                }
                else{
                    setTimeout(()=>{
                        newdom.removeAttribute("hold");
                        resolve(true);
                    },20);    
                }
            }
        });
    }

    public static async __rendering(routes, context){

        const myApp = use("app/config/app");

        if(!context.view){
            if(routes.controller){
                context.view = routes.controller + "/" + routes.action;
            }
            else if(routes.view){
                context.view = routes.view;
            }
        }

        if(context.template){

            if(Data.__before_template != context.template){
                Data.__before_template = context.template;
                const templateHtml = Response.template(context.template);
                Dom("body").html = templateHtml;

                await Response.loadRenderingClass("Template", context.template);
            }

            const viewHtml = Response.view(context.view);

            if(myApp.animated){
                await Response.__renderingAnimated("[spa-contents]", routes, context, viewHtml);
            }
            else{
                Dom("[spa-contents]").html = viewHtml;    
            }
        }
        else{
            Data.__before_template = null;
            const viewHtml = Response.view(context.view);

            if(myApp.animated){
                await  Response.__renderingAnimated("body", routes, context, viewHtml);
            }
            else{
                Dom("body").html = viewHtml;
            }
        }

        Response.setBindView();
        Response.setBindTemplate();
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

        const viewName = Util.ucFirst(routes.action) + "View";
        const viewPath : string = "app/View/" + Util.ucFirst(routes.controller) + "/" + viewName;
        
        let vw : View; 
        if(useExists(viewPath)){
            const View_ = use(viewPath);
            vw = new View_();
        }

        let beginStatus = false;
        if(Data.__before_controller_path != contPath){
            Data.__before_controller_path = contPath;
            beginStatus = true;
        }

        await cont.handleBefore(beginStatus);
        if(vw){
            await vw.handleBefore(beginStatus);
        }

        Data.__before_controller = cont;
        Data.__before_action = routes.action;
        Data.__before_view = null;
        Data.__before_view_path = null;
        Data.__child_classs = {};
        
        if(cont["before_" + routes.action]){
            const method : string = "before_" + routes.action;

            if(routes.aregment){
                await cont[method](...routes.aregment);
            }
            else{
                await cont[method]();
            }
        }

        await cont.handleAfter(beginStatus);

        if(vw){
            await vw.handleAfter(beginStatus);
        }

        await Response.__rendering(routes, cont);

        await cont.handleRenderBefore(beginStatus);

        if(vw){
            await vw.handleRenderBefore(beginStatus);
        }

        if(cont[routes.action]){
            const method : string = routes.action;

            if(routes.aregment){
                await cont[method](...routes.aregment);
            }
            else{
                await cont[method]();
            }
        }

        if(vw){
            if(routes.aregment){
                await vw.handle(...routes.aregment);
            }
            else{
                await vw.handle();
            }
        }

        await cont.handleRenderAfter(beginStatus); 

        if(vw){
            await vw.handleRenderAfter(beginStatus);
        }
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
        Data.__before_controller_path = null;
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
        
        const vw = document.createElement("template");
        vw.innerHTML = content;
        Response.setBindViewPart(vw);
    
        return vw.innerHTML;
    }

    private static setRenderingClass(type : string, className : string){
        let classNamePaths = className.split("/");
        classNamePaths[classNamePaths.length - 1] = Util.ucFirst(classNamePaths[classNamePaths.length - 1]);
        let classNamePath = classNamePaths.join("/");

        const classPath : string = "app/" + type + "/" + classNamePath + Util.ucFirst(type);

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
        Data.__before_template = null;
    }

    private static setBindView(parentElement? : Element){
        return Response._setBind("view", "View", parentElement);
    }
    
    private static setBindTemplate(parentElement? : Element){
        return Response._setBind("template", "Template", parentElement);
    }

    private static setBindViewPart(parentElement? : Element){
        return Response._setBind("viewpart", "ViewPart", parentElement);
    }

    private static _setBind(type : string, className : string, parentElement? : Element){
        const name = "v-show-" + type;
        let targets;
        if(parentElement){
            targets = parentElement.querySelectorAll("[" + name + "]");
        }
        else{
            targets = document.querySelectorAll("[" + name + "]");
        }
        for(let n = 0 ; n < targets.length ; n++){
            const target = targets[n];
            let targetName = target.getAttribute(name);
            Response.loadRenderingClass(className, targetName);
            target.removeAttribute(name);
            let content;
            if(type == "view"){
                content = Response.view(targetName);
            }
            else if(type == "template"){
                content = Response.template(targetName);
            }
            else if(type == "viewpart"){
                content = Response.viewPart(targetName);
            }
            target.outerHTML = content;
            Dom().renderingRefresh();
        }
    }
};