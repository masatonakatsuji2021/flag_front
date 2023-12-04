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
exports.default = (args) => __awaiter(void 0, void 0, void 0, function* () {
    Cli_1.default
        .indent(3)
        .outn("* Flag Add Plugin")
        .outn("Answer the various questions when adding the plugin");
    let pluginName = args._any[2];
    if (!pluginName) {
        while (!pluginName) {
            pluginName = yield Cli_1.default.in("- Enter the plugin name (npm module path) to add");
            if (!pluginName) {
                Cli_1.default
                    .indent(6)
                    .red("[ERROR] ").outn("No plugin name entered. retry.")
                    .indent(3);
            }
        }
    }
    var directory = process.cwd();
    let packages = require(directory + "/package.json");
    if (packages.flagFront.plugin) {
        if (packages.flagFront.plugin.indexOf(pluginName) > -1) {
            Cli_1.default
                .indent(6)
                .yellow("[WARM] ")
                .outn("\"" + pluginName + "\" is already registered as a plugin.")
                .indent(3);
            return;
        }
    }
    try {
        require.resolve(pluginName);
    }
    catch (e) {
        Cli_1.default.yellow("  [WARM]").outn("\"" + pluginName + "\" does not exist as an npm module");
        let status = yield Cli_1.default.in("  so run the installation command. Is it OK? (y)");
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
            Cli_1.default.br().outn(".....Add PLugin Pause!");
            return;
        }
    }
    let status = yield Cli_1.default.br().in("Add plugin \"" + pluginName + "\" to the project so that it can be used. Is it OK? (y)");
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
        Cli_1.default.br().outn(".....Add PLugin Pause!");
        return;
    }
    const addPluginMethod = require("./add_plugin.js");
    yield addPluginMethod(pluginName);
});
