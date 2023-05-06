const fs = require("fs");
const path = require("path");
const cli = require("@flag/cli");
const { execSync } = require("child_process");

module.exports = async function(args){
    
    const deepSearch = function(path){

        var glob = fs.readdirSync(path);
    
        var res = {
            dir:[],
            file:[],
        };
    
        for(var n = 0 ; n < glob.length ; n++){
            var g_ = path + "/" + glob[n];
    
            if(fs.statSync(g_).isDirectory()){
                res.dir.push(g_);
                var buffer = deepSearch(g_);
                for(var n2 = 0 ; n2 < buffer.dir.length ; n2++){
                    res.dir.push(buffer.dir[n2]);
                }
                for(var n2 = 0 ; n2 < buffer.file.length ; n2++){
                    res.file.push(buffer.file[n2]);
                }
            }
            else{
                res.file.push(g_);
            }
        }
    
        return res;
    };

    cli
        .indent(2)
        .outn()
        .outn("* SPA Create-Project")
        .outn()

    var create = {};

    if(!args._any[1]){
        cli.red("[ERROR]").outn(" project name not enter.");
        return false;
    }

    create.name = args._any[1];

    create.directory = process.cwd();
    if(args.directory){
        create.directory = args.directory;
    }
    if(args.d){
        create.directory = args.d;
    }

    create.format = "web";
    if(args.format){
        create.format = args.format;
    }
    if(args.f){
        create.format = args.f;
    }

    create.typeScript = false;
    if(args.typescript){
        create.typeScript = args.typescript;
    }
    if(args.t){
        create.typeScript = args.t;
    }

    create.root = "./" + create.name + "/src";
    if(args.root){
        create.root =  "./" + create.name + "/" + args.root;
    }
    if(args.r){
        create.root =  "./" + create.name + "/" + args.r;
    }

    create.build = "./" + create.name + "/__build";
    if(args.build){
        create.build =  "./" + create.name + "/" + args.build;
    }
    if(args.b){
        create.root =  "./" + create.name + "/" + args.b;
    }

    create.uncomponent = false;
    if(args.uncomponent){
        create.uncomponent = args.uncomponent;
    }
    if(args.uc){
        create.uncomponent = args.uc;
    }

    create.soursemap = false;
    if(args.soursemap){
        create.soursemap = args.soursemap;
    }
    if(args.sm){
        create.soursemap = args.sm;
    }

    var padEnd = 15;

    if(create.format.indexOf("cordova")>-1){
        create.build = "./" + create.name + "/www";
        cli.yellow("#").yellow("[WARN] The build directory will be the default path \"www\" for cordova projects");
        cli.outn();
    }

    cli
        .outn("Project Name".padEnd(padEnd) + "= " + create.name)
        .outn("Format".padEnd(padEnd) + "= " + create.format)
        .outn("directory".padEnd(padEnd) + "= " + create.directory)
        .outn("root".padEnd(padEnd) + "= " + create.root)
        .outn("build".padEnd(padEnd) + "= " + create.build)
        .outn("TypeScript".padEnd(padEnd) + "= " + create.typeScript)
        .outn("uncomponent".padEnd(padEnd) + "= " + create.uncomponent)
        .outn("soursemap".padEnd(padEnd) + "= " + create.soursemap)
        .outn()
    ;

    // start

    var packageJson = {};
    try{
        packageJson = require(create.directory + "/package.json");
    }catch(error){}

    if(!packageJson.flagFront){
        packageJson.flagFront = [];
    }

    var alreadyIndex = null;
    for(var n = 0 ; n < packageJson.flagFront.length ; n++){
        var buff = packageJson.flagFront[n];

        if(buff.name == create.name){
            alreadyIndex = n;
            break;
        }
    }

    if(alreadyIndex !== null){
        cli.yellow("[WARM] Project \"" + create.name + "\" already exists.");

        create.name = create.name + "_1";

        var judge = await cli.in("Would you like to create it as a different project name \""+ create.name + "\"? [n]");

        if(!judge){
            return false;
        }
    }

    var rootPath = create.directory + "/" + create.name;

    if(create.format.indexOf("cordova") !== -1){
        // create cordova project..
        cli.green("#").outn("cordova create " + create.name);
        res = execSync("cordova create " + create.name, {cwd: create.directory});
        cli.outn("#" + res.toString());

        var buildPath = create.directory + "/" + create.name + "/www";

        fs.rmdirSync(buildPath, {
            recursive: true
        });
        cli.green("#").outn("Rmdir " + create.build);
    }
    else{
        fs.mkdirSync(rootPath, {
            recursive: true,
        });
        cli.green("# ").outn("Mkdir " + rootPath);    
    }

    var templatePath = path.dirname(__dirname) + "/source/default";

    if(create.typeScript){
        fs.copyFileSync(path.dirname(__dirname) + "/source/_ts/init.d.ts", "./" + create.name + "/init.d.ts");
        cli.green("#").outn("SourceCopy ./" + create.name + "/init.d.ts");
        fs.copyFileSync(path.dirname(__dirname) + "/source/_ts/tsconfig.json", "./" + create.name + "/tsconfig.json");
        cli.green("#").outn("SourceCopy ./" + create.name + "/tsconfig.json");

        templatePath = path.dirname(__dirname) + "/source/default_ts";
    }

    var fileList = deepSearch(templatePath);

    for(var n = 0 ; n < fileList.dir.length ; n++){
        var dir = fileList.dir[n];
        dir = create.root + "/" + dir.substring(templatePath.length);
        dir = dir.split("//").join("/");

        fs.mkdirSync(dir,{
            recursive: true,
        });
        cli.green("# ").outn("Mkdir " + dir);
    }

    for(var n = 0 ; n < fileList.file.length ; n++){
        var inputFile = fileList.file[n];
        var outputFile = create.root + "/" + inputFile.substring(templatePath.length);
        outputFile = outputFile.split("//").join("/");

        fs.copyFileSync(inputFile, outputFile);

        cli.green("# ").outn("SourceCopy " + outputFile);
    }





    if(create.format == "electron"){

    }
    else if(create.format == "nwjs"){


    }


    packageJson.flagFront.push({
        name: create.name,
        format: create.format.split(","),
        rootPath:create.root,
        buildPath: create.build,
        typeScript: create.typeScript,
        uncompressed: create.uncomponent,
        sourceMap: create.soursemap,
    });

    fs.writeFileSync(create.directory + "/package.json", JSON.stringify(packageJson, null, "   "));

    cli.green("# ").outn("Refresh package.json");


    cli
        .outn()
        .green("......Create Complete!");
    ;

    return true;
};