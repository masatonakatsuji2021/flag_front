import * as fs from "fs";
import deepSearch from "./deepSearch";

export default (inputPath : string, outputPath : string, mkdirCallback? : Function, fileCopyCallback2? : Function) => {

    var dataList = deepSearch(inputPath);

    for(var n = 0 ; n < dataList.dir.length ; n++){
        var dir = dataList.dir[n];
        dir = outputPath + "/" + dir.substring(inputPath.length);
        dir = dir.split("//").join("/");

        fs.mkdirSync(dir,{
            recursive: true,
        });

        if(mkdirCallback){
            mkdirCallback(dir);
        }
    }

    for(var n = 0 ; n < dataList.file.length ; n++){
        var inputFile = dataList.file[n];
        var outputFile = outputPath + "/" + inputFile.substring(inputPath.length);
        outputFile = outputFile.split("//").join("/");

        fs.copyFileSync(inputFile, outputFile);
        
        if(fileCopyCallback2){
            fileCopyCallback2(outputFile);
        }
    }

};