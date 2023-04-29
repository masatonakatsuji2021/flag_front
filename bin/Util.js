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

    lcFirst(string){
        return string.substring(0,1).toLowerCase() + string.substring(1);
    }

    getClassName(string, classType){
        return string.substring(0, string.indexOf(classType));
    }

    searchForm(formName){
        if(Data.__form[formName]){
            return Data.__form[formName];
        }
    }
    
    dt(datetime){

        if(datetime){
            var d = new Date(datetime);
        }
        else{
            var d = new Date();
        }

        const _DateTime = function(dt){

            this.format = function(format){

                if(format == undefined){
                    format = "YYYY/MM/DD HH:II:SS";
                }

                format = format.split("YYYY").join(this.getYear());
                format = format.split("MM").join(this.getMonth());
                format = format.split("DD").join(this.getDate());
                format = format.split("W").join(this.getDay());
                format = format.split("HH").join(this.getHours());
                format = format.split("II").join(this.getMinutes());
                format = format.split("SS").join(this.getSeconds());
                format = format.split("U").join(this.getTime());
                
                return format;
            };

            this.getYear = function(){
                return dt.getFullYear();
            };

            this.getMonth = function(){
                return ("00" + (dt.getMonth() + 1)).slice(-2);
            };

            this.getDate = function(){
                return ("00" + dt.getDate()).slice(-2);
            };

            this.getDay = function(){
                return dt.getDay();
            };

            this.getHours = function(){
                return ("00" + dt.getHours()).slice(-2);
            };

            this.getMinutes = function(){
                return ("00" + dt.getMinutes()).slice(-2);
            };

            this.getSeconds = function(){
                return ("00" + dt.getSeconds()).slice(-2);
            };

            this.getTime = function(){
                return dt.getTime();
            };
        };

        return new _DateTime(d);
    }

    sleep(time){

        return new Promise(function(resolve){
            setTimeout(function(){
                resolve();
            },time);
        });
    }
};