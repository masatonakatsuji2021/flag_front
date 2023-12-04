import FlagCLI from "@flagfw/flag/bin/Cli";

export default async (args) => {

    FlagCLI
        .indent(3)
        .outn("* Flag Add Plugin")
        .outn("Answer the various questions when adding the plugin")
    ;

    let pluginName = args._any[2];

    if(!pluginName){
    
        while(!pluginName){
            pluginName = await FlagCLI.in("- Enter the plugin name (npm module path) to add");

            if(!pluginName){
                FlagCLI
                    .indent(6)
                    .red("[ERROR] ").outn("No plugin name entered. retry.")
                    .indent(3)
                ;
            }
        }
    }

    var directory = process.cwd();
    let packages = require(directory + "/package.json");

    if(packages.flagFront.plugin){
        if(packages.flagFront.plugin.indexOf(pluginName) > -1){
            FlagCLI
                .indent(6)
                .yellow("[WARM] ")
                .outn("\"" + pluginName + "\" is already registered as a plugin.")
                .indent(3)
            ;
            return;
        }
    }

    try{
        require.resolve(pluginName);
    }catch(e){

        FlagCLI.yellow("  [WARM]").outn("\"" + pluginName + "\" does not exist as an npm module");

        let status = await FlagCLI.in("  so run the installation command. Is it OK? (y)");

        if(status){
            if(status == "y"){
                status = true;
            }
            else{
                status = false;
            }
        }
        else{
            status = true;
        }

        if(!status){
            FlagCLI.br().outn(".....Add PLugin Pause!");
            return;
        }
    }
    
    let status = await FlagCLI.br().in("Add plugin \""+pluginName + "\" to the project so that it can be used. Is it OK? (y)")

    if(status){
        if(status == "y"){
            status = true;
        }
        else{
            status = false;
        }
    }
    else{
        status = true;
    }

    if(!status){
        FlagCLI.br().outn(".....Add PLugin Pause!");
        return;
    }

    const addPluginMethod = require("./add_plugin.js");

    await addPluginMethod(pluginName);

};