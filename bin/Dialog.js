const Util = use("Util");
const Dom = use("Dom");

return class Dialog{

    open(contents){

        var uid = Util.uniqId();
        var baseHtml = use("DialogHtml");
        baseHtml = Util.base64Decode(baseHtml);
        baseHtml = baseHtml.split("{{uid}}").join(uid);
        baseHtml = baseHtml.split("{{contents}}").join(contents);
        Dom().append(baseHtml);

        return Dom("[uid=\"" + uid + "\"]");
    }

    loading(message){


        
    }

}