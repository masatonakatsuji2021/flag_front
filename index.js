const fs = require("fs");
const build = require("@flag/build");
const path = require("path");

module.exports = function(option){

    if(!option){
        option = {};
    }

    option.core = {
        Util: fs.readFileSync(__dirname + "/bin/Util.js").toString(),
        Ajax: fs.readFileSync(__dirname + "/bin/Ajax.js").toString(),
        Data: fs.readFileSync(__dirname + "/bin/Data.js").toString(),
        Dom: fs.readFileSync(__dirname + "/bin/Dom.js").toString(),
        Routes: fs.readFileSync(__dirname + "/bin/Routes.js").toString(),
        Controller: fs.readFileSync(__dirname + "/bin/Controller.js").toString(),
        Exception: fs.readFileSync(__dirname + "/bin/Exception.js").toString(),
        Form: fs.readFileSync(__dirname + "/bin/Form.js").toString(),
        Request: fs.readFileSync(__dirname + "/bin/Request.js").toString(),
        Response: fs.readFileSync(__dirname + "/bin/Response.js").toString(),
    };

    if(require.resolve("@flag/validate")){
        option.core.Validator = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/Validator.js").toString();
        option.core.ValidateRule = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/ValidateRule.js").toString();
        option.core.ValidateResponse = fs.readFileSync(path.dirname(require.resolve("@flag/validate")) + "/bin/ValidateResponse.js").toString();
    }
     
    option.contents = "rendering";

    option.Uncompressed = true;

    option.startCallback = async function(){

        window.addEventListener("load", function(){
            
            const Util = use("Util");
            const Data = use("Data");
            const Form = use("Form");
            const Routes = use("Routes");
            const Request = use("Request");
            const Response = use("Response");
    
            var routes = Routes.searchRoute();
            Response.rendering(routes);
    
            window.addEventListener("popstate", function(e){

                Request.clear();
                
                var url = location.hash.substring(1);

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

        });

    };

    build(option);

};