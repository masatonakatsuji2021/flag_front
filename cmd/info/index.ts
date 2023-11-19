import cli from "../../cli";

import { FlagCLI } from "@flagfw/cli";

export default async () => {

    const info = {
        "- create": "Create and build the SPA project.",
        "- remove": "Remove SPA project.",
        "- build": "Build the project source set.",
        "- plugin add": "Add plugins to use in your project.",
        "- plugin remove": "Remove plugin from project.",
        "- fw add": "Add the framework to output at build time from the project.",
        "- fw remove": "Removes the framework specified in the project.",
    };

    FlagCLI
        .indent(3)
        .br()
        .outn("[ Command List ]")
        .br()
        .outData(info)
        .br()
        .indent(0)
    ;

    let cmd = await FlagCLI.in("Enter Command");

    FlagCLI
        .grayn(".....")
        .br();

    let args = cmd.toString().split(" ");

    await cli(args);
};