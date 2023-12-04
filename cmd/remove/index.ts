import FlagCLI from "@flagfw/flag/bin/Cli";
import * as path from "path";

export default async (args) => {

    __dirname = path.dirname(__dirname);

    var projectName = args._any[1];

    if(!projectName){
        FlagCLI.red("[ERROR]").outn("package name not found.");
        return;
    }

    let packageJson;
    try{
        packageJson = require(process.cwd() + "/package.json");
    }catch(error){
        FlagCLI.red("[ERROR]").outn("Package.json not found. ")
        return;
    }

    if(!packageJson.flagFront){
        FlagCLI.red("[ERROR]").outn("Option information of \"flagFront\" is not set in \"package.json\".");
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
        FlagCLI.red("[ERROR]").outn("Project information \"" + projectName + "\" is not set in \"flagFront\" of \"package.json\".");
        return;
    }

    FlagCLI
        .outn("Delete project \"" + projectName + "\".")
        .br()
        .br()
    ;

    var judge = await FlagCLI.in("Are you really sure? [y]");

    if(!judge){
        judge = "y";
    }

    if(judge.toString().toLowerCase() == "y"){


    }

    FlagCLI
        .br()
        .br()
        .green("..... Remove Project!")
    ;

};