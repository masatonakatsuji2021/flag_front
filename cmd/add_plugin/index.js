const cli = require("@flagfw/cli");

module.exports = async function(args){

    cli
        .indent(2)
        .outn("* Flag Add Plugin")
        .outn("Answer the various questions when adding the plugin")
    ;

    let pluginName = args._any[1];

    if(!pluginName){
    
        while(!pluginName){
            pluginName = await cli.in("- Enter the plugin name (npm module path) to add");

            if(!pluginName){
                cli
                    .indent(4)
                    .red("[ERROR] ")
                    .outn("No plugin name entered. retry.", true)
                    .indent(2)
                ;
            }
            
            var directory = process.cwd();
            let package = require(directory + "/package.json");

            if(package.flagFront.plugin){
                if(package.flagFront.plugin.indexOf(pluginName) > -1){
                    cli
                        .indent(4)
                        .yellow("[WARM] ")
                        .outn("\"" + pluginName + "\" is already registered as a plugin.")
                        .indent(2)
                    ;
                    return;
                }
            }

        }

        try{
            require.resolve(pluginName);
        }catch(e){

            cli.yellow("  [WARM]").outn("\"" + pluginName + "\" does not exist as an npm module");

            let status = await cli.in("  so run the installation command. Is it OK? (y)");

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
                cli.outn().outn(".....Add PLugin Pause!");
                return;
            }
        }
    }

    let status = await cli.outn().in("Add plugin \""+pluginName + "\" to the project so that it can be used. Is it OK? (y)")

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
        cli.outn().outn(".....Add PLugin Pause!");
        return;
    }

    const addPluginMethod = require("./add_plugin.js");

    await addPluginMethod(pluginName);

};