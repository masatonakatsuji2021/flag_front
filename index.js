const fs = require("fs");
const build = require("@flag/build");
const path = require("path");

module.exports = function(option){

    if(!option){
        option = {};
    }

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
    option.core.VDom = fs.readFileSync(__dirname + "/bin/VDom.js").toString();
    option.core.VDomControl = fs.readFileSync(__dirname + "/bin/VDomControl.js").toString();
    option.core.VDomStatic = fs.readFileSync(__dirname + "/bin/VDomStatic.js").toString();
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

    option.startCallback = async function(){

        window.addEventListener("load", async function(){
            
            const { Util, Data, Form, VDom, Routes, Request, Response } = uses([
                "Util",
                "Data",
                "Form",
                "VDom",
                "Routes",
                "Request",
                "Response",
            ]);

            window.addEventListener("popstate", function(e){

                if(!Response.setPageStatus()){
                    if(Data.__before_url){
                        history.pushState(null,null,Data.__before_url);
                    }
                    else{

                        history.pushState(null,null);
                    }
                    return false;
                }

                Request.clear();
                VDom().refresh();
                
                var url = location.hash.substring(1);

                Data.__before_url = location.hash;

                var routes = Routes.searchRoute(url);
                Response.rendering(routes);
            });
    
            window.addEventListener("submit", function(e){

                e.stopPropagation();
                e.preventDefault();

                var formBuffer = Util.searchForm(e.target.id);

                if(formBuffer){

                    if(formBuffer.class == "Form"){
                        var tf = new Form(e.target.id);
                    }
                    else{
                        var className = Util.ucFirst(formBuffer.class) + "Form";
                        var classPath = "app/Form/" + className + ".js";
                        if(useExists(classPath)){
                            var t = use(classPath);
                            var tf = new t();
                        }
                        else{
                            var tf = new Form(e.target.id);
                        }
                    }
                    tf.submit();
                }

            });
    
            window.addEventListener("reset", function(e){

                var formBuffer = Util.searchForm(e.target.id);

                if(formBuffer){

                    if(formBuffer.class == "Form"){
                        var tf = new Form(e.target.id);
                    }
                    else{
                        var className = Util.ucFirst(formBuffer.class) + "Form";
                        var classPath = "app/Form/" + className + ".js";
                        if(useExists(classPath)){
                            var t = use(classPath);
                            var tf = new t();
                        }
                        else{
                            var tf = new Form(e.target.id);
                        }
                    }
                    tf.reset();
                }

            });
    
            window.addEventListener('change', function(e){
    
                if(e.target.type != "file"){
                    return;
                }
    
                var name = e.target.name;

                var buffers = [];
                var ind = 0;
                for(var n = 0 ; n < e.target.files.length ; n++){
                    var file = e.target.files[n];
    
                    var buffer = {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                    };
                    buffers.push(buffer);
    
                    var file_reader = new FileReader();
    
                    file_reader.addEventListener('load', function(e2) {
                        buffers[ind].result = Util.base64Encode(e2.target.result);
                        ind++;
                    });
    
                    file_reader.readAsText(file);
                }
    
                Request.__file_uploads[name].push(buffers);
            });

            if(useExists(PATH_BACKGROUND + "/Background.js")){
                const Background = use(PATH_BACKGROUND + "/Background.js");
                const bg = new Background();
                await bg.handle();
            }

            var routes = Routes.searchRoute();
            Response.rendering(routes);
        });

    };

    build(option);

};