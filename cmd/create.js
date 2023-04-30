const fs = require("fs");
const path = require("path");
const cli = require("@flag/cli");

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
        .outn("=== Flag Front Build ========================")
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

    create.format = "web";
    if(args.format){
        create.format = args.format;
    }

    create.typeScript = false;
    if(args.typescript){
        create.typeScript = args.typescript;
    }

    create.root = "./" + create.name + "/src";
    if(args.root){
        create.root =  "./" + create.name + "/" + args.root;
    }

    create.build = "./" + create.name + "/__build";
    if(args.build){
        create.build =  "./" + create.name + "/" + args.build;
    }

    create.uncomponent = false;
    if(args.uncomponent){
        create.uncomponent = args.uncomponent;
    }

    create.soursemap = false;
    if(args.soursemap){
        create.soursemap = args.soursemap;
    }

    var padEnd = 15;

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
        cli.red("[ERROR]").outn(" Project \"" + create.name + "\" already exists.");
        return false;
    }

    var rootPath = create.directory + "/" + create.name;

    fs.mkdirSync(rootPath, {
        recursive: true,
    });
    cli.green("# ").outn("Mkdir " + rootPath);

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

    var fileList = deepSearch(path.dirname(__dirname) + "/source/default");

    for(var n = 0 ; n < fileList.dir.length ; n++){
        var dir = fileList.dir[n];
        dir = create.root + "/" + dir.substring((path.dirname(__dirname) + "/source/default").length);
        dir = dir.split("//").join("/");

        fs.mkdirSync(dir,{
            recursive: true,
        });
        cli.green("# ").outn("Mkdir " + dir);
    }

    for(var n = 0 ; n < fileList.file.length ; n++){
        var inputFile = fileList.file[n];
        var outputFile = create.root + "/" + inputFile.substring((path.dirname(__dirname) + "/source/default").length);
        outputFile = outputFile.split("//").join("/");

        fs.copyFileSync(inputFile, outputFile);

        cli.green("# ").outn("SourceCopy " + outputFile);
    }

    if(create.format.indexOf("cordova")){

    }
    else if(create.format.indexOf("electron")){

    }

    cli
        .outn()
        .green("......Create Complete!");
    ;

    return true;
};