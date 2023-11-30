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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Response_instances, _Response__defautShowException, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("Util");
const Dom_1 = require("Dom");
const VDom_1 = require("VDom");
const Data_1 = require("Data");
exports.default = new (_a = class Response {
        constructor() {
            _Response_instances.add(this);
            this.__before_controller = null;
            this.__before_controller_path = null;
            this.__before_view = null;
            this.__before_view_path = null;
            this.__before_action = null;
            this.__page_status = true;
        }
        /**
         * pageDisable
         *
         * Temporarily suspend the page move operation.
         *
         * @returns {Response} Response Class Object (method chain)
         */
        pageDisable() {
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
        pageEnable() {
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
        setPageStatus() {
            return this.__page_status;
        }
        redirect(url, sliented) {
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
        __rendering(routes, context) {
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
                        this.bindTemplate("body", context.template);
                        this.bindView("[spa-contents]", context.view);
                    }
                    else {
                        this.bindView("[spa-contents]", context.view);
                    }
                }
                else {
                    Data_1.default.before_template = null;
                    this.bindView("body", context.view);
                }
                (0, VDom_1.default)().refresh();
            });
        }
        renderingOnController(routes) {
            return __awaiter(this, void 0, void 0, function* () {
                var controllerName = routes.controller.substring(0, 1).toUpperCase() + routes.controller.substring(1) + "Controller";
                var contPath = "app/Controller/" + controllerName;
                if (!useExists(contPath)) {
                    throw ("\"" + controllerName + "\" Class is not found.");
                }
                const Controller = use(contPath);
                var cont = new Controller();
                if (this.__before_controller_path != contPath) {
                    this.__before_controller_path = contPath;
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
                    var method = "before_" + routes.action;
                    if (routes.aregment) {
                        yield cont[method](...routes.aregment);
                    }
                    else {
                        yield cont[method]();
                    }
                }
                yield cont.handleAfter();
                yield this.__rendering(routes, cont);
                yield cont.handleRenderBefore();
                if (cont[routes.action]) {
                    let method = routes.action;
                    if (routes.aregment) {
                        yield cont[method](...routes.aregment);
                    }
                    else {
                        yield cont[method]();
                    }
                }
                yield cont.handleRenderAfter();
                this.__before_controller = cont;
                this.__before_action = routes.action;
                this.__before_view = null;
            });
        }
        renderingOnView(routes) {
            return __awaiter(this, void 0, void 0, function* () {
                let viewName = routes.view.substring(0, 1).toUpperCase() + routes.view.substring(1) + "View";
                let viewPath = "app/View/" + viewName;
                if (!useExists(viewPath)) {
                    throw ("\"" + viewName + "\" Class is not found.");
                }
                const View_ = use(viewPath);
                let vm = new View_();
                if (this.__before_view_path != viewPath) {
                    this.__before_view_path = viewPath;
                    if (vm.handleBegin) {
                        yield vm.handleBegin();
                    }
                }
                yield vm.handleBefore();
                yield vm.handleAfter();
                yield this.__rendering(routes, vm);
                yield vm.handleRenderBefore();
                if (routes.aregment) {
                    yield vm.handle(...routes.aregment);
                }
                else {
                    yield vm.handle();
                }
                yield vm.handleRenderAfter();
                this.__before_view = vm;
                this.__before_controller = null;
                this.__before_action = null;
            });
        }
        rendering(routes) {
            (function () {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (this.__before_controller) {
                            var befCont = this.__before_controller;
                            yield befCont.handleLeave(this.__before_action);
                        }
                        if (this.__before_view) {
                            var befView = this.__before_view;
                            yield befView.handleLeave();
                        }
                        if (routes.mode == "notfound") {
                            throw ("404 not found");
                        }
                        if (routes.controller) {
                            yield this.renderingOnController(routes);
                        }
                        else if (routes.view) {
                            yield this.renderingOnView(routes);
                        }
                    }
                    catch (error) {
                        console.error(error);
                        try {
                            var expPath = "app/Exception/Exception";
                            if (!useExists(expPath)) {
                                console.error("\Exception\" Class is not found.");
                                __classPrivateFieldGet(this, _Response_instances, "m", _Response__defautShowException).call(this);
                                return;
                            }
                            const Exception = use(expPath);
                            var exps = new Exception;
                            if (!(exps.handle
                            /*
                                                     ||
                                                    cont.before_handle
                                                    */
                            )) {
                                console.error("\handle\" method on \"Exception\" class is not found.");
                                return;
                            }
                            yield exps.handleBefore(error);
                            if (exps.before_handle) {
                                yield exps.before_handle(error);
                            }
                            yield exps.handleAfter(error);
                            yield exps.__rendering();
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
        view(viewName) {
            var viewPath = "View/" + viewName + ".html";
            if (!useExists(viewPath)) {
                return "<div style=\"font-weight:bold;\">[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.</div>";
            }
            var content = use(viewPath);
            content = Util_1.default.base64Decode(content);
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
        template(templateName) {
            var templatePath = "Template/" + templateName + ".html";
            if (!useExists(templatePath)) {
                return "<div style=\"font-weight:bold;\">[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.</div>";
            }
            var content = use(templatePath);
            content = Util_1.default.base64Decode(content);
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
        viewPart(viewPartName) {
            var viewPartPath = "ViewPart/" + viewPartName + ".html";
            if (!useExists(viewPartPath)) {
                return "<div style=\"font-weight:bold;\">ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.</div>";
            }
            var content = use(viewPartPath);
            content = Util_1.default.base64Decode(content);
            return content;
        }
        __bind(type, arg1, arg2, vdomFlg) {
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
            target.html(content);
            return {
                already: false,
                name: name,
            };
        }
        _loadRenderingClass(type, option) {
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
        bindView(arg1, arg2, vdomFlg) {
            const res = this.__bind("view", arg1, arg2, vdomFlg);
            this._loadRenderingClass("View", res);
        }
        bindTemplate(arg1, arg2, vdomFlg) {
            const res = this.__bind("template", arg1, arg2, vdomFlg);
            this._loadRenderingClass("Template", res);
        }
        bindViewPart(arg1, arg2, vdomFlg) {
            const res = this.__bind("viewpart", arg1, arg2, vdomFlg);
            this._loadRenderingClass("ViewPart", res);
        }
    },
    _Response_instances = new WeakSet(),
    _Response__defautShowException = function _Response__defautShowException() {
        var content = use("ExceptionHtml");
        content = Util_1.default.base64Decode(content);
        (0, Dom_1.default)("body").removeVirtual("__before_render__").html(content);
        this.__before_controller = null;
        Data_1.default.before_template = null;
    },
    _a);
