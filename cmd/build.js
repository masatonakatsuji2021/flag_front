const fs = require("fs");
const cli = require("@flag/cli");
const build = require("@flag/build");
const path = require("path");
const Startor = fs.readFileSync(path.dirname(__dirname) + "/bin/Startor.js").toString();

module.exports = function(args){

    __dirname = path.dirname(__dirname);

    var projectName = args._any[1];

    if(!projectName){
        cli.red("[ERROR]").outn("package name not found.");
        return;
    }

    try{
        packageJson = require(process.cwd() + "/package.json");
    }catch(error){
        cli.red("[ERROR]").outn("Package.json not found. ")
        return;
    }

    if(!packageJson.flagFront){
        cli.red("[ERROR]").outn("Option information of \"flatFront\" is not set in \"package.json\".");
        return;
    }

    var option = null;

    for(var n = 0 ; n < packageJson.flagFront.length ; n++){
        var buff = packageJson.flagFront[n];
        if(buff.name == projectName){
            option = buff;
            break;
        }
    }

    if(!option){
        cli.red("[ERROR]").outn("Project information \"" + projectName + "\" is not set in \"flatFront\" of \"package.json\".");
        return;
    }

    cli
        .indent(2)
        .outn()
        .outn("=== Flag Front Build ========================")
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
    /*
    option.core.Ajax = fs.readFileSync(__dirname + "/bin/Ajax.ts").toString();
    */
    option.core.Dom = fs.readFileSync(__dirname + "/bin/Dom.js").toString();
    option.core.DomControl = fs.readFileSync(__dirname + "/bin/DomControl.js").toString();
    option.core.DomStatic = fs.readFileSync(__dirname + "/bin/DomStatic.js").toString();
    /*
    option.core.VDom = fs.readFileSync(__dirname + "/bin/VDom.ts").toString();
    /*
    option.core.VDomControl = fs.readFileSync(__dirname + "/bin/VDomControl.js").toString();
    option.core.VDomStatic = fs.readFileSync(__dirname + "/bin/VDomStatic.js").toString();
    */
    option.core.Routes = fs.readFileSync(__dirname + "/bin/Routes.js").toString();
    option.core.Controller = fs.readFileSync(__dirname + "/bin/Controller.js").toString();
    option.core.Exception = fs.readFileSync(__dirname + "/bin/Exception.js").toString();
/*
    option.core.Background = fs.readFileSync(__dirname + "/bin/Background.ts").toString();
    */
    option.core.Form = fs.readFileSync(__dirname + "/bin/Form.js").toString();
    option.core.Request = fs.readFileSync(__dirname + "/bin/Request.js").toString();
    option.core.Response = fs.readFileSync(__dirname + "/bin/Response.js").toString();
/*
    option.core.LocalStorage = fs.readFileSync(__dirname + "/bin/LocalStorage.ts").toString();
    option.core.SessionStorage = fs.readFileSync(__dirname + "/bin/SessionStorage.ts").toString();
    option.core.Dialog = fs.readFileSync(__dirname + "/bin/Dialog.ts").toString();

    option.coreHtml.ExceptionHtml = fs.readFileSync(__dirname + "/bin/Exception.html").toString();
    option.coreHtml.DialogHtml = fs.readFileSync(__dirname + "/bin/Dialog.html").toString();

    if(require.resolve("@flag/validate")){
        option.core.Validator = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/Validator.ts").toString();
        option.core.ValidateRule = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/ValidateRule.ts").toString();
        option.core.ValidateResponse = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/ValidateResponse.ts").toString();
    }
  */   
     
    option.contents = "rendering";

    if(option.uncompressed == undefined){
        option.uncompressed = false;
    }

    option.startCallback = "function(){\nlet exports = {} ;\n" + Startor + "}";

    build(option);

};