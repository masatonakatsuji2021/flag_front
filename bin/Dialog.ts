import Util from "Util";
import Dom from "Dom";

export default class Dialog{

    open(contents : string, option = null){

        if(option == null){
            option = {};
        }

        var uid = Util.uniqId();
        var baseHtml = use("DialogHtml");
        baseHtml = Util.base64Decode(baseHtml);
        baseHtml = baseHtml.split("{{uid}}").join(uid);
        baseHtml = baseHtml.split("{{contents}}").join(contents);
        Dom("body").append(baseHtml);

        var v = Dom("[data-uid=\"" + uid + "\"]");

        if(option.class){
            v.child(".window").addClass(option.class);
        }

        return v;
    }

    loading(message : string = null, option = null){

        if(!option){
            option = {};
        }

        if(!option.class){
            option.class = [];
        }
        option.class.push("loading_circle");

        var str = "<div class=\"icon\"></div>";
        if(message){
            str += "<div class=\"message\">" + message + "</div>";
        }

        var v = this.open(str, option);

        return v;
    }

    alert(message : string, title : string = null, option = null){

        if(option == null){
            option = {};
        }

        if(!option.close){
            option.close = {};
        }

        if(!option.close.text){
            option.close.text = "Close";
        }

        var str = "<div class=\"message\">" + message + "</div><div style=\"text-align:right\"><a class=\"close_btn\">" + option.close.text + "</a></div>";

        if(title){
            str = "<div class=\"title\">" + title + "</div>" + str;
        }

        var v = this.open(str, option);

        v.child(".close_btn").on("click", ()=>{
            if(option.close.callback){
                option.close.callback.bind(v)();
            }
            v.remove();
        });

    }

};