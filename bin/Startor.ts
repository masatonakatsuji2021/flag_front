import Util from "Util";
import Data from "Data";
import Form from "Form";
import Routes from "Routes";
import Request from "Request";
import Response from "Response";
import VDomControl from "VDomControl";
// @ts-ignore
import Config from "app/config/app";

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

            let vd = new VDomControl([e.target]);

            var targetRef = vd.ref;

            var formBuffer = Util.searchForm(targetRef);

            if(formBuffer){
                formBuffer.submit();
            }

        });

        window.addEventListener("reset", function(e){

            // @ts-ignore
            var targetId = e.target.id;

            var formBuffer = Util.searchForm(targetId);

            if(formBuffer){
                formBuffer.reset();
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

        // background class method load.
        if(Config.backgrounds){
            for(let n = 0 ; n < Config.backgrounds.length ; n++){
                let bgPath = PATH_BACKGROUND + "/" + Util.ucFirst(Config.backgrounds[n]);
                if(useExists(bgPath)){
                    const bg = use(bgPath);
                    await bg.handleBegin();
                }
            }
        }

        var routes = Routes.searchRoute();
        Response.rendering(routes);
    });

})();