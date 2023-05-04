export default new class Request{
    
    __file_uploads = {};
    _post = null;

    clear(){
        this.__file_uploads = {};
        this._post = null;
    }

    get(){
        return this._post;
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

            if(data[name] == undefined){
                data[name] = null;
            }

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
                    data[name] = target.value;
                }
            }
            else if(target.type == "checkbox"){
                if(target.checked){
                    if(!data[name]){
                        data[name] = [];
                    }
                    data[name].push(target.value);
                }
            }
            else if(target.type == "file"){

                if(!this.__file_uploads[name]){
                    continue;
                }

                if(!data[name]){
                    data[name] = [];
                }

                for(var n2 = 0 ; n2 < this.__file_uploads[name].length ; n2++){
                    var file = this.__file_uploads[name][n2];
                    data[name].push(file);
                }
            }
            else{
                value = target.value;
                data[name] = value;
            }
        }

        this._post = data;
    }
};