const cli = require("@flag/cli");

module.exports = function(){

    cli
        .indent(2)
        .outn()
        .outn("[ Command List ]")
        .outn()
        .outn("create".padEnd(10) + ": create a project")
        .outn()
        .indent(14)
        .outn("{name}".padEnd(40) + ": Create Project Name")
        .outn("[--directory | --d] {...,format}".padEnd(40) + ": Optionally specify the path to create the project.")
        .outn("[--format | --f] {...,format}".padEnd(40) + ": Supported formats for projects.(Separated by \",\"")
        .outn("".padEnd(42)+"Formats are \"web\",\"cordova\",\"electron\",\"nwjs\".")
        .outn("[--typescript | --t] {boolean}".padEnd(40) + ": Compatible with TypeScript.")
        .outn("[--root | --r] {rootPath}}".padEnd(40) + ": Source code directory path.")
        .outn("[--build | --b] {buildPath}}".padEnd(40) + ": Directory path to build.")
        .outn("[--uncomponent | --uc] {boolean}}".padEnd(40) + ": If set to true,\n" + " ".padEnd(56) + "the target JavaScript file \n" + " ".padEnd(56) + "will not be compressed when executing a build.")
        .outn("[--soursemap | --sm] {boolean}}".padEnd(40) + ": If true, create sourcemaps.")
        .indent(2)
        .outn()
        .outn("build".padEnd(10) + ": Run a build of the project")
        .outn()
        .indent(14)
        .outn("{name}".padEnd(40) + ": Build Project Name")
        .indent(2)
        .outn()
        .outn("remove".padEnd(10) +": delete the project")
        .outn()
        .indent(14)
        .outn("{name}".padEnd(40) + ": Remove Project Name")
        .indent(2)
        .outn()
        .outn()
    ;
    }