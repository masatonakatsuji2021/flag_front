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
const Data_1 = require("Data");
exports.default = new (_a = class Response {
        constructor() {
            _Response_instances.add(this);
            this.__before_controller = null;
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
        /**
         * redirect
         *
         * redirect to another page
         *
         * @param {string} url Destination page URL
         * @param {boolean} sliented When set to true, page transition processing is not performed only by changing the page URL
         * @returns {void}
         */
        redirect(url, sliented = false) {
            if (!url) {
                url = "/";
            }
            if (sliented) {
                location.replace("#" + url);
            }
            else {
                location.href = "#" + url;
            }
        }
        rendering(routes) {
            (function () {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (this.__before_controller) {
                            var befCont = this.__before_controller;
                            yield befCont.handleLeave(this.__before_action);
                        }
                        if (routes.mode == "notfound") {
                            throw ("404 not found");
                        }
                        var controllerName = routes.controller.substring(0, 1).toUpperCase() + routes.controller.substring(1) + "Controller";
                        var contPath = "app/Controller/" + controllerName;
                        if (!useExists(contPath)) {
                            throw ("\"" + controllerName + "\" Class is not found.");
                        }
                        const Controller = use(contPath);
                        var cont = new Controller();
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
                        yield cont.__rendering();
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
                            if (!(exps.handle ||
                                cont.before_handle)) {
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
                var message = "[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.";
                console.error(message);
                return "<pre>" + message + "</pre>";
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
                var message = "[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.";
                console.error(message);
                return "<pre>" + message + "</pre>";
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
                console.error("ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.");
                return;
            }
            var content = use(viewPartPath);
            content = Util_1.default.base64Decode(content);
            return content;
        }
        bindView(selector, viewName) {
            var content = this.view(viewName);
            (0, Dom_1.default)(selector).html(content);
        }
        bindTemplate(selector, templateName) {
            var content = this.template(templateName);
            (0, Dom_1.default)(selector).html(content);
        }
        bindViewPart(selector, viewPartName) {
            var content = this.viewPart(viewPartName);
            (0, Dom_1.default)(selector).html(content);
        }
    },
    _Response_instances = new WeakSet(),
    _Response__defautShowException = function _Response__defautShowException() {
        var content = use("ExceptionHtml");
        content = Util_1.default.base64Decode(content);
        (0, Dom_1.default)("body").html(content);
        this.__before_controller = null;
        Data_1.default.before_template = null;
    },
    _a);
