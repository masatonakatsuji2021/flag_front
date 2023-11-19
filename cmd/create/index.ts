import { FlagCLI , CLIColorType } from "@flagfw/cli";
import aa from "../aa";
import createMethod from "./create";

export default async (args: Object, seconded? : boolean) => {

    if(!seconded){
        aa();
    }

    FlagCLI
        .indent(3)
        .br()
        .outn("Please answer various questions as you create your project.")
        .br()
    ;

    var name;

    while(!name){
        name = await FlagCLI.in("- Enter project name to create");

        if(!name){
            FlagCLI
                .indent(6)
                .red("[ERROR] ").outn("No project name entered. retry.")
                .indent(3)
            ;
        }
    }

    var useTypeScript = await FlagCLI.in("- Do you use TypeScript?(y)");

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

    var useCompress = await FlagCLI.in("- Compress Javascript Source on build? (y)");

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

    var useObfuscate = await FlagCLI.in("- Obfuscate Javascript Source at build? (y)");

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

    var frameworkList = {
        "cordova":"Android app creation using \"cordova\".",
        "electron":"Windows/Mac desktop application creation using \"Electron\"",
    };

    let frameworks = await FlagCLI.outn("- If there is a framework to create, please select from the following.")
        .outn("  (Multiple selections can be made separated by.)")
        .indent(6)
        .br()
        .outData(frameworkList)
        .br()
        .indent(3)
        .in("  Select from above, ()")
    ;
/*
    let templateUsed = await FlagCLI
        .outn("- Would you like to create a project from an official public template?")
        .out("  If you do not use it, it will be a sample source that only displays a primitive main page.(n)")
        .in();
    
    if(templateUsed){
        if(templateUsed == "y"){
            templateUsed = true;
        }
        else{
            templateUsed = false;
        }
    }
    else{
        templateUsed = true;
    }

    if(templateUsed){

        FlagCLI.outn("Retrieving list of templates....");
        return;
    }
*/
    var create = {
        name: name,
        frameworks: frameworks ? frameworks.toString().split(",") : [],
        typeScript: useTypeScript,
        compress: useCompress,
        obfuscate: useObfuscate,
    };

    var createText = {
        "Project Name": name,
        "Frameworks": frameworks,
        "TypeScript Complie": useTypeScript,
        "Source Compress": useCompress,
        "Source Obfuscate": useObfuscate,
    };

    FlagCLI
        .indent(6)
        .br()
        .outData(createText)
        .br()
        .indent(3)
    ;

    var status = await FlagCLI.in("- Create a project with the above contents. Is it OK? (y)");

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
        FlagCLI.br().redn(".....Create Projsect Pause!");
        return;
    }

    await createMethod(create);
}