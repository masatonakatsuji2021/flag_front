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
const path = require("path");
const Cli_1 = require("@flagfw/flag/bin/Cli");
const deepCopy_1 = require("../common/deepCopy");
const build_1 = require("../build");
const child_process_1 = require("child_process");
function default_1(create) {
    return __awaiter(this, void 0, void 0, function* () {
        const padEnd = 22;
        Cli_1.default
            .indent(2)
            .br()
            .outn("* SPA Create-Project")
            .br();
        var directory = process.cwd();
        // mkdir project directory
        var rootPath = directory + "/" + create.name;
        Cli_1.default.greenn("# Create Start.");
        fs.mkdirSync(rootPath, {
            recursive: true,
        });
        Cli_1.default.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPath);
        var rootPathSrc = rootPath + "/src";
        fs.mkdirSync(rootPathSrc, {
            recursive: true,
        });
        Cli_1.default.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathSrc);
        // get template path
        const tempDir = path.dirname(path.dirname(__dirname)) + "/source";
        var templatePath = tempDir + "/default";
        if (create.typeScript) {
            fs.copyFileSync(tempDir + "/_ts/init.d.ts", rootPathSrc + "/init.d.ts");
            Cli_1.default.green("# ").outn("SourceCopy ".padEnd(padEnd) + "./" + create.name + "/init.d.ts");
            var tsConfig = require(tempDir + "/_ts/tsconfig.json");
            tsConfig.compilerOptions.paths["*"] = [path.dirname(require.resolve("@flagfw/front")) + "/bin/*"];
            fs.writeFileSync(rootPathSrc + "/tsconfig.json", JSON.stringify(tsConfig, null, "   "));
            Cli_1.default.green("# ").outn("SourceCopy ".padEnd(padEnd) + "./" + create.name + "/tsconfig.json");
            templatePath = tempDir + "/default_ts";
        }
        // template file copy
        (0, deepCopy_1.default)(templatePath, rootPathSrc, function (dir) {
            Cli_1.default.green("# ").outn("Mkdir ".padEnd(padEnd) + dir);
        }, function (outputFile) {
            Cli_1.default.green("# ").outn("SourceCopy ".padEnd(padEnd) + outputFile);
        });
        // other frameworks exists...
        if (create.frameworks) {
            var rootPathFw = rootPath + "/frameworks";
            fs.mkdirSync(rootPathFw, {
                recursive: true,
            });
            Cli_1.default.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathFw);
            if (create.frameworks.indexOf("cordova") > -1) {
                Cli_1.default.green("# ").outn("framework setting".padEnd(padEnd) + "[Cordova]");
                // case cordova...
                var rootPathCordova = rootPathFw + "/cordova";
                fs.mkdirSync(rootPathCordova, {
                    recursive: true,
                });
                Cli_1.default.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathCordova);
                Cli_1.default.green("# ").out("cordova create....");
                try {
                    (0, child_process_1.execSync)("cordova create " + rootPathCordova);
                }
                catch (error) {
                    Cli_1.default.red("NG!").br();
                    Cli_1.default.red("[Cordova Error]").outn(error);
                    return;
                }
                Cli_1.default.outn("OK");
            }
            else if (create.frameworks.indexOf("electron") > -1) {
                // case electron...
                var rootPathElectron = rootPathFw + "/electron";
                fs.mkdirSync(rootPathElectron, {
                    recursive: true,
                });
                Cli_1.default.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathElectron);
            }
        }
        // make package JSON 
        var packageJson = {
            flagFront: {
                name: create.name,
                frameworks: create.frameworks,
                typeScript: create.typeScript,
                compress: create.compress,
                obfuscate: create.obfuscate,
                sourceMap: create.soursemap,
            },
        };
        fs.writeFileSync(rootPath + "/package.json", JSON.stringify(packageJson, null, "   "));
        Cli_1.default.green("# ").outn("Make ".padEnd(padEnd) + "package.json");
        Cli_1.default.greenn("# Create Complete.").br();
        yield (0, build_1.default)({
            _any: [
                "build",
                create.name,
            ],
        }, {
            noExit: true,
        }, true);
        Cli_1.default
            .br()
            .green("...... Project Create and Build Complete!")
            .br();
    });
}
exports.default = default_1;
;
