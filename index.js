"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cli_1 = require("@flagfw/flag/bin/Cli");
const aa_1 = require("./cmd/aa");
const create_1 = require("./cmd/create");
const build_1 = require("./cmd/build");
const remove_1 = require("./cmd/remove");
const info_1 = require("./cmd/info");
const add_1 = require("./cmd/plugin/add");
const remove_2 = require("./cmd/plugin/remove");
const add_2 = require("./cmd/fw/add");
const remove_3 = require("./cmd/fw/remove");
exports.default = (args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args) {
        (0, aa_1.default)();
    }
    let cmd1;
    let cmd2;
    if (!args) {
        args = Cli_1.default.getArgsOption();
        cmd1 = args["_any"][0];
        cmd2 = args["_any"][1];
    }
    else {
        cmd1 = args[0];
        cmd2 = args[1];
    }
    if (cmd1 == "create") {
        yield (0, create_1.default)(args, true);
    }
    else if (cmd1 == "build") {
        yield (0, build_1.default)(args, null, true);
    }
    else if (cmd1 == "remove") {
        yield (0, remove_1.default)(args);
    }
    else if (cmd1 == "plugin") {
        if (cmd2 == "add") {
            yield (0, add_1.default)(args);
        }
        else if (cmd2 == "remove") {
            yield (0, remove_2.default)(args);
        }
    }
    else if (cmd1 == "fw") {
        if (cmd2 == "add") {
            yield (0, add_2.default)(args);
        }
        else if (cmd2 == "remove") {
            yield (0, remove_3.default)(args);
        }
    }
    else if (cmd1 == "info") {
        yield (0, info_1.default)();
    }
    else {
        Cli_1.default.red("[ERROR] ").outn("The command you entered does not exist and cannot be executed.");
    }
});
