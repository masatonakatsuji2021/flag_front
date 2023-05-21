const cli = require("@flag/cli");

module.exports = function(){

    const padEnd =35;

    cli
        .indent(2)
        .outn()
        .outn("[ Command List ]")
        .outn()
        .outn("- init".padEnd(padEnd) + ": Create and build the project.")
        .outn("- add_plugin [plugin_name]".padEnd(padEnd) + ": Add the flag plugin as an npm package.")
        .outn("- build [project_name?]".padEnd(padEnd) + ": Run a build of the project.")
        .outn("".padEnd(padEnd) + "  No arguments are needed if you run the build inside the project directory.")
        .outn("- remove [project_name]".padEnd(padEnd) +": delete the project")
        .outn()
    ;
};