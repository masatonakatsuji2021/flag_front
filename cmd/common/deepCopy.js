"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const deepSearch_1 = require("./deepSearch");
exports.default = (inputPath, outputPath, mkdirCallback, fileCopyCallback2) => {
    var dataList = (0, deepSearch_1.default)(inputPath);
    for (var n = 0; n < dataList.dir.length; n++) {
        var dir = dataList.dir[n];
        dir = outputPath + "/" + dir.substring(inputPath.length);
        dir = dir.split("//").join("/");
        fs.mkdirSync(dir, {
            recursive: true,
        });
        if (mkdirCallback) {
            mkdirCallback(dir);
        }
    }
    for (var n = 0; n < dataList.file.length; n++) {
        var inputFile = dataList.file[n];
        var outputFile = outputPath + "/" + inputFile.substring(inputPath.length);
        outputFile = outputFile.split("//").join("/");
        fs.copyFileSync(inputFile, outputFile);
        if (fileCopyCallback2) {
            fileCopyCallback2(outputFile);
        }
    }
};
