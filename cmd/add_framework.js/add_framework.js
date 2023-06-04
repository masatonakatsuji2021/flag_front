const fs = require("fs");
const cli = require("@flagfw/cli");
const build = require("@flagfw/build");
const path = require("path");
const { execSync } = require("child_process");

module.exports = async function(args){

    cli.outn("* add platform");

    var platform = args._any[1];

    cli.outn("* Platform : " + platform);


    if(!fs.existsSync(process.cwd() + "/platforms")){
        fs.mkdirSync(process.cwd() + "/platforms",{
            recursive: true,
        });
    }

    if(platform == "cordova"){
       // create cordova project..
       cli.green("#").outn("cordova setting");
       res = execSync("cordova create platforms/cordova", {cwd: process.cwd()});
       cli.outn("#" + res.toString());

        var packageJson = require(process.cwd() + "/package.json");

        if(!packageJson.flagFront.platform){
            packageJson.flagFront.platform = [];
        }

        if(packageJson.flagFront.platform.indexOf("cordova") === -1){
            packageJson.flagFront.platform.push("cordova");
        }

        fs.writeFileSync(process.cwd() + "/package.json", JSON.stringify(packageJson, null, "    "));
    }
    else if(platform == "electron"){

        if(!packageJson.flagFront.platform){
            packageJson.flagFront.platform = [];
        }
        
        packageJson.flagFront.platform.push("electron");

        if(packageJson.flagFront.platform.indexOf("electron") === -1){
            packageJson.flagFront.platform.push("electron");
        }

        fs.writeFileSync(process.cwd() + "/package.json", JSON.stringify(packageJson, null, "    "));
    }
    else{
        cli.red("[ERROR]").outn("\"" + platform + "\" is not found platform.");
    }

};