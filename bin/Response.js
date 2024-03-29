"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("Util");
const Dom_1 = require("Dom");
const VDom_1 = require("VDom");
const Data_1 = require("Data");
class Response {
    /**
     * ***pageEnable*** :
     * Temporarily suspend the page move operation.
     */
    static set pageEnable(status) {
        Data_1.default.__page_status = status;
    }
    static get pageEnable() {
        return Data_1.default.__page_status;
    }
    static get vectol() {
        return Data_1.default.__step_mode;
    }
    static redirect(url, sliented) {
        if (!url) {
            url = "/";
        }
        if (sliented) {
            Data_1.default.__step_mode = true;
            location.href = "#" + url;
        }
        else {
            location.replace("#" + url);
        }
    }
    static __renderingAnimated(targetDomName, routes, context, contentHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const target = (0, Dom_1.default)(targetDomName);
                let main = target.childDom("pagelist");
                if (!main.length) {
                    target.html = "<pagelist></pagelist>";
                    main = target.childDom("pagelist");
                }
                const next = main.childDom("page-section[id=\"" + routes.url + "\"]");
                if (next.length) {
                    let nows = [];
                    let _next = next._qs[0];
                    for (;;) {
                        const now = _next.nextElementSibling;
                        if (now) {
                            nows.push(now);
                        }
                        else {
                            break;
                        }
                        _next = now;
                    }
                    for (let n = 0; n < nows.length; n++) {
                        const now = nows[n];
                        now.setAttribute("hold", true);
                        setTimeout(() => {
                            now.removeAttribute("hold");
                            setTimeout(() => {
                                now.remove();
                                resolve(true);
                            }, 20);
                        }, 350);
                    }
                }
                else {
                    const newdom = document.createElement("page-section");
                    newdom.setAttribute("id", routes.url);
                    newdom.setAttribute("hold", "OK");
                    newdom.innerHTML = "<base></base><page>" + contentHtml + "</page>";
                    main.append(newdom);
                    if (routes.started) {
                        newdom.removeAttribute("hold");
                        resolve(true);
                    }
                    else {
                        setTimeout(() => {
                            newdom.removeAttribute("hold");
                            resolve(true);
                        }, 20);
                    }
                }
            });
        });
    }
    static __rendering(routes, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const myApp = use("app/config/app");
            if (!context.view) {
                if (routes.controller) {
                    context.view = routes.controller + "/" + routes.action;
                }
                else if (routes.view) {
                    context.view = routes.view;
                }
            }
            if (context.template) {
                if (Data_1.default.__before_template != context.template) {
                    Data_1.default.__before_template = context.template;
                    const templateHtml = Response.template(context.template);
                    (0, Dom_1.default)("body").html = templateHtml;
                    yield Response.loadRenderingClass("Template", context.template);
                }
                const viewHtml = Response.view(context.view);
                if (myApp.animated) {
                    yield Response.__renderingAnimated("[spa-contents]", routes, context, viewHtml);
                }
                else {
                    (0, Dom_1.default)("[spa-contents]").html = viewHtml;
                }
            }
            else {
                Data_1.default.__before_template = null;
                const viewHtml = Response.view(context.view);
                if (myApp.animated) {
                    yield Response.__renderingAnimated("body", routes, context, viewHtml);
                }
                else {
                    (0, Dom_1.default)("body").html = viewHtml;
                }
            }
            Response.setBindView();
            Response.setBindTemplate();
            Response.setBindViewPart();
            (0, VDom_1.default)().refresh();
        });
    }
    static renderingOnController(routes) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerName = Util_1.default.ucFirst(routes.controller) + "Controller";
            const contPath = "app/Controller/" + controllerName;
            if (!useExists(contPath)) {
                throw ("\"" + controllerName + "\" Class is not found.");
            }
            const Controller_ = use(contPath);
            const cont = new Controller_();
            const viewName = Util_1.default.ucFirst(routes.action) + "View";
            const viewPath = "app/View/" + Util_1.default.ucFirst(routes.controller) + "/" + viewName;
            let vw;
            if (useExists(viewPath)) {
                const View_ = use(viewPath);
                vw = new View_();
            }
            let beginStatus = false;
            if (Data_1.default.__before_controller_path != contPath) {
                Data_1.default.__before_controller_path = contPath;
                beginStatus = true;
            }
            yield cont.handleBefore(beginStatus);
            if (vw) {
                yield vw.handleBefore(beginStatus);
            }
            Data_1.default.__before_controller = cont;
            Data_1.default.__before_action = routes.action;
            Data_1.default.__before_view = null;
            Data_1.default.__before_view_path = null;
            Data_1.default.__child_classs = {};
            if (cont["before_" + routes.action]) {
                const method = "before_" + routes.action;
                if (routes.aregment) {
                    yield cont[method](...routes.aregment);
                }
                else {
                    yield cont[method]();
                }
            }
            yield cont.handleAfter(beginStatus);
            if (vw) {
                yield vw.handleAfter(beginStatus);
            }
            yield Response.__rendering(routes, cont);
            yield cont.handleRenderBefore(beginStatus);
            if (vw) {
                yield vw.handleRenderBefore(beginStatus);
            }
            if (cont[routes.action]) {
                const method = routes.action;
                if (routes.aregment) {
                    yield cont[method](...routes.aregment);
                }
                else {
                    yield cont[method]();
                }
            }
            if (vw) {
                if (routes.aregment) {
                    yield vw.handle(...routes.aregment);
                }
                else {
                    yield vw.handle();
                }
            }
            yield cont.handleRenderAfter(beginStatus);
            if (vw) {
                yield vw.handleRenderAfter(beginStatus);
            }
        });
    }
    static renderingOnView(routes) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewName = Util_1.default.ucFirst(routes.view) + "View";
            const viewPath = "app/View/" + viewName;
            if (!useExists(viewPath)) {
                throw ("\"" + viewName + "\" Class is not found.");
            }
            const View_ = use(viewPath);
            const vm = new View_();
            if (Data_1.default.__before_view_path != viewPath) {
                Data_1.default.__before_view_path = viewPath;
                if (vm.handleBegin) {
                    yield vm.handleBegin();
                }
            }
            Data_1.default.__before_view = vm;
            Data_1.default.__before_controller = null;
            Data_1.default.__before_controller_path = null;
            Data_1.default.__before_action = null;
            Data_1.default.__child_classs = {};
            yield vm.handleBefore();
            yield vm.handleAfter();
            yield Response.__rendering(routes, vm);
            yield vm.handleRenderBefore();
            if (routes.aregment) {
                yield vm.handle(...routes.aregment);
            }
            else {
                yield vm.handle();
            }
            yield vm.handleRenderAfter();
        });
    }
    static rendering(routes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Data_1.default.__before_controller) {
                    var befCont = Data_1.default.__before_controller;
                    yield befCont.handleLeave(Data_1.default.__before_action);
                }
                if (Data_1.default.__before_view) {
                    var befView = Data_1.default.__before_view;
                    yield befView.handleLeave();
                }
                if (routes.mode == "notfound") {
                    throw ("404 not found");
                }
                if (routes.controller) {
                    yield Response.renderingOnController(routes);
                }
                else if (routes.view) {
                    yield Response.renderingOnView(routes);
                }
            }
            catch (error) {
                console.error(error);
                try {
                    const expPath = "app/Exception/Exception";
                    if (!useExists(expPath)) {
                        console.error("\Exception\" Class is not found.");
                        Response.defautShowException();
                        return;
                    }
                    const Exception_ = use(expPath);
                    const exps = new Exception_;
                    if (!(exps.handle)) {
                        console.error("\handle\" method on \"Exception\" class is not found.");
                        return;
                    }
                    yield exps.handleBefore(error);
                    if (exps.before_handle) {
                        yield exps.before_handle(error);
                    }
                    yield exps.handleAfter(error);
                    yield Response.__rendering(routes, exps);
                    yield exps.handleRenderBefore();
                    if (exps.handle) {
                        yield exps.handle(error);
                    }
                    yield exps.handleRenderAfter();
                }
                catch (error2) {
                    console.error(error2);
                }
            }
        });
    }
    /**
     * *** view *** :
     * Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    static view(viewName) {
        const viewPath = "View/" + viewName + ".html";
        if (!useExists(viewPath)) {
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.</div>";
        }
        let content = use(viewPath);
        content = Util_1.default.base64Decode(content);
        return content;
    }
    /**
     * ***template*** :
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    static template(templateName) {
        const templatePath = "Template/" + templateName + ".html";
        if (!useExists(templatePath)) {
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.</div>";
        }
        var content = use(templatePath);
        content = Util_1.default.base64Decode(content);
        return content;
    }
    /**
     * ***viewPart*** :
     * Get viewPart content information.
     * @param {string} viewPartName ViewPart Name
     * @returns {string} viewPart contents
     */
    static viewPart(viewPartName) {
        const viewPartPath = "ViewPart/" + viewPartName + ".html";
        if (!useExists(viewPartPath)) {
            return "<div style=\"font-weight:bold;\">ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.</div>";
        }
        var content = use(viewPartPath);
        content = Util_1.default.base64Decode(content);
        const vw = document.createElement("template");
        vw.innerHTML = content;
        Response.setBindViewPart(vw);
        return vw.innerHTML;
    }
    static setRenderingClass(type, className) {
        let classNamePaths = className.split("/");
        classNamePaths[classNamePaths.length - 1] = Util_1.default.ucFirst(classNamePaths[classNamePaths.length - 1]);
        let classNamePath = classNamePaths.join("/");
        const classPath = "app/" + type + "/" + classNamePath + Util_1.default.ucFirst(type);
        if (!useExists(classPath)) {
            return;
        }
        const _class = use(classPath);
        const classObj = new _class();
        if (!classObj) {
            return;
        }
        Data_1.default.__child_classs[classPath] = classObj;
        return classObj;
    }
    static loadRenderingClass(type, className) {
        const classObj = Response.setRenderingClass(type, className);
        if (!classObj) {
            return;
        }
        if (classObj.handle) {
            classObj.handle();
        }
        if (classObj.handleAlways) {
            classObj.handleAlways();
        }
    }
    static defautShowException() {
        var content = use("ExceptionHtml");
        content = Util_1.default.base64Decode(content);
        (0, Dom_1.default)("body").removeVirtual("__before_render__").html = content;
        Data_1.default.__before_controller = null;
        Data_1.default.__before_template = null;
    }
    static setBindView(parentElement) {
        return Response._setBind("view", "View", parentElement);
    }
    static setBindTemplate(parentElement) {
        return Response._setBind("template", "Template", parentElement);
    }
    static setBindViewPart(parentElement) {
        return Response._setBind("viewpart", "ViewPart", parentElement);
    }
    static _setBind(type, className, parentElement) {
        const name = "v-show-" + type;
        let targets;
        if (parentElement) {
            targets = parentElement.querySelectorAll("[" + name + "]");
        }
        else {
            targets = document.querySelectorAll("[" + name + "]");
        }
        for (let n = 0; n < targets.length; n++) {
            const target = targets[n];
            let targetName = target.getAttribute(name);
            Response.loadRenderingClass(className, targetName);
            target.removeAttribute(name);
            let content;
            if (type == "view") {
                content = Response.view(targetName);
            }
            else if (type == "template") {
                content = Response.template(targetName);
            }
            else if (type == "viewpart") {
                content = Response.viewPart(targetName);
            }
            target.outerHTML = content;
            (0, Dom_1.default)().renderingRefresh();
        }
    }
}
exports.default = Response;
;
