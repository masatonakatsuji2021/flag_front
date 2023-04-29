module.exports = async function(){

    window.addEventListener("load", async function(){
        
        const { Util, Data, Form, VDom, Routes, Request, Response } = uses([
            "Util",
            "Data",
            "Form",
            // "VDom",
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
            // VDom().refresh();
            
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