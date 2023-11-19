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
const cli_1 = require("../../cli");
const cli_2 = require("@flagfw/cli");
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
    cli_2.FlagCLI
        .indent(3)
        .br()
        .outn("[ Command List ]")
        .br()
        .outData(info)
        .br()
        .indent(0);
    let cmd = yield cli_2.FlagCLI.in("Enter Command");
    cli_2.FlagCLI
        .grayn(".....")
        .br();
    let args = cmd.toString().split(" ");
    yield (0, cli_1.default)(args);
});
