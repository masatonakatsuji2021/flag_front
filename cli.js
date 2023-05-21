const fs = require("fs");
const cli = require("@flag/cli");

(async function(){

    cli
        .outn()
        .outn("* FLAG - SPA Fontend Applicaiton Console")
        .outn()
    ;

    var args = cli.getArgsOption();

    if(args._any[0] == "init"){
        const inits = require("./cmd/init");
        await inits(args);
    }
    else if(args._any[0] == "add_plugin"){
        const add_plugin = require("./cmd/add_plugin/");
        await add_plugin(args);
    }
    else if(args._any[0] == "add_framework"){
        const add_framework = require("./cmd/add_framework/");
        await add_framework(args);
    }
    else if(args._any[0] == "build"){
        const build = require("./cmd/build");
        await build(args);
    }
    else if(args._any[0] == "remove"){
        const remove = require("./cmd/remove");
        await remove(args);
    }
    else{
        const info = require("./cmd/info");
        info();
    }

})();