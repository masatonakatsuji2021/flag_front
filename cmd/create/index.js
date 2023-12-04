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
const aa_1 = require("../aa");
const create_1 = require("./create");
exports.default = (args, seconded) => __awaiter(void 0, void 0, void 0, function* () {
    if (!seconded) {
        (0, aa_1.default)();
    }
    Cli_1.default
        .indent(3)
        .br()
        .outn("Please answer various questions as you create your project.")
        .br();
    var name;
    while (!name) {
        name = yield Cli_1.default.in("- Enter project name to create");
        if (!name) {
            Cli_1.default
                .indent(6)
                .red("[ERROR] ").outn("No project name entered. retry.")
                .indent(3);
        }
    }
    var useTypeScript = yield Cli_1.default.in("- Do you use TypeScript?(y)");
    if (useTypeScript) {
        if (useTypeScript == "y") {
            useTypeScript = true;
        }
        else {
            useTypeScript = false;
        }
    }
    else {
        useTypeScript = true;
    }
    var useCompress = yield Cli_1.default.in("- Compress Javascript Source on build? (y)");
    if (useCompress) {
        if (useCompress == "y") {
            useCompress = true;
        }
        else {
            useCompress = false;
        }
    }
    else {
        useCompress = true;
    }
    var useObfuscate = yield Cli_1.default.in("- Obfuscate Javascript Source at build? (y)");
    if (useObfuscate) {
        if (useObfuscate == "y") {
            useObfuscate = true;
        }
        else {
            useObfuscate = false;
        }
    }
    else {
        useObfuscate = true;
    }
    var frameworkList = {
        "cordova": "Android app creation using \"cordova\".",
        "electron": "Windows/Mac desktop application creation using \"Electron\"",
    };
    let frameworks = yield Cli_1.default.outn("- If there is a framework to create, please select from the following.")
        .outn("  (Multiple selections can be made separated by.)")
        .indent(6)
        .br()
        .outData(frameworkList)
        .br()
        .indent(3)
        .in("  Select from above, ()");
    /*
        let templateUsed = await FlagCLI
            .outn("- Would you like to create a project from an official public template?")
            .out("  If you do not use it, it will be a sample source that only displays a primitive main page.(n)")
            .in();
        
        if(templateUsed){
            if(templateUsed == "y"){
                templateUsed = true;
            }
            else{
                templateUsed = false;
            }
        }
        else{
            templateUsed = true;
        }
    
        if(templateUsed){
    
            FlagCLI.outn("Retrieving list of templates....");
            return;
        }
    */
    var create = {
        name: name,
        frameworks: frameworks ? frameworks.toString().split(",") : ["web"],
        typeScript: useTypeScript,
        compress: useCompress,
        obfuscate: useObfuscate,
    };
    var createText = {
        "Project Name": name,
        "Frameworks": frameworks,
        "TypeScript Complie": useTypeScript,
        "Source Compress": useCompress,
        "Source Obfuscate": useObfuscate,
    };
    Cli_1.default
        .indent(6)
        .br()
        .outData(createText)
        .br()
        .indent(3);
    var status = yield Cli_1.default.in("- Create a project with the above contents. Is it OK? (y)");
    if (status) {
        if (status == "y") {
            status = true;
        }
        else {
            status = false;
        }
    }
    else {
        status = true;
    }
    if (!status) {
        Cli_1.default.br().redn(".....Create Projsect Pause!");
        return;
    }
    yield (0, create_1.default)(create);
});
