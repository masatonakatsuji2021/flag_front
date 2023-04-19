const cli = require("@flag/cli");

(async function(){

    cli.outn();

    cli.outn("FLAG - SPA Fontend Build")
        .outn()
    ;
    
    var args = cli.getArgs();

    if(args[0]){
        var cmd = args[0];
    }
    else{
        while(!cmd){
            var cmd = await cli.in("Prease Command");
            if(!cmd){
                cli.outn("[error] not input command. retry.");
            }
        }
    }
    cli.outn("--------------------------------------------------");

    if(cmd == "build"){

        cli.outn("SPA Build.");


    }
    else if(cmd == "create"){

        cli.outn("Create SPA Project.")
            .outn()
        ;

        while(!name){
            var name = cli.in("- Project Name");
            if(!name){
                cli.outn("[error] not input project name. retry.");
            }
        }


    }





})();