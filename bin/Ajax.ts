export default new class Ajax{

    baseUrl : string = "";
    url : string = "";
    method : string = "get";
    data : object = {};
    headers : object = {};
    timeout : number = 30000;
    contentType : string = "application/x-www-form-urlencoded;charset=UTF-8";
    dataType : string = null;
    handle(body, error, req) : void{}
    handleBefore(req) : void{}
    handleSuccess(body, req) : void{}
    handleError(error, req) : void{}
    handleProgress(event) : void{}

    private handleLongPolingSuccess;
    private _poling_mode : number = 0;
    private _spi;
    private _req;
    
    que(){

        var req = new XMLHttpRequest();
        req.open(this.method, this.baseUrl + this.url, true);

        if(this.timeout){
            req.timeout = this.timeout;
        }

        if(this.method.toUpperCase() != "GET"){    
            req.setRequestHeader('content-type', this.contentType);    
        }

        if(this.headers){
            const columns = Object.keys(this.headers);
            for(var n = 0 ; n < columns.length ; n++){
                const key = columns[n];
                const val = this.headers[key];
                req.setRequestHeader(key, val);
            }
        }

        if(this.method.toUpperCase() == "GET"){    
            req.send(this._setRequestData(this.data));
        }
        else{
            if(
                this.contentType == "text/json" ||
                this.contentType == "application/json"    
            ){
                req.send(JSON.stringify(this.data));
            }
            else{
                req.send(this._setRequestData(this.data));
            }
        }

        this.handleBefore(req);

        req.onload = (e)=>{
            var body = req.responseText;
            if(this.dataType == "json"){
                body = JSON.parse(req.responseText);
            }
            this.handleSuccess(body, req);
            this.handle(body, null, req);
            if(this.handleLongPolingSuccess){
                this.handleLongPolingSuccess();
            }
        };

        req.onerror = (error)=>{
            this.handleError(error, req);
            this.handle(null, error, req);
        };

        req.onprogress = (event)=>{
            this.handleProgress(event);
        };

        this._req = req;

        return this;
    }

    then(callback){
        this.handleSuccess = callback;
        return this;             
    }

    catch(callback){
        this.handleError = callback;
        return this;
    }

    progress(callback){
        this.handleProgress = callback;
        return this;
    }

    poling(interval : number){
        this._poling_mode = 1;
        this.que();
        this._spi = setInterval(()=>{
            this.que();
        }, interval);
        return this;
    }

    longPoling(){
        this._poling_mode = 2;
        this.handleLongPolingSuccess = ()=>{
            this.que();
        };
        this.que();
        return this;
    }

    abort(){
        this._req.abort();
        if(this._spi){
            clearInterval(this._spi);
        }
        return this;
    }

    private _setRequestData(data){

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