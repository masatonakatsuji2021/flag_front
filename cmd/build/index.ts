import * as fs from "fs";
import * as path from "path";
import FlagCLI from "@flagfw/flag/bin/Cli";
import aa from "../aa";
import build from "@flagfw/build";

__dirname = path.dirname(path.dirname(__dirname));

const Startor = fs.readFileSync(__dirname + "/bin/Startor.js").toString();

const getLib = function(libName){
    return fs.readFileSync(__dirname + "/bin/" + libName + ".js").toString();
};

const builds = (framework, option, rootPath) => {

    option.rootPath = rootPath + "/src";
    option.appPath = option.rootPath + "/app";
    option.renderingPath = option.rootPath + "/rendering";
    option.commonPath = option.rootPath + "/common";
    option.framework = framework;
    option.buildPath = rootPath + "/frameworks/" + framework;
    if(
        framework =="cordova" || 
        framework == "electron"
    ){
        option.buildPath += "/www";
    }

    if(option.typeScript){
        try{
            var tsConfigJSon = require(option.rootPath + "/tsconfig.json");

            if(tsConfigJSon.compilerOptions.outDir){
                option.appPathTsComplied = option.rootPath + "/" + tsConfigJSon.compilerOptions.outDir;
            }

        }catch(error){
            console.log(error);
            return;
        }            
    }

    if(!option.const){
        option.const = {};
    }

    option.const.framework = framework;

    if(option.const.PATH_BACKGROUND == undefined){
        option.const.PATH_BACKGROUND = "app/Background";
    }

    if(!option.core){
        option.core = {};
    }
    if(!option.coreHtml){
        option.coreHtml = {};
    }

    option.core.Util = getLib("Util");
    option.core.FgDateTime = getLib("FgDateTime");
    option.core.Data = getLib("Data");
    option.core.Ajax = getLib("Ajax");
    option.core.Dom = getLib("Dom");
    option.core.DomControl = getLib("DomControl");
    option.core.DomStatic = getLib("DomStatic");
    option.core.VDom = getLib("VDom");
    option.core.VDomControl = getLib("VDomControl");
    option.core.Routes = getLib("Routes");
    option.core.Controller = getLib("Controller");
    option.core.Exception = getLib("Exception");
    option.core.View = getLib("View");
    option.core.ViewPart = getLib("ViewPart");
    option.core.Template = getLib("Template");
    option.core.Background = getLib("Background");
    option.core.Response = getLib("Response");
    /*
    option.core.Crypto = getLib("Crypto");
    option.core.Socket = getLib("Socket");
    option.core.KeyEvent = getLib("KeyEvent");
    */

    option.coreHtml.ExceptionHtml = fs.readFileSync(__dirname + "/bin/Exception.html").toString();

    // plugin loadset...
    if(option.plugin){
        for(var n = 0 ; n < option.plugin.length ; n++){
            var plugin = option.plugin[n];

            if(plugin.indexOf("@flagfw/front-plugin-") > -1){
                var pluginName = plugin.substring("@flagfw/front-plugin-".length);
            }
            else{
                var pluginName = plugin;
            }

            var pluginClassList = fs.readdirSync(path.dirname(require.resolve(plugin)) + "/bin/");
            for(var n2 = 0 ; n2 < pluginClassList.length ; n2++){
                var p_ = path.dirname(require.resolve(plugin)) + "/bin/" + pluginClassList[n2];

                if(fs.statSync(p_).isDirectory()){
                    continue;
                }

                if(path.extname(p_) == ".js"){
                    if(path.basename(p_).split(".js").join("") == "index"){
                        option.core["plugin-" + pluginName] = fs.readFileSync(p_).toString();
                    }
                    else{
                        option.core["plugin-" + pluginName + "/" + path.basename(p_).split(".js").join("")] = fs.readFileSync(p_).toString();
                    }
                }
                else if(path.extname(p_) == ".html"){
                    option.coreHtml["plugin-" + pluginName + "/" + path.basename(p_)] = fs.readFileSync(p_).toString();
                }
            }

        }
    }

    if(option.compress == undefined){
        option.compress = false;
    }

    option.startCallback = "function(){\nlet exports = {} ;\n" + Startor + "}";

    build(option,{
        noExit: true,
    });

};

export default async (args : Object, cliOption? : Object, seconded? : boolean) => {

    if(!seconded){
        aa();
    }

    FlagCLI.greenn("# Build begin...");

    if(!cliOption){
        cliOption = {};
    }
     
    var rootPath = process.cwd();
    if(args["_any"][1]){
        rootPath += "/" + args["_any"][1];
    }
    var packageJsonPath = rootPath + "/package.json";
    
    try{
        var packageJson = require(packageJsonPath);
    }catch(error){
        FlagCLI.red("[ERROR]").outn("Package.json not found. ")
        return;
    }

    if(!packageJson.flagFront){
        FlagCLI.red("[ERROR]").outn("Option information of \"flagFront\" is not set in \"package.json\".");
        return;
    }

    var option = packageJson.flagFront;

    if(!option){
        FlagCLI.red("[ERROR]").outn("Project information is not set in \"flagFront\" of \"package.json\".");
        return;
    }

    if(!option.frameworks){
        option.frameworks = [];
    }
        
    for(let n = 0 ; n < option.frameworks.length ; n++){
        const framework = option.frameworks[n];

        var buildPath = rootPath + "/frameworks/" + framework + "/www";

        fs.rmSync(buildPath, {
            recursive: true,
            force: true,
        });

        builds(framework, option, rootPath);

        FlagCLI.br();
    }

    FlagCLI.greenn("# ....Build Complete!");
};