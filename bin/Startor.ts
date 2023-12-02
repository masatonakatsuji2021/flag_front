import Util from "Util";
import Data from "Data";
import Routes from "Routes";
import Response from "Response";

export default (async function(){

    window.addEventListener("load", async function(){

        window.addEventListener("popstate", (e) => {

            if(!Response.pageEnable){
                if(Data.__before_url){
                    history.pushState(null,null,Data.__before_url);
                }
                else{

                    history.pushState(null,null);
                }
                return false;
            }
            
            var url = location.hash.substring(1);

            Data.__before_url = location.hash;

            var routes = Routes.searchRoute(url);
            Response.rendering(routes);
        });

        const Config = use("app/config/app");

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