const fs = require("fs");
const path = require("path");
const cli = require("@flag/cli");
const deepCopy = require("../deepCopy.js");
const build = require("../build");
const { execSync } = require("child_process");

module.exports = async function(create){

    const padEnd = 22;

    cli
    .indent(2)
    .outn()
    .outn("* SPA Create-Project")
    .outn()

    var directory = process.cwd();

    // mkdir project directory
    var rootPath = directory + "/" + create.name;
   
    fs.mkdirSync(rootPath, {
        recursive: true,
    });
    cli.green("#").outn("Mkdir ".padEnd(padEnd) + rootPath);

    var rootPathSrc = rootPath + "/src";

    fs.mkdirSync(rootPathSrc, {
        recursive: true,
    });
    cli.green("#").outn("Mkdir ".padEnd(padEnd) + rootPathSrc);

    // get template path
    const tempDir = path.dirname(path.dirname(__dirname)) + "/source";

    var templatePath = tempDir + "/default";

    if(create.typeScript){
        fs.copyFileSync(tempDir + "/_ts/init.d.ts", rootPathSrc + "/init.d.ts");
        cli.green("#").outn("SourceCopy ".padEnd(padEnd) + "./" + create.name + "/init.d.ts");

        var tsConfig = require(tempDir + "/_ts/tsconfig.json");

        tsConfig.compilerOptions.paths["*"] = [ path.dirname(require.resolve("@flag/front")) + "/bin/*" ];
        fs.writeFileSync(rootPathSrc + "/tsconfig.json", JSON.stringify(tsConfig, null, "   "));
        cli.green("#").outn("SourceCopy ".padEnd(padEnd) + "./" + create.name + "/tsconfig.json");

        templatePath = tempDir + "/default_ts";
    }

    // template file copy
    deepCopy(templatePath, rootPathSrc, function(dir){
        cli.green("#").outn("Mkdir ".padEnd(padEnd) + dir);
    },
    function(outputFile){
        cli.green("#").outn("SourceCopy ".padEnd(padEnd) + outputFile);
    });

    // other frameworks exists...
    if(create.frameworks){

        var rootPathFw = rootPath + "/frameworks";
        fs.mkdirSync(rootPathFw, {
            recursive: true,
        });
        cli.green("#").outn("Mkdir ".padEnd(padEnd) + rootPathFw);

        if(create.frameworks.indexOf("cordova") > -1){

            cli.green("#").outn("framework setting".padEnd(padEnd) + "[Cordova]");

            // case cordova...
            var rootPathCordova = rootPathFw + "/cordova";
            fs.mkdirSync(rootPathCordova, {
                recursive: true,
            });

            cli.green("#").outn("Mkdir ".padEnd(padEnd) + rootPathCordova);

            cli.green("#").out("cordova create....");
            try{
                execSync("cordova create " + rootPathCordova);
            }catch(error){
                cli.red("NG!").outn();
                cli.red("[Cordova Error]").outn(error);
                return;
            }

            cli.outn("OK");
        }
        else if(create.frameworks.indexOf("ionic") > -1){

            // case ionic...
            var rootPathionic = rootPathFw + "/ionic";
            fs.mkdirSync(rootPathionic, {
                recursive: true,
            });
            cli.greeen("#").outn("Mkdir ".padEnd(padEnd) + rootPathionic);



        }
        else if(create.frameworks.indexOf("electron") > -1){

            // case electron...
            var rootPathElectron = rootPathFw + "/electron";
            fs.mkdirSync(rootPathElectron, {
                recursive: true,
            });
            cli.greeen("#").outn("Mkdir ".padEnd(padEnd) + rootPathElectron);

        }
        else if(create.frameworks.indexOf("nwjs") > -1){

            // case nw.js...
            var rootPathNwJs = rootPathFw + "/nwjs";
            fs.mkdirSync(rootPathNwJs, {
                recursive: true,
            });
            cli.greeen("#").outn("Mkdir ".padEnd(padEnd) + rootPathNwJs);

        }
    }
   
    // make package JSON 
    var packageJson ={
        flagFront :{
            name: create.name,
            frameworks: create.frameworks,
            typeScript: create.typeScript,
            compress: create.compress,
            obfuscate: create.obfuscate,
            sourceMap: create.soursemap,
        },
    };

    fs.writeFileSync(rootPath + "/package.json", JSON.stringify(packageJson, null, "   "));
    cli.green("# ").outn("Make ".padEnd(padEnd) + "package.json");

    await build({
        _any: [
            "build",
            create.name,
        ],
    },{
        noExit: true,
    });

    cli
    .outn()
    .green("...... Project Create Complete!")
    .outn()
;
};