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
const fs = require("fs");
const FlagCli = require("@flagfw/flag/bin/Cli");
const { execSync } = require("child_process");
exports.default = (args) => __awaiter(void 0, void 0, void 0, function* () {
    FlagCli.outn("* add platform");
    var platform = args._any[1];
    FlagCli.outn("* Platform : " + platform);
    if (!fs.existsSync(process.cwd() + "/platforms")) {
        fs.mkdirSync(process.cwd() + "/platforms", {
            recursive: true,
        });
    }
    if (platform == "cordova") {
        // create cordova project..
        FlagCli.green("#").outn("cordova setting");
        let res = execSync("cordova create platforms/cordova", { cwd: process.cwd() });
        FlagCli.outn("#" + res.toString());
        var packageJson = require(process.cwd() + "/package.json");
        if (!packageJson.flagFront.platform) {
            packageJson.flagFront.platform = [];
        }
        if (packageJson.flagFront.platform.indexOf("cordova") === -1) {
            packageJson.flagFront.platform.push("cordova");
        }
        fs.writeFileSync(process.cwd() + "/package.json", JSON.stringify(packageJson, null, "    "));
    }
    else if (platform == "electron") {
        if (!packageJson.flagFront.platform) {
            packageJson.flagFront.platform = [];
        }
        packageJson.flagFront.platform.push("electron");
        if (packageJson.flagFront.platform.indexOf("electron") === -1) {
            packageJson.flagFront.platform.push("electron");
        }
        fs.writeFileSync(process.cwd() + "/package.json", JSON.stringify(packageJson, null, "    "));
    }
    else {
        FlagCli.red("[ERROR]").outn("\"" + platform + "\" is not found platform.");
    }
});
