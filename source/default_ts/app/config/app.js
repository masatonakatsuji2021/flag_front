"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class App {
    constructor() {
        this.name = "TEST APP";
        this.routes = {
            "/": "controller:main|action:index",
            "/page": "controller:page|action:index",
        };
    }
};
