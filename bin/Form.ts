import Util from "Util";
import Data from "Data";
import Dom from "Dom";
import Request from "Request";

export default class Form{
    
    formName: string = null;

    constructor(formName: string){

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
            var className : string = Util.getClassName(this.constructor.name,"Form");
            this.formName = Util.lcFirst(className);
            if(formName){
                this.formName = formName;                
            }

            Data.__form[this.formName] = {
                class: className,
            };
        }
    }

    handleSubmit(){}
    handleReset(){}
    handleSetting(){}

    // @ts-ignore
    setting(...argv){
        // @ts-ignore
        this.handleSetting(...argv);
    }

    #_getData(){
        return Data.__form[this.formName];
    }

    tagInput(name, option){

        var str = this.#_tagInput(name, option);

        var dom = Dom("#" + this.formName).child("[form-name=\"" + name + "\"]");

        if(dom){
            dom.html(str);
        }

        return this;
    }

    #_tagInput(name, option){

        if(option == undefined){
            option = {};
        }

        if(!option.type){
            option.type = "text";
        }

        var optionStr = this.#_setOptionString(option);

        var str = "<input name=\"" + name + "\" " + optionStr + ">";

        return str;
    }

    tagHidden(name, value, option){

        if(option == undefined){
            option = {};
        }

        option.type = "hidden";

        option.value = value;

        return this.tagInput(name, option);
    }

    tagNumber(name, option){

        if(option == undefined){
            option = {};
        }

        option.type = "number";

        return this.tagInput(name, option);
    }

    tagPassword(name, option){

        if(option == undefined){
            option = {};
        }

        option.type = "password";

        return this.tagInput(name, option);
    }

    tagFile(name, option){

        if(option == undefined){
            option = {};
        }

        option.type = "file";

        return this.tagInput(name, option);
    }

    tagSelect(name, selects, option){

        if(option == undefined){
            option = {};
        }

        var optionStr = this.#_setOptionString(option);

        var selectStr = "";

        if(option.empty){
            selectStr += "<option value=\"\">" + option.empty + "</option>";
        }

        var columns = Object.keys(selects);
        for(var n = 0 ; n < columns.length ; n++){
            var key = columns[n];
            var val = selects[key];
            selectStr += "<option value=\"" + key + "\">" + val + "</option>";
        }

        var str = "<select name=\"" + name + "\" " + optionStr + ">" + selectStr + "</select>";

        var dom = Dom("#" + this.formName).child("[form-name=\"" + name + "\"]");

        if(dom){
            dom.html(str);
        }

        return this;
    }

    tagTextarea(name, option){

        if(option == undefined){
            option = {};
        }

        var optionStr = this.#_setOptionString(option);

        var str = "<textarea name=\"" + name + "\" " + optionStr + "></textarea>";

        var dom = Dom("#" + this.formName).child("[form-name=\"" + name + "\"]");

        if(dom){
            dom.html(str);
        }

        return this;
    }

    tagRadio(name, selects, option){

        if(option == undefined){
            option = {};
        }

        var str = "";

        var columns = Object.keys(selects);
        for(var n = 0 ; n < columns.length ; n++){
            var key = columns[n];
            var val = selects[key];

            option.type = "radio";
            option.value = key;

            str += "<label>" + this.#_tagInput(name, option) + val + "</label>";
        }

        var dom = Dom("#" + this.formName).child("[form-name=\"" + name + "\"]");

        if(dom){
            dom.html(str);
        }

        return this;
    }

    tagCheckbox(name, selects, option){

        if(option == undefined){
            option = {};
        }

        var str = "";

        var columns = Object.keys(selects);
        for(var n = 0 ; n < columns.length ; n++){
            var key = columns[n];
            var val = selects[key];

            option.type = "checkbox";
            option.value = key;

            str += "<label>" + this.#_tagInput(name + "[]", option) + val + "</label>";
        }

        var dom = Dom("#" + this.formName).child("[form-name=\"" + name + "\"]");

        if(dom){
            dom.html(str);
        }

        return this;
    }

    tagSubmit(value, option){

    }

    tagReset(value, option){

        
    }

    setValues(data){



    }
    

    #_setOptionString(option){

        var str = "";

        if(option.default){
            option.value = option.default;
            delete option.default;
        }

        var columns = Object.keys(option);
        for(var n = 0 ; n < columns.length ; n++){
            var key = columns[n];
            var val = option[key];

            str += " " + key + "=\"" + val + "\"";
        }

        return str;
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

        var getChildError = dom.child("[data-name]");
        for(var n = 0 ; n <getChildError.length ; n++){
            var gce = getChildError[n];
            gce.html("");
        }

        var getChild = dom.child("[name]");

        console.log(getChild);

        Request.refresh(getChild);

        var post = Request.get();

        if(this.existSubmitEvent()){
            this.getSubmitEvent()(post);
        }

        return this;
    }

    reset(){

        var dom = Dom("#" + this.formName);

        var getChild = dom.child("[name]");

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

    setError(validates){
        var v = validates.get();
        var columns = Object.keys(v);

        Dom("#" + this.formName + " [data-name]").html("");

        for(var n = 0 ; n < columns.length ; n++){
            var key = columns[n];
            var val = v[key].join("\n");
            Dom("#" + this.formName + " [data-name=" + key + "]").html(val);
        }
        return this;
    }
};