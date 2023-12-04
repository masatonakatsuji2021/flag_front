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
const front_1 = require("@flagfw/front");
const Cli_1 = require("@flagfw/flag/bin/Cli");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const info = {
        "- create": "Create and build the SPA project.",
        "- remove": "Remove SPA project.",
        "- build": "Build the project source set.",
        "- plugin add": "Add plugins to use in your project.",
        "- plugin remove": "Remove plugin from project.",
        "- fw add": "Add the framework to output at build time from the project.",
        "- fw remove": "Removes the framework specified in the project.",
    };
    Cli_1.default
        .indent(3)
        .br()
        .outn("[ Command List ]")
        .br()
        .outData(info)
        .br()
        .indent(0);
    let cmd = yield Cli_1.default.in("Enter Command");
    Cli_1.default
        .grayn(".....")
        .br();
    let args = cmd.toString().split(" ");
    yield (0, front_1.default)(args);
});
