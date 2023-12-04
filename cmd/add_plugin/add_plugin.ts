import FlagCLI from "@flagfw/flag/bin/Cli";
import * as fs from "fs";
import * as path from "path";

const { execSync } = require("child_process");

export default async (pluginName) => {

    FlagCLI.br();

    let exists = false;
    try{
        require.resolve(pluginName);
        exists = true;
    }catch(err){}

    if(!exists){
        FlagCLI.green("#").outn(" npm plugin package install..")
        try{
            execSync("npm i " + pluginName);
        }catch(error){
            FlagCLI.outn(error);
            return;
        }
    }

    let pluginPath = path.dirname(require.resolve(pluginName));

    var directory = process.cwd();

    let packages = require(directory + "/package.json");

    if(!packages.flagFront.plugin){
        packages.flagFront.plugin = [];
    }

    packages.flagFront.plugin.push(pluginName);

    fs.writeFileSync(directory + "/package.json", JSON.stringify(packages, null, "   "));

    FlagCLI.green("#").outn("rewrite package.json");

    // add tsconfig.json
    if(packages.flagFront.typeScript){
        let tsConfig = require(directory + "/src/tsconfig.json");

        if(!tsConfig.compilerOptions.paths){
            tsConfig.compilerOptions.paths = {};
        }

        let pluginNameShort = pluginName.replace("@flagfw/front-","");

        tsConfig.compilerOptions.paths[pluginNameShort] = [ pluginPath + "/bin/index.ts" ];
        tsConfig.compilerOptions.paths[pluginNameShort + "/*"] = [ pluginPath + "/bin/*" ];

        fs.writeFileSync(directory + "/src/tsconfig.json", JSON.stringify(tsConfig, null, "   "));
        FlagCLI.green("#").outn(" rewrite tsconfig.json");
    }

    FlagCLI.indent(0).br().green("....add plugin complete.").br();

};