import Util from "Util";
import Data from "Data";
import Form from "Form";
import Routes from "Routes";
import Request from "Request";
import Response from "Response";

export default (async function(){

    window.addEventListener("load", async function(){

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

            // @ts-ignore
            var targetId = e.target.id;

            var formBuffer = Util.searchForm(targetId);

            if(formBuffer){

                if(formBuffer.class == "Form"){
                    var tf = new Form(targetId);
                }
                else{
                    var className = Util.ucFirst(formBuffer.class) + "Form";
                    var classPath = "app/Form/" + className + ".js";
                    if(useExists(classPath)){
                        let t = use(classPath);
                        let tf = new t();
                    }
                    else{
                        let tf = new Form(targetId);
                    }
                }
                tf.submit();
            }

        });

        window.addEventListener("reset", function(e){

            // @ts-ignore
            var targetId = e.target.id;

            var formBuffer = Util.searchForm(targetId);

            if(formBuffer){

                if(formBuffer.class == "Form"){
                    var tf = new Form(targetId);
                }
                else{
                    var className = Util.ucFirst(formBuffer.class) + "Form";
                    var classPath = "app/Form/" + className + ".js";
                    if(useExists(classPath)){
                        let t = use(classPath);
                        let tf = new t();
                    }
                    else{
                        let tf = new Form(targetId);
                    }
                }
                tf.reset();
            }

        });

        window.addEventListener('change', function(e){

            // @ts-ignore
            var targetType = e.target.type;

            if(targetType != "file"){
                return;
            }

            // @ts-ignore
            var name = e.target.name;

            var buffers = [];
            var ind = 0;

            // @ts-ignore
            let files = e.target.files;
            for(var n = 0 ; n < files.length ; n++){
                var file = files[n];

                var buffer = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                };
                buffers.push(buffer);

                var file_reader = new FileReader();

                file_reader.addEventListener('load', function(e2) {

                    let result = e2.target.result;
                    // @ts-ignore
                    buffers[ind].result = Util.base64Encode(result);
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

})();