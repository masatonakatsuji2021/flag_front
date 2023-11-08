const cli = require("@flagfw/cli");

module.exports = function(){

    const padEnd =40;

    cli
        .indent(2)
        .outn()
        .outn("[ Command List ]")
        .outn()
        .outn("- init | create".padEnd(padEnd) + ": Create and build the project.")
        .outn()
        .outn("- plugin add [add plugin_name?]".padEnd(padEnd) + ": Add the flag plugin as an npm package.")
        .outn()
        .outn("- plugin delete [delete plugin_name?]".padEnd(padEnd) + ": Delete the flag plugin.")
        .outn()
        .outn("- build".padEnd(padEnd) + ": Run a build of the project.")
        .outn("".padEnd(padEnd) + "  No arguments are needed if you run the build inside the project directory.")
        .outn()
        .outn("- remove [project_name]".padEnd(padEnd) +": delete the project")
        .outn()
    ;
};