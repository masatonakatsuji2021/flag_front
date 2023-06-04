const cli = require("@flagfw/cli");

module.exports = async function(){

    cli
        .indent(2)
        .outn("* Flag Front Project Init")
        .outn("Please answer various questions as you create your project.")
        .outn()
    ;

    var name;

    while(!name){
        name = await cli.in("- Enter project name to create");

        if(!name){
            cli
                .indent(4)
                .red("[ERROR] ")
                .outn("No project name entered. retry.", true)
                .indent(2)
            ;
        }
    }

    var frameworkList = {
        "cordova":"Android app creation using \"cordova\".",
        "electron":"Windows/Mac desktop application creation using \"Electron\"",
    };

    var frameworks = await cli.outn("- If there is a framework to create, please select from the following.")
        .outn("  (Multiple selections can be made separated by.)")
        .indent(4)
        .outData(frameworkList)
        .indent(2)
        .in("  Select from above, ()")
    ;

    var useTypeScript = await cli.in("- Do you use TypeScript?(y)");

    if(useTypeScript){
        if(useTypeScript == "y"){
            useTypeScript = true;
        }
        else{
            useTypeScript = false;
        }
    }
    else{
        useTypeScript = true;
    }

    var useCompress = await cli.in("- Compress Javascript Source on build? (y)");

    if(useCompress){
        if(useCompress == "y"){
            useCompress = true;
        }
        else{
            useCompress = false;
        }
    }
    else{
        useCompress = true;
    }

    var useObfuscate = await cli.in("- Obfuscate Javascript Source at build? (y)");

    if(useObfuscate){
        if(useObfuscate == "y"){
            useObfuscate = true;
        }
        else{
            useObfuscate = false;
        }
    }
    else{
        useObfuscate = true;
    }

    var create = {
        name: name,
        frameworks: frameworks ? frameworks.split(",") : [],
        typeScript: useTypeScript,
        compress: useCompress,
        obfuscate: useObfuscate,
    };

    var createText = {
        "Project Name": name,
        "Frameworks": frameworks,
        "TypeScript": useTypeScript,
        "JS Source Compress": useCompress,
        "JS Source Obfuscate": useObfuscate,
    };

    cli
        .indent(4)
        .outData(createText)
        .indent(2)
    ;

    var status = await cli.in("- Create a project with the above contents. Is it OK? (y)");

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
        cli.outn().outn(".....Create Projsect Pause!");
        return;
    }

    const createMethod = require("./create.js");

    await createMethod(create);
}