const Util = use("Util");
const Data = use("Data");
const Dom = use("Dom");
const Request = use("Request");

return class Form{
    
    constructor(formName){

        if(this.constructor.name == "Form"){
            this.formName = formName;
            var className = "Form";

            if(!Data.__form[this.formName]){
                Data.__form[this.formName] = {
                    class: className,
                    eventSubmit: null,
                    eventReset: null,
                };
            }
        }
        else{           
            var className = Util.getClassName(this.constructor.name,"Form");
            this.formName = className;
            if(formName){
                this.formName = formName;                
            }

            Data.__form[this.formName] = {
                class: className,
            };
        }
    }

    #_getData(){
        return Data.__form[this.formName];
    }

    existSubmitEvent(){

        if(this.constructor.name == "Form"){
            if(this.#_getData().eventSubmit){
                return true;
            }    
        }
        else{
            if(this.handleSubmit){
                return true;
            }
        }


        return false;
    }

    existResetEvent(){

        if(this.constructor.name == "Form"){
            if(this.#_getData().eventReset){
                return true;
            }
        }
        else{
            if(this.handleReset){
                return true;
            }
        }

        return false;
    }

    getSubmitEvent(){
        if(this.constructor.name == "Form"){
            return this.#_getData().eventSubmit;
        }
        else{
            return this.handleSubmit;
        }
    }

    getResetEvent(){
        return this.#_getData().eventReset;
    }

    submit(){

        var dom = Dom("#" + this.formName);

        var getChild = dom.querySelectorAll("[name]");

        Request.refresh(getChild);

        var post = Request.get();

        if(this.existSubmitEvent()){
            this.getSubmitEvent()(post);
        }

        return this;
    }

    reset(){

        var dom = Dom("#" + this.formName);

        var getChild = dom.querySelectorAll("[name]");

        Request.refresh(getChild);
    
        var post = Request.get();

        if(this.existResetEvent()){
            this.getResetEvent()(post);
        }

        return this;
    }

    onSubmit(callback){
        Data.__form[this.formName].eventSubmit = callback;
        return this;
    }

    onReset(callback){
        Data.__form[this.formName].eventReset = callback;
         return this;
    }
}