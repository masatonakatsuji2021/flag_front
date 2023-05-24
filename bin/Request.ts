export default new class Request{
    
    __file_uploads = {};
    _post = null;

    /**
     * clear
     * 
     * clear request data.
     */
    clear(){
        this.__file_uploads = {};
        this._post = null;
    }

    /**
     * get
     * 
     * get request data.
     * 
     * @returns post data
     */
    get(){
        return this._post;
    }

    private _getData(data, name, callback){

        if(name.indexOf(".") > -1){

            let names = name.split(".");

            if(!data[names[0]]){
                data[names[0]] = {};
            }
            
            if(names.length == 2){
                callback(data[names[0]] ,names[1]);
                return;
            }
            
            if(!data[names[0]][names[1]]){
                data[names[0]][names[1]] = {};
            }

            if(names.length == 3){
                callback(data[names[0]][names[1]], names[2]);
                return;
            }

            if(!data[names[0]][names[1]][names[2]]){
                data[names[0]][names[1]][names[2]] = {};
            }

            if(names.length == 4){
                callback(data[names[0]][names[1]][names[2]], names[3]);
                return;
            }

            if(!data[names[0]][names[1]][names[2]][names[3]]){
                data[names[0]][names[1]][names[2]][names[3]] = {};
            }

            if(names.length == 5){
                callback(data[names[0]][names[1]][names[2]][names[3]], names[4]);
                return;
            }
        }
        else{
            callback(data ,name);
        }
    }

    refresh(targetForm){

        var data = {};
        for(var n = 0 ; n < targetForm.get.length ; n++){
            let target = targetForm.get[n];
            let name : string = target.name;

            if(!name){
                continue;
            }

            var value = null;

            this._getData(data, name, (_data, target)=>{
                if(!_data[target]){
                    _data[target] = null;
                }
            });

            if(
                target.type == "submit" ||
                target.type == "reset" ||
                target.type == "button" ||
                target.type == "image"
            ){
                continue;
            }
            else if(target.type == "radio"){
                if(target.checked){
                    let value = target.value;
                    this._getData(data, name, (_data, target)=>{
                        _data[target] = value;
                    });
                }
            }
            else if(target.type == "checkbox"){
                if(target.checked){
                    let value = target.value;
                    this._getData(data, name, (_data, target)=>{

                        // @ts-ignore
                        if(!_data[target]){
                            _data[target] = [];
                        }

                        _data[target].push(value);
                    });
                }
            }
            else if(target.type == "file"){

                if(!this.__file_uploads[name]){
                    continue;
                }

                this._getData(data, name, (_data, target)=>{

                    if(!_data[target]){
                        _data[target] = [];
                    }

                    for(var n2 = 0 ; n2 < this.__file_uploads[name].length ; n2++){
                        var file = this.__file_uploads[name][n2];
                        _data[target].push(file);
                    }

                });
            }
            else{
                value = target.value;
                this._getData(data, name, (_data, target)=>{
                    _data[target] = value;
                });
            }
        }

        this._post = data;
    }
};