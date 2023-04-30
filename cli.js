const fs = require("fs");
const cli = require("@flag/cli");

(async function(){

    cli
        .outn()
        .outn("=== FLAG - SPA Fontend Applicaiton Console ==================")
        .outn()
    ;

    var args = cli.getArgsOption();

    if(args._any[0] == "create"){

        const create = require("./cmd/create.js");
        var juge = await create(args);

        if(!juge){
            return;
        }

        const build = require("./cmd/build.js");
        await build(args);
    }
    else if(args._any[0] == "build"){
        const build = require("./cmd/build.js");
        await build(args);
    }
    else if(args._any[0] == "remove"){
        const remove = require("./cmd/remove.js");
        await remove(args);
    }
    else{
        const info = require("./cmd/info.js");
        info();
    }

})();