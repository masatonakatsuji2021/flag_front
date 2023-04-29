const fs = require("fs");
const cli = require("@flag/cli");
const build = require("@flag/build");
const path = require("path");
const Startor = require("./bin/Startor.js");

module.exports = function(option){

    var args = process.argv;
    if(args.length == 0){
        var projectName = "default";
    }
    else{
        var projectName = args[0];
    }

    if(!option){
        option = {};
    }

    try{
        var json = require(process.cwd() + "/package.json");
        if(json.flagFront){
            var package = null;
            for(var n = 0 ; n < json.flagFront.length ; n++){
                var j = json.flagFront[n];

                if(j.name == projectName){
                    package = j;
                    break;
                }
            }

            if(package){
                option = package;
            }
        }
    }catch(error){}

    if(!option.name){
        option.name = "default";
    }

    if(!option.rootPath){
        option.rootPath = "./src";
    }

    if(!option.buildPath){
        option.buildPath = "./__build";
    }

    cli
        .indent(2)
        .outn()
        .outn("=== Flag Front Builder ========================")
        .outn()
        .outn("Package".padEnd(20) + "= " + ((option.name) ? option.name : ""))
        .outn("rootPath".padEnd(20) + "= " + ((option.rootPath) ? option.rootPath : ""))
        .outn("buildPath".padEnd(20) + "= " + ((option.buildPath) ? option.buildPath : ""))
        .outn("typeScript".padEnd(20) + "= " + ((option.typeScript) ? option.typeScript : ""))
        .outn("uncompressed".padEnd(20) + "= " + ((option.uncompressed) ? option.uncompressed : ""))
        .outn("sourceMap".padEnd(20) + "= " + ((option.sourceMap) ? option.sourceMap : ""))
        .outn()
    ;

    if(!option.const){
        option.const = {};
    }

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

    option.core.Util = fs.readFileSync(__dirname + "/bin/Util.js").toString();
    option.core.Data = fs.readFileSync(__dirname + "/bin/Data.js").toString();
    option.core.Ajax = fs.readFileSync(__dirname + "/bin/Ajax.js").toString();
    option.core.Dom = fs.readFileSync(__dirname + "/bin/Dom.js").toString();
    option.core.DomControl = fs.readFileSync(__dirname + "/bin/DomControl.js").toString();
    option.core.DomStatic = fs.readFileSync(__dirname + "/bin/DomStatic.js").toString();
    /*
    option.core.VDom = fs.readFileSync(__dirname + "/bin/VDom.js").toString();
    option.core.VDomControl = fs.readFileSync(__dirname + "/bin/VDomControl.js").toString();
    option.core.VDomStatic = fs.readFileSync(__dirname + "/bin/VDomStatic.js").toString();
    */
    option.core.Routes = fs.readFileSync(__dirname + "/bin/Routes.js").toString();
    option.core.Controller = fs.readFileSync(__dirname + "/bin/Controller.js").toString();
    option.core.Exception = fs.readFileSync(__dirname + "/bin/Exception.js").toString();

    option.core.Background = fs.readFileSync(__dirname + "/bin/Background.js").toString();
    option.core.Form = fs.readFileSync(__dirname + "/bin/Form.js").toString();
    option.core.Request = fs.readFileSync(__dirname + "/bin/Request.js").toString();
    option.core.Response = fs.readFileSync(__dirname + "/bin/Response.js").toString();
    option.core.LocalStorage = fs.readFileSync(__dirname + "/bin/LocalStorage.js").toString();
    option.core.SessionStorage = fs.readFileSync(__dirname + "/bin/SessionStorage.js").toString();
    option.core.Dialog = fs.readFileSync(__dirname + "/bin/Dialog.js").toString();

    option.coreHtml.ExceptionHtml = fs.readFileSync(__dirname + "/bin/Exception.html").toString();
    option.coreHtml.DialogHtml = fs.readFileSync(__dirname + "/bin/Dialog.html").toString();

    if(require.resolve("@flag/validate")){
        option.core.Validator = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/Validator.js").toString();
        option.core.ValidateRule = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/ValidateRule.js").toString();
        option.core.ValidateResponse = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/ValidateResponse.js").toString();
    }
     
    option.contents = "rendering";

    if(option.uncompressed == undefined){
        option.uncompressed = false;
    }

    option.startCallback = Startor;

    build(option);

};