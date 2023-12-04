import * as fs from "fs";
import * as path from "path";
import FlagCLI from "@flagfw/flag/bin/Cli";
import deepCopy from "../common/deepCopy";
import build from "../build";
import { execSync } from "child_process";

export default async function(create){

    const padEnd = 22;

    FlagCLI
        .indent(2)
        .br()
        .outn("* SPA Create-Project")
        .br()

    var directory = process.cwd();

    // mkdir project directory
    var rootPath = directory + "/" + create.name;

    FlagCLI.greenn("# Create Start.");
   
    fs.mkdirSync(rootPath, {
        recursive: true,
    });
    FlagCLI.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPath);

    var rootPathSrc = rootPath + "/src";

    fs.mkdirSync(rootPathSrc, {
        recursive: true,
    });
    FlagCLI.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathSrc);

    // get template path
    const tempDir = path.dirname(path.dirname(__dirname)) + "/source";

    var templatePath = tempDir + "/default";

    if(create.typeScript){
        fs.copyFileSync(tempDir + "/_ts/init.d.ts", rootPathSrc + "/init.d.ts");
        FlagCLI.green("# ").outn("SourceCopy ".padEnd(padEnd) + "./" + create.name + "/init.d.ts");

        var tsConfig = require(tempDir + "/_ts/tsconfig.json");

        tsConfig.compilerOptions.paths["*"] = [ path.dirname(require.resolve("@flagfw/front")) + "/bin/*" ];
        fs.writeFileSync(rootPathSrc + "/tsconfig.json", JSON.stringify(tsConfig, null, "   "));
        FlagCLI.green("# ").outn("SourceCopy ".padEnd(padEnd) + "./" + create.name + "/tsconfig.json");

        templatePath = tempDir + "/default_ts";
    }

    // template file copy
    deepCopy(templatePath, rootPathSrc, function(dir){
        FlagCLI.green("# ").outn("Mkdir ".padEnd(padEnd) + dir);
    },
    function(outputFile){
        FlagCLI.green("# ").outn("SourceCopy ".padEnd(padEnd) + outputFile);
    });

    // other frameworks exists...
    if(create.frameworks){

        var rootPathFw = rootPath + "/frameworks";
        fs.mkdirSync(rootPathFw, {
            recursive: true,
        });
        FlagCLI.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathFw);

        if(create.frameworks.indexOf("cordova") > -1){

            FlagCLI.green("# ").outn("framework setting".padEnd(padEnd) + "[Cordova]");

            // case cordova...
            var rootPathCordova = rootPathFw + "/cordova";
            fs.mkdirSync(rootPathCordova, {
                recursive: true,
            });

            FlagCLI.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathCordova);

            FlagCLI.green("# ").out("cordova create....");
            try{
                execSync("cordova create " + rootPathCordova);
            }catch(error){
                FlagCLI.red("NG!").br();
                FlagCLI.red("[Cordova Error]").outn(error);
                return;
            }

            FlagCLI.outn("OK");
        }
        else if(create.frameworks.indexOf("electron") > -1){

            // case electron...
            var rootPathElectron = rootPathFw + "/electron";
            fs.mkdirSync(rootPathElectron, {
                recursive: true,
            });
            FlagCLI.green("# ").outn("Mkdir ".padEnd(padEnd) + rootPathElectron);

        }
    }
   
    // make package JSON 
    var packageJson ={
        flagFront :{
            name: create.name,
            frameworks: create.frameworks,
            typeScript: create.typeScript,
            compress: create.compress,
            obfuscate: create.obfuscate,
            sourceMap: create.soursemap,
        },
    };

    fs.writeFileSync(rootPath + "/package.json", JSON.stringify(packageJson, null, "   "));
    FlagCLI.green("# ").outn("Make ".padEnd(padEnd) + "package.json");

    FlagCLI.greenn("# Create Complete.").br();

    await build({
        _any: [
            "build",
            create.name,
        ],
    },{
        noExit: true,
    }, true);

    FlagCLI
        .br()
        .green("...... Project Create and Build Complete!")
        .br()
    ;
};