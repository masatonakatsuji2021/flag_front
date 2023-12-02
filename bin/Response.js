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
        Response.__page_status = status;
    }
    static get pageEnable() {
        return Response.__page_status;
    }
    static redirect(url, sliented) {
        if (!url) {
            url = "/";
        }
        if (sliented) {
            location.href = "#" + url;
        }
        else {
            location.replace("#" + url);
        }
    }
    static __rendering(routes, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.view) {
                if (routes.controller) {
                    context.view = routes.controller + "/" + routes.action;
                }
                else if (routes.view) {
                    context.view = routes.view;
                }
            }
            if (context.template) {
                if (Data_1.default.before_template != context.template) {
                    Data_1.default.before_template = context.template;
                    Response.bindTemplate("body", context.template);
                    Response.bindView("[spa-contents]", context.view);
                }
                else {
                    Response.bindView("[spa-contents]", context.view);
                }
            }
            else {
                Data_1.default.before_template = null;
                Response.bindView("body", context.view);
            }
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
            if (Response.__before_controller_path != contPath) {
                Response.__before_controller_path = contPath;
                if (cont.handleBegin) {
                    yield cont.handleBegin();
                }
            }
            if (!(cont[routes.action] ||
                cont["before_" + routes.action])) {
                throw ("\"" + routes.action + "\" method on \"" + controllerName + "\" class is not found.");
            }
            yield cont.handleBefore();
            if (cont["before_" + routes.action]) {
                const method = "before_" + routes.action;
                if (routes.aregment) {
                    yield cont[method](...routes.aregment);
                }
                else {
                    yield cont[method]();
                }
            }
            yield cont.handleAfter();
            yield Response.__rendering(routes, cont);
            yield cont.handleRenderBefore();
            if (cont[routes.action]) {
                const method = routes.action;
                if (routes.aregment) {
                    yield cont[method](...routes.aregment);
                }
                else {
                    yield cont[method]();
                }
            }
            yield cont.handleRenderAfter();
            Response.__before_controller = cont;
            Response.__before_action = routes.action;
            Response.__before_view = null;
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
            if (Response.__before_view_path != viewPath) {
                Response.__before_view_path = viewPath;
                if (vm.handleBegin) {
                    yield vm.handleBegin();
                }
            }
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
            Response.__before_view = vm;
            Response.__before_controller = null;
            Response.__before_action = null;
        });
    }
    static rendering(routes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Response.__before_controller) {
                    var befCont = Response.__before_controller;
                    yield befCont.handleLeave(Response.__before_action);
                }
                if (Response.__before_view) {
                    var befView = Response.__before_view;
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
        const vw = document.createElement("div");
        vw.innerHTML = content;
        Response.setBindViewPart(vw);
        return vw.innerHTML;
    }
    static __bind(type, arg1, arg2, vdomFlg) {
        let target = null;
        let name = "";
        if (arg2) {
            name = arg2;
            if (vdomFlg) {
                target = (0, VDom_1.default)(arg1);
            }
            else {
                target = (0, Dom_1.default)(arg1);
            }
        }
        else {
            name = arg1;
            target = (0, VDom_1.default)(arg1);
        }
        if (target.virtual("__before_render__") == type + "-" + name) {
            return {
                already: true,
                name: name,
            };
        }
        target.virtual("__before_render__", type + "-" + name);
        let methodName = type;
        if (type == "viewpart") {
            methodName = "viewPart";
        }
        var content = this[methodName](name);
        target.html = content;
        return {
            already: false,
            name: name,
        };
    }
    static loadRenderingClass(type, option) {
        const classPath = "app/" + type + "/" + option.name;
        if (!useExists(classPath)) {
            return;
        }
        const _class = use(classPath);
        const classObj = new _class();
        if (!classObj) {
            return;
        }
        if (!option.already) {
            if (classObj.handle) {
                classObj.handle();
            }
        }
        if (classObj.handleAlways) {
            classObj.handleAlways();
        }
    }
    static bindView(arg1, arg2, vdomFlg) {
        const res = Response.__bind("view", arg1, arg2, vdomFlg);
        Response.loadRenderingClass("View", res);
    }
    static bindTemplate(arg1, arg2, vdomFlg) {
        const res = Response.__bind("template", arg1, arg2, vdomFlg);
        Response.loadRenderingClass("Template", res);
    }
    static bindViewPart(arg1, arg2, vdomFlg) {
        const res = Response.__bind("viewpart", arg1, arg2, vdomFlg);
        Response.loadRenderingClass("ViewPart", res);
    }
    static defautShowException() {
        var content = use("ExceptionHtml");
        content = Util_1.default.base64Decode(content);
        (0, Dom_1.default)("body").removeVirtual("__before_render__").html = content;
        this.__before_controller = null;
        Data_1.default.before_template = null;
    }
    static setBindViewPart(parentElement) {
        const name = "v-show-viewpart";
        let viewparts;
        if (parentElement) {
            viewparts = parentElement.querySelectorAll("[" + name + "]");
        }
        else {
            viewparts = document.querySelectorAll("[" + name + "]");
        }
        for (let n = 0; n < viewparts.length; n++) {
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
}
Response.__before_controller = null;
Response.__before_controller_path = null;
Response.__before_view = null;
Response.__before_view_path = null;
Response.__before_action = null;
Response.__page_status = true;
exports.default = Response;
;
