import FlagCLI from "@flagfw/flag/bin/Cli";
import aa from "./cmd/aa";
import create from "./cmd/create";
import build from "./cmd/build";
import remove from "./cmd/remove";
import info from "./cmd/info";
import plugin_add from  "./cmd/plugin/add";
import plugin_remove from "./cmd/plugin/remove";
import fw_add from "./cmd/fw/add";
import fw_remove from "./cmd/fw/remove";

export default async (args? : Object) => {

    if(!args){
        aa();
    }

    let cmd1 : string;
    let cmd2 : string;
    if(!args){
        args = FlagCLI.getArgsOption();
        cmd1 = args["_any"][1];
        cmd2 = args["_any"][2];
    }
    else{
        cmd1 = args[0];
        cmd2 = args[1];
    }
    
    if(cmd1 == "create"){
        await create(args, true);
    }
    else if(cmd1 == "build"){
        await build(args, null, true);
    }
    else if(cmd1 == "remove"){
        await remove(args);
    }
    else if(cmd1 == "plugin"){
        if(cmd2 == "add"){
            await plugin_add(args);    
        }
        else if(cmd2 == "remove"){
            await plugin_remove(args);
        }
    }
    else if(cmd1 == "fw"){
        if(cmd2 == "add"){
            await fw_add(args);
        }
        else if(cmd2 == "remove"){
            await fw_remove(args);
        }
    }
    else if(cmd1 == "info"){
        await info();
    }
    else{
        FlagCLI.red("[ERROR] ").outn("The command you entered does not exist and cannot be executed.");
    }

};