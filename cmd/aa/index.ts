import FlagCLI from "@flagfw/flag/bin/Cli";

export default async ()=>{

    FlagCLI
        .br()
        .outn("----------------------------------------------------------------------------")
        .indent(2)
        .outn("_______        _______  ______      _______  ______  _____  __   _ _______")
        .outn("|______ |      |_____| |  ____      |______ |_____/ |     | | \  |    |   ")
        .outn("|       |_____ |     | |_____|      |       |    \_ |_____| |  \_|    |   ")
        .br()
        .outn("Web Fontend Applicaiton Build/Create Consoller")
        .indent(0)
        .outn("----------------------------------------------------------------------------")
        .br()
    ;

};