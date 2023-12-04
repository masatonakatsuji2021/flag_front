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
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
exports.default = (pluginName) => __awaiter(void 0, void 0, void 0, function* () {
    Cli_1.default.br();
    let exists = false;
    try {
        require.resolve(pluginName);
        exists = true;
    }
    catch (err) { }
    if (!exists) {
        Cli_1.default.green("#").outn(" npm plugin package install..");
        try {
            execSync("npm i " + pluginName);
        }
        catch (error) {
            Cli_1.default.outn(error);
            return;
        }
    }
    let pluginPath = path.dirname(require.resolve(pluginName));
    var directory = process.cwd();
    let packages = require(directory + "/package.json");
    if (!packages.flagFront.plugin) {
        packages.flagFront.plugin = [];
    }
    packages.flagFront.plugin.push(pluginName);
    fs.writeFileSync(directory + "/package.json", JSON.stringify(packages, null, "   "));
    Cli_1.default.green("#").outn("rewrite package.json");
    // add tsconfig.json
    if (packages.flagFront.typeScript) {
        let tsConfig = require(directory + "/src/tsconfig.json");
        if (!tsConfig.compilerOptions.paths) {
            tsConfig.compilerOptions.paths = {};
        }
        let pluginNameShort = pluginName.replace("@flagfw/front-", "");
        tsConfig.compilerOptions.paths[pluginNameShort] = [pluginPath + "/bin/index.ts"];
        tsConfig.compilerOptions.paths[pluginNameShort + "/*"] = [pluginPath + "/bin/*"];
        fs.writeFileSync(directory + "/src/tsconfig.json", JSON.stringify(tsConfig, null, "   "));
        Cli_1.default.green("#").outn(" rewrite tsconfig.json");
    }
    Cli_1.default.indent(0).br().green("....add plugin complete.").br();
});
