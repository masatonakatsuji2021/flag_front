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
const Cli_1 = require("@flagfw/flag/bin/Cli");
const path = require("path");
exports.default = (args) => __awaiter(void 0, void 0, void 0, function* () {
    __dirname = path.dirname(__dirname);
    var projectName = args._any[1];
    if (!projectName) {
        Cli_1.default.red("[ERROR]").outn("package name not found.");
        return;
    }
    let packageJson;
    try {
        packageJson = require(process.cwd() + "/package.json");
    }
    catch (error) {
        Cli_1.default.red("[ERROR]").outn("Package.json not found. ");
        return;
    }
    if (!packageJson.flagFront) {
        Cli_1.default.red("[ERROR]").outn("Option information of \"flagFront\" is not set in \"package.json\".");
        return;
    }
    var option = null;
    for (var n = 0; n < packageJson.flagFront.length; n++) {
        var buff = packageJson.flagFront[n];
        if (buff.name == projectName) {
            option = buff;
            break;
        }
    }
    if (!option) {
        Cli_1.default.red("[ERROR]").outn("Project information \"" + projectName + "\" is not set in \"flagFront\" of \"package.json\".");
        return;
    }
    Cli_1.default
        .outn("Delete project \"" + projectName + "\".")
        .br()
        .br();
    var judge = yield Cli_1.default.in("Are you really sure? [y]");
    if (!judge) {
        judge = "y";
    }
    if (judge.toString().toLowerCase() == "y") {
    }
    Cli_1.default
        .br()
        .br()
        .green("..... Remove Project!");
});
