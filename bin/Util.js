const Data = use("Data");

return new class Util{

    base64Encode(string){
        return btoa(unescape(encodeURIComponent(string)));
    }

    base64Decode(string){
        return decodeURIComponent(escape(atob(string)));
    }

    uniqId(length){

        if(!length){
            length = 32;
        }

        const lbn = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var str = "";

        for(var n = 0 ; n < length ; n++){
            var s = lbn[parseInt(Math.random() * 1000) % lbn.length];

            str += s;
        }

        return str;
    }

    ucFirst(string){
        return string.substring(0,1).toUpperCase() + string.substring(1);
    }

    getClassName(string, classType){
        return string.substring(0, string.indexOf(classType));
    }

    searchForm(formName){
        if(Data.__form[formName]){
            return Data.__form[formName];
        }
    }
    
}