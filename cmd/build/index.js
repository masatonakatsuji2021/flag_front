const fs = require("fs");
const cli = require("@flagfw/cli");
const build = require("@flagfw/build");
const path = require("path");
const deepCopy = require("../deepCopy.js");

__dirname = path.dirname(path.dirname(__dirname));

const Startor = fs.readFileSync(__dirname + "/dist/Startor.js").toString();

const getLib = function(libName){
    return fs.readFileSync(__dirname + "/dist/" + libName + ".js").toString();
};

const builds = (framework, option, rootPath) => {

    cli.green("#").outn("build framework = " + framework);

    option.rootPath = rootPath + "/src";
    option.appPath = option.rootPath + "/app";
    option.renderingPath = option.rootPath + "/rendering";
    option.commonPath = option.rootPath + "/common";

    option.buildPath = rootPath + "/frameworks/" + framework;
    if(framework != "web"){
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

    if(option.const.PATH_APP == undefined){
        option.const.PATH_APP = "app";
    }
    if(option.const.PATH_CONFIG == undefined){
        option.const.PATH_CONFIG = option.const.PATH_APP + "/config";
    }
    if(option.const.PATH_CONTROLLER == undefined){
        option.const.PATH_CONTROLLER = option.const.PATH_APP + "/Controller";
    }
    if(option.const.PATH_FORM == undefined){
        option.const.PATH_FORM = option.const.PATH_APP + "/Form";
    }
    if(option.const.PATH_VALIDATOR == undefined){
        option.const.PATH_VALIDATOR = option.const.PATH_APP + "/VALIDATOR";
    }
    if(option.const.PATH_EXCEPTION == undefined){
        option.const.PATH_EXCEPTION = option.const.PATH_APP + "/Exception";
    }
    if(option.const.PATH_BACKGROUND == undefined){
        option.const.PATH_BACKGROUND = option.const.PATH_APP + "/Background";
    }
    if(option.const.PATH_RENDERING == undefined){
        option.const.PATH_RENDERING = "rendering";
    }
    if(option.const.PATH_VIEW == undefined){
        option.const.PATH_VIEW = option.const.PATH_RENDERING + "/View";
    }
    if(option.const.PATH_TEMPLATE == undefined){
        option.const.PATH_TEMPLATE = option.const.PATH_RENDERING + "/Template";
    }
    if(option.const.PATH_VIEWPART == undefined){
        option.const.PATH_VIEWPART = option.const.PATH_RENDERING + "/ViewPart";
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
    option.core.Background = getLib("Background");
    option.core.Form = getLib("Form");
    option.core.Request = getLib("Request");
    option.core.Response = getLib("Response");
    option.core.LocalStorage = getLib("LocalStorage");
    option.core.SessionStorage = getLib("SessionStorage");
    option.core.Dialog = getLib("Dialog");
    option.core.Crypto = getLib("Crypto");
    option.core.Socket = getLib("Socket");
    option.core.KeyEvent = getLib("KeyEvent");

    option.coreHtml.ExceptionHtml = fs.readFileSync(__dirname + "/bin/Exception.html").toString();
    option.coreHtml.DialogHtml = fs.readFileSync(__dirname + "/bin/Dialog.html").toString();

    if(require.resolve("@flagfw/validate")){
        option.core.Validator = fs.readFileSync(path.dirname(require.resolve("@flagfw/validate")) + "/bin/Validator.js").toString();
        option.core.ValidateRule = fs.readFileSync(path.dirname(require.resolve("@flagfw/validate")) + "/bin/ValidateRule.js").toString();
        option.core.ValidateResponse = fs.readFileSync(path.dirname(require.resolve("@flagfw/validate")) + "/bin/ValidateResponse.js").toString();
    }

    // plugin loadset...
    if(option.plugin){
        for(var n = 0 ; n < option.plugin.length ; n++){
            var plugin = option.plugin[n];

            if(plugin.indexOf("@flagfw/plugin-") > -1){
                var pluginName = plugin.substring("@flagfw/plugin-".length);
            }
            else{
                var pluginName = plugin;
            }

            var pluginClassList = fs.readdirSync(path.dirname(require.resolve(plugin)) + "/dist/");
            for(var n2 = 0 ; n2 < pluginClassList.length ; n2++){
                var p_ = path.dirname(require.resolve(plugin)) + "/dist/" + pluginClassList[n2];

                if(fs.statSync(p_).isDirectory()){
                    continue;
                }

                if(path.extname(p_) == ".js"){
                    option.core["plugin-" + pluginName + "/" + path.basename(p_).split(".js").join("")] = fs.readFileSync(p_).toString();
                }
                else if(path.extname(p_) == ".html"){
                    option.coreHtml["plugin-" + pluginName + "/" + path.basename(p_).split(".html").join("") + "HTML"] = fs.readFileSync(p_).toString();
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

module.exports = async function(args, cliOption){

    if(!cliOption){
        cliOption = {};
    }
     
    var rootPath = process.cwd();
    if(args._any[1]){
        rootPath += "/" + args._any[1];
    }
    var packageJsonPath = rootPath + "/package.json";
    
    try{
        var packageJson = require(packageJsonPath);
    }catch(error){
        cli.red("[ERROR]").outn("Package.json not found. ")
        return;
    }

    if(!packageJson.flagFront){
        cli.red("[ERROR]").outn("Option information of \"flagFront\" is not set in \"package.json\".");
        return;
    }

    var option = packageJson.flagFront;

    if(!option){
        cli.red("[ERROR]").outn("Project information is not set in \"flagFront\" of \"package.json\".");
        return;
    }

    if(!option.frameworks){
        option.frameworks = [];
    }

    if(option.frameworks.indexOf("web") === -1){
        option.frameworks.push("web");
    }
        
    for(let n = 0 ; n < option.frameworks.length ; n++){
        const framework = option.frameworks[n];

        var buildPath = rootPath + "/frameworks/" + framework + "/www";

        fs.rmdirSync(buildPath, {
            recursive: true,
        });

        builds(framework, option, rootPath);
    }

    if(!cliOption.noExit){
        cli
            .outn()
            .green("...... Project Build Complete!")
            .outn()
        ;
    }
};