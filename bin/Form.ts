import Util from "Util";
import Data from "Data";
import Dom from "Dom";
import Request from "Request";


export default class Form{
    
    formName: string = null;

    /**
     * Form
     * 
     * Installation of each input field of the input form and setting of the initial value,
     * Class object for setting Submit/Reset event handlers, etc.
     */
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

    /**
     * handleSubmit
     * 
     * Event handler executed when the submit button is pressed.
     * @param {object} postData Input data
     */
    handleSubmit(postData : object){}

    
    /**
     * handleSubmit
     * 
     * Event handler executed when the reset button is pressed.
     * @param {object} postData Input data
     */
    handleReset(postData : object){}

    /**
     * handleSetting
     * 
     * Event handler for input form initialization
     * @param {any} args Arguments for pass-by-value
     */
    handleSetting(...args){}

    // @ts-ignore
    setting(...argv){
        // @ts-ignore
        this.handleSetting(...argv);
    }

    #_getData(){
        return Data.__form[this.formName];
    }

    /**
     * tagInput
     * 
     * Generate Input tag for input form
     * 
     * @param {string} name input name
     * @param {object} option = null Option setting
     * @returns {Form} Form Class Object (method chain)
    */
    tagInput(name : string, option : object= null) : Form{

        var str = this.#_tagInput(name, option);

        var dom = Dom("#" + this.formName).child("[form-name=\"" + name + "\"]");

        if(dom){
            dom.html(str);
        }

        return this;
    }

    #_tagInput(name : string, option) : string{

        if(option == null){
            option = {};
        }

        if(!option.type){
            option.type = "text";
        }

        var optionStr = this.#_setOptionString(option);

        if(
            option.type == "submit" || 
            option.type == "button" || 
            option.type == "image" || 
            option.type == "reset" 
        ){
            var str = "<input " + optionStr + ">";
        }
        else{
            var str = "<input name=\"" + name + "\" " + optionStr + ">";
        }


        return str;
    }

    tagHidden(name : string, value : any, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "hidden";

        option.value = value;

        return this.tagInput(name, option);
    }

    tagNumber(name : string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "number";

        return this.tagInput(name, option);
    }

    tagPassword(name : string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "password";

        return this.tagInput(name, option);
    }

    tagFile(name : string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "file";

        return this.tagInput(name, option);
    }

    tagSelect(name : string, selects : Object, option = null) : Form{

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

    tagTextarea(name : string, option = null) : Form{

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

    tagRadio(name : string, selects : object, option = null) : Form{

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

    tagCheckbox(name : string, selects : object, option = null) : Form{

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

    tagButton(name : string, value: string, option = null) : Form{

        if(option == null){
            option = {};
        }

        option.type = "button";
        option.default = value;

        return this.tagInput(name, option);
    }

    tagSubmit(name : string, value : string, option = null) : Form{

        if(option == null){
            option = {};
        }

        option.type = "submit";
        option.default = value;

        return this.tagInput(name, option);
    }

    tagReset(name : string, value : string, option = null) : Form{
        
        if(option == null){
            option = {};
        }

        option.type = "reset";
        option.default = value;

        return this.tagInput(name, option);
    }

    setValues(data : object) : Form{
        return this.#_setDefaultsAndValues(data, 0);
    }
    
    setDefaults(data : object) : Form{
        return this.#_setDefaultsAndValues(data, 1);
    }

    #_setDefaultsAndValues(data: object , type : number) : Form{

        let columns = Object.keys(data);

        for(var n = 0 ; n < columns.length ; n++){
            let name = columns[n];
            let value = data[name];

            var dom = Dom("#" + this.formName).child("[name=\"" + name + "\"]");

            if(dom){

                if(type == 0){
                    dom.value(value);
                }
                else if(type == 1){
                    dom.attr("value", value);
                }

            }
        }

        return this;
    }

    #_setOptionString(option) : string{

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

    existSubmitEvent() : boolean{

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

    existResetEvent() : boolean{

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

    getSubmitEvent() : Function{
        if(this.constructor.name == "Form"){
            return this.#_getData().eventSubmit;
        }
        else{
            return this.handleSubmit;
        }
    }

    getResetEvent() : Function{
        if(this.constructor.name == "Form"){
            return this.#_getData().eventReset;
        }
        else{
            return this.handleReset;
        }
    }

    submit() : Form{

        var dom = Dom("#" + this.formName);

        var getChildError = dom.child("[data-name]");
        for(var n = 0 ; n <getChildError.length ; n++){
            var gce = getChildError[n];
            gce.html("");
        }

        var getChild = dom.child("[name]");

        Request.refresh(getChild);

        var post = Request.get();

        if(this.existSubmitEvent()){
            this.getSubmitEvent()(post);
        }

        return this;
    }

    reset() : Form{

        var dom = Dom("#" + this.formName);

        var getChild = dom.child("[name]");

        Request.refresh(getChild);
    
        var post = Request.get();

        if(this.existResetEvent()){
            this.getResetEvent()(post);
        }

        return this;
    }

    onSubmit(callback : Function) : Form{
        Data.__form[this.formName].eventSubmit = callback;
        return this;
    }

    onReset(callback : Function) : Form{
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