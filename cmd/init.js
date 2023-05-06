// const fs = require("fs");
// const path = require("path");
const cli = require("@flag/cli");
// const { execSync } = require("child_process");

module.exports = async function(){

    cli
        .indent(4)
        .outn("* Flag Front Project Init")
        .outn()
    ;

    cli.outn("各所の質問に応対してください").outn().outn();

    var name = await cli.in("- 作成するプロジェクト名を入力");

    cli.outn();

    var format = await cli.outn("- プロジェクトの種類を下記から選択してください")
        .outn()
        .indent(8)
        .outn("web".padEnd(10)+": シンプルにWebページとして公開する場合はこちらを選択します")
        .outn("cordova".padEnd(10) + ": cordovaを使用してAndroidアプリを作成します")
        .outn("ionic".padEnd(10) + ": ionicを使用してAndroidアプリを作成します")
        .outn("electron".padEnd(10) + ": Electronを使用してWindowsやMacなどのデスクトップアプリを作成します")
        .outn("nwjs".padEnd(10) + ": NW.jsを使用してWindowsやMacなどのデスクトップアプリを作成します")
        .indent(4)
        .outn()
        .in("上記から選択 (web)")
    ;

    cli.outn();

    cli.outn().outn(".....Exit!");

}