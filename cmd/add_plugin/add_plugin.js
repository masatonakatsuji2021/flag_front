const cli = require("@flagfw/cli");
const fs = require("fs");
const path = require("path");

const { execSync } = require("child_process");

module.exports = async (pluginName)=>{

    cli.outn();

    let exists = false;
    try{
        require.resolve(pluginName);
        exists = true;
    }catch(err){}

    if(!exists){
        cli.green("#").outn(" npm plugin package install..")
        try{
            execSync("npm i " + pluginName);
        }catch(error){
            cli.outn(error);
            return;
        }
    }

    let pluginPath = path.dirname(require.resolve(pluginName));

    var directory = process.cwd();

    let package = require(directory + "/package.json");

    if(!package.flagFront.plugin){
        package.flagFront.plugin = [];
    }

    package.flagFront.plugin.push(pluginName);

    fs.writeFileSync(directory + "/package.json", JSON.stringify(package, null, "   "));

    cli.green("#").outn("rewrite package.json");

    // add tsconfig.json
    if(package.flagFront.typeScript){
        let tsConfig = require(directory + "/src/tsconfig.json");

        if(!tsConfig.compilerOptions.paths){
            tsConfig.compilerOptions.paths = {};
        }

        let pluginNameShort = pluginName.replace("@flagfw/front-","");

        tsConfig.compilerOptions.paths[pluginNameShort] = [ pluginPath + "/bin/index.ts" ];
        tsConfig.compilerOptions.paths[pluginNameShort + "/*"] = [ pluginPath + "/bin/*" ];

        fs.writeFileSync(directory + "/src/tsconfig.json", JSON.stringify(tsConfig, null, "   "));
        cli.green("#").outn(" rewrite tsconfig.json");
    }

    cli.indent(0).outn().green("....add plugin complete.").outn();

};