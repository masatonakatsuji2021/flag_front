return new class Ajax{

    request(url, option){

        if(!option){
            option = {};
        }

        if(!option.method){
            option.method = "GET";
        }      

        if(!option.contentType){
            option.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
        }

        if(!option.data){
            option.data = {};
        }

        var req = new XMLHttpRequest();
        req.open(option.method, url, true);

        if(option.timeout){
            req.timeout = option.timeout;
        }

        if(option.method.toUpperCase() != "GET"){    
            req.setRequestHeader('content-type', option.contentType);    
        }

        if(option.headers){
            var columns = Object.keys(option.headers);
            for(var n = 0 ; n < columns.length ; n++){
                var key = columns[n];
                var val = option.headers[key];
                req.setRequestHeader(key, val);
            }
        }

        if(option.method.toUpperCase() == "GET"){    
            req.send(this.#setRequestData(option.data));
        }
        else{
            if(
                option.contentType == "text/json" ||
                option.contentType == "application/json"    
            ){
                req.send(JSON.stringify(option.data));
            }
            else{
                req.send(this.#setRequestData(option.data));
            }
        }

        var AjaxResponse = function(option, req){

            this.then = function(callback){

                req.onload = function(e){

                    var body = req.responseText;
                    if(option.dataType == "json"){
                        body = JSON.parse(req.responseText);
                    }
        
                    callback(body, req);
                };
                
                return this;
            };

            this.catch = function(callback){
                
                req.onerror = function(error){
                    callback(error, req);
                };

                return this;
            };
        };

        return new AjaxResponse(option, req);
    }

    #setRequestData(data){

        var str = "";
        var strList = [];

        var columns = Object.keys(data);
        for(var n = 0 ; n < columns.length ; n++){
            var key = columns[n];
            var val = data[key];

            strList.push(key + "=" + encodeURIComponent(val));
        }

        str = strList.join("&");

        return str;
    }

};