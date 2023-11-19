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
const cli_1 = require("@flagfw/cli");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    cli_1.FlagCLI
        .br()
        .outn("----------------------------------------------------------------------------")
        .indent(2)
        .outn("_______        _______  ______      _______  ______  _____  __   _ _______")
        .outn("|______ |      |_____| |  ____      |______ |_____/ |     | | \  |    |   ")
        .outn("|       |_____ |     | |_____|      |       |    \_ |_____| |  \_|    |   ")
        .br()
        .outn("Web Fontend Applicaiton Build/Create Consoller")
        .indent(0)
        .outn("----------------------------------------------------------------------------")
        .br();
});
