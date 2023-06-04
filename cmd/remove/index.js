const cli = require("@flagfw/cli");
const path = require("path");

module.exports = async function(args){

    
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
        cli.red("[ERROR]").outn("Option information of \"flagFront\" is not set in \"package.json\".");
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
        cli.red("[ERROR]").outn("Project information \"" + projectName + "\" is not set in \"flagFront\" of \"package.json\".");
        return;
    }

    cli
        .outn("Delete project \"" + projectName + "\".")
        .outn()
        .outn()
    ;

    var judge = await cli.in("Are you really sure? [y]");

    if(!judge){
        judge = "y";
    }

    if(judge.toLowerCase() == "y"){


    }

    cli
        .outn()
        .outn()
        .green("..... Remove Project!")
    ;

};