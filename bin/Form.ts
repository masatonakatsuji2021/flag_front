import Util from "Util";
import Data from "Data";
import Dom from "Dom";
import VDom from "VDom";
import Request from "Request";

export default class Form{
    
    formName : string = null;

    /**
     * Form : 
     * Installation of each input field of the input form and setting of the initial value,
     * Class object for setting Submit/Reset event handlers, etc.
     */
    constructor();

    /**
     * Form : 
     * Installation of each input field of the input form and setting of the initial value,
     * Class object for setting Submit/Reset event handlers, etc.
     * @param {string} formName form name
     */
    constructor(formName : string);

    constructor(formName?: string){

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
    }

    /**
     * handleSubmit
     * Event handler executed when the submit button is pressed.
     * @param {object} postData Input data
     * @returns {void}
     */
    handleSubmit(postData : object){}

    /**
     * handleSubmit
     * Event handler executed when the reset button is pressed.
     * @param {object} postData Input data
     * @returns {void}
     */
    handleReset(postData : object){}

    /**
     * handleSetting
     * Event handler for input form initialization
     * @param {any} args Arguments for pass-by-value
     * @returns {void}
     */
    handleSetting(...args){}

    /**
     * setting
     * A method to start preparing the form for installation.
     * @returns {void}
     */
    setting() : void;

    /**
     * setting
     * A method to start preparing the form for installation.
     * @param {any} arvg argument
     * @returns {void}
     */
    setting(argv : any) : void;

    setting(argv? : any){
        // @ts-ignore
        this.handleSetting(argv);

        var className : string = Util.getClassName(this.constructor.name,"Form");

        if(!this.formName){
            this.formName = Util.lcFirst(className);
        }

        Data.__form[this.formName] = {
            class: className,
        };
    }

    #_getData(){
        return Data.__form[this.formName];
    }

    /**
     * tagNone
     * @param {string} name 
     * @returns 
     */
    tagNone(name : string) : Form{

        let vd = VDom(this.formName).child("form-" + name);

        if(vd){
            vd.html("");
        }

        return this;
    }

    /**
     * tagNoneM
     * @param {string} name 
     * @returns 
     */

    tagNoneM(name : string, index : number) : Form{

        let buffer = this._getMultiName(name, index);

        let vd = VDom(this.formName).child(buffer.targetName).last();

        if(vd){
            vd.html("");
        }

        return this;
    }

    /**
     * tagInput
     * Generate Input tag for input form
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
    */
    tagInput(name : string): Form;

    /**
     * tagInput
     * Generate Input tag for input form
     * @param {string} name input name
     * @param {object} option = null Option setting
     * @returns {Form} Form Class Object (method chain)
    */
    tagInput(name : string, option : object): Form;

    tagInput(name : string, option? : object) : Form{

        var str = this.#_tagInput(name, option);

        let vd = VDom(this.formName).child("form-" + name);

        if(vd){
            vd.html(str);
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

    private _getMultiName(name : string, index: number){

        let targetName = "form";
        let baseName = name;

        if(name.indexOf("*") > -1){

            let buffer = name.split(".");

            for(let n = 0 ; n < buffer.length ; n++){
                let b_ = buffer[n];

                if(b_ == "*"){
                    continue;
                }

                targetName += "-" + b_;
            }

            baseName = baseName.split("*").join(index.toString());
        }
        else{
            targetName += name;
        }

        return {
            targetName : targetName,
            baseName : baseName,
        };
    }

    tagInputM(name : string, index : number) : Form;

    tagInputM(name : string, index : number, option : object) : Form;

    tagInputM(name : string, index : number, option?) : Form{

        let buffer = this._getMultiName(name, index);

        var str = this.#_tagInput(buffer.baseName, option);

        let vd = VDom(this.formName).child(buffer.targetName).last();

        if(vd){
            vd.html(str);
        }

        return this;
    }

    /**
     * tagHidden
     * Generates an input tag for hidden attributes
     * @param {string} name input name
     * @param {any} value input value
     * @returns {Form} Form Class Object (method chain)
     */
    tagHidden(name : string, value : any) : Form;

    /**
     * tagHidden
     * Generates an input tag for hidden attributes
     * @param {string} name input name
     * @param {any} value input value
     * @param {object} option = null Option setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagHidden(name : string, value : any, option : object) : Form;

    tagHidden(name : string, value : any, option = null) : Form{

        if(option == null){
            option = {};
        }

        option.type = "hidden";

        option.value = value;

        return this.tagInput(name, option);
    }

    tagHiddenM(name : string, index : number, value : any) : Form;

    tagHiddenM(name : string, index : number, value : any, option : object) : Form;

    tagHiddenM(name : string, index : number, value : any, option?) : Form{

        if(option == null){
            option = {};
        }

        option.type = "hidden";

        option.value = value;

        return this.tagInputM(name, index, option);
    }

    /**
     * tagNumber
     * Generates a numeric input field
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
     */
    tagNumber(name : string) : Form;

    /**
     * tagNumber
     * Generates a numeric input field
     * @param {string} name input name
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagNumber(name : string, option : object) : Form;

    tagNumber(name : string, option?) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "number";

        return this.tagInput(name, option);
    }

    tagNumberM(name : string, index: number) : Form;

    tagNumberM(name : string, index: number, option : object) : Form;

    tagNumberM(name : string, index: number, option?) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "number";

        return this.tagInputM(name, index, option);
    }

    /**
     * tagPassword
     * Generate a password input field
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
     */
    tagPassword(name : string) : Form;

    /**
     * tagPassword
     * Generate a password input field
     * @param {string} name input name
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagPassword(name : string, option : object) : Form;

    tagPassword(name : string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "password";

        return this.tagInput(name, option);
    }

    tagPasswordM(name : string, index : number) : Form;

    tagPasswordM(name : string, index : number, option : object) : Form;

    tagPasswordM(name : string, index : number, option?) : Form{
        
        if(option == undefined){
            option = {};
        }

        option.type = "password";

        return this.tagInputM(name, index, option);
    }

    /**
     * tagDate
     * Generate a date input field.
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
     */
    tagDate(name : string) : Form;

    /**
     * tagDate
     * Generate a date input field.
     * @param {string} name input name
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagDate(name : string , option : object) : Form;

    tagDate(name: string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "date";

        return this.tagInput(name, option);
    }

    tagDateM(name: string, index : number) : Form;

    tagDateM(name: string, index : number, option : object) : Form;

    tagDateM(name: string, index : number, option?) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "date";

        return this.tagInputM(name, index, option);
    }

    /**
     * tagTime
     * Generate a time input field
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
     */
    tagTime(name : string) : Form;

    /**
     * tagTime
     * Generate a time input field
     * @param {string} name input name
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagTime(name : string , option : object) : Form;

    tagTime(name: string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "time";

        return this.tagInput(name, option);
    }

    tagTimeM(name: string, index : number) : Form;

    tagTimeM(name: string, index : number, option : object) : Form;
        
    tagTimeM(name: string, index : number, option?) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "time";

        return this.tagInputM(name, index, option);
    }

    /**
     * tagColor
     * Generates a color picker input field
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
     */
    tagColor(name: string) : Form;

    /**
     * tagColor
     * Generates a color picker input field
     * @param {string} name input name
     * @param {object} option =null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagColor(name: string, option : object) : Form;

    tagColor(name: string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "color";

        return this.tagInput(name, option);
    }

    tagColorM(name: string, index : number) : Form;

    tagColorM(name: string, index : number, option : object) : Form;

    tagColorM(name: string, index : number, option?) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "color";

        return this.tagInputM(name, index, option);
    }

    /**
     * tagFile
     * Generate input fields for attachments
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
     */
    tagFile(name : string) : Form;

    /**
     * tagFile
     * Generate input fields for attachments
     * @param {string} name input name
     * @param {object} option Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagFile(name : string, option : object) : Form;

    tagFile(name : string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "file";

        return this.tagInput(name, option);
    }

    tagFileM(name : string, index : number) : Form;

    tagFileM(name : string, index : number, option : object) : Form;

    tagFileM(name : string, index : number, option?) : Form{

        if(option == undefined){
            option = {};
        }

        option.type = "file";

        return this.tagInputM(name, index, option);
    }

    /**
     * tagSelect
     * Generates selection fields for pull-down menus
     * @param {string} name input name
     * @param {object} selects pull-down information
     * @returns {Form} Form Class Object (method chain)
     */
    tagSelect(name : string, selects : object) : Form;

    /**
     * tagSelect
     * Generates selection fields for pull-down menus
     * @param {string} name input name
     * @param {object} selects pull-down information
     * @param {object} option Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagSelect(name : string, selects : object, option : object) : Form;

    tagSelect(name : string, selects : object, option = null) : Form{

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

        let vd = VDom(this.formName).child("form-" + name);

        if(vd){
            vd.html(str);
        }

        return this;
    }

    tagSelectM(name : string, index : number, selects : object) : Form;

    tagSelectM(name : string, index : number, selects : object, option : object) : Form;

    tagSelectM(name : string, index : number, selects : object, option?) : Form{

        let buffer = this._getMultiName(name, index);

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

        var str = "<select name=\"" + buffer.baseName + "\" " + optionStr + ">" + selectStr + "</select>";

        let vd = VDom(this.formName).child(buffer.targetName).last();

        if(vd){
            vd.html(str);
        }

        return this;
    }



    /**
     * tagTextarea
     * Generates a textarea input field
     * @param {string} name input name
     * @returns {Form} Form Class Object (method chain)
     */
    tagTextarea(name : string) : Form;

    /**
     * tagTextarea
     * Generates a textarea input field
     * @param {string} name input name
     * @param {object} option Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagTextarea(name : string, option : object) : Form;

    tagTextarea(name : string, option = null) : Form{

        if(option == undefined){
            option = {};
        }

        var optionStr = this.#_setOptionString(option);

        var str = "<textarea name=\"" + name + "\" " + optionStr + "></textarea>";

        let vd = VDom(this.formName).child("form-" + name);

        if(vd){
            vd.html(str);
        }

        return this;
    }

    tagTextareaM(name : string, index : number) : Form;

    tagTextareaM(name : string, index : number, option : object) : Form;

    tagTextareaM(name : string, index : number, option?) : Form{

        let buffer = this._getMultiName(name, index);

        if(option == undefined){
            option = {};
        }

        var optionStr = this.#_setOptionString(option);

        var str = "<textarea name=\"" + buffer.baseName + "\" " + optionStr + "></textarea>";

        let vd = VDom(this.formName).child(buffer.targetName).last();

        if(vd){
            vd.html(str);
        }

        return this;
    }

    /**
     * tagRadio
     * Generates a radio button selection field
     * @param {string} name input name
     * @param {object} selects radio-buttons information
     * @returns {Form} Form Class Object (method chain)
     */
    tagRadio(name : string, selects : object) : Form;
    
    /**
     * tagRadio
     * Generates a radio button selection field
     * @param {string} name input name
     * @param {object} selects radio-buttons information
     * @param {object} option Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagRadio(name : string, selects : object, option : object) : Form;

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

        let vd = VDom(this.formName).child("form-" + name);

        if(vd){
            vd.html(str);
        }

        return this;
    }

    tagRadioM(name : string, index : number, selects : object) : Form;

    tagRadioM(name : string, index : number, selects : object, option : object) : Form;

    tagRadioM(name : string, index : number, selects : object, option?) : Form{

        let buffer = this._getMultiName(name, index);

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

            str += "<label>" + this.#_tagInput(buffer.baseName, option) + val + "</label>";
        }

        let vd = VDom(this.formName).child(buffer.targetName).last();

        if(vd){
            vd.html(str);
        }

        return this;
    }

    /**
     * tagCheckbox
     * 
     * Generates checkbox selection fields
     * 
     * @param {string} name input name
     * @param {object} selects checkbox information
     * @returns {Form} Form Class Object (method chain)
     */
    tagCheckbox(name : string, selects : object) : Form;

    /**
     * tagCheckbox
     * Generates checkbox selection fields
     * @param {string} name input name
     * @param {object} selects checkbox information
     * @param {object} option Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagCheckbox(name : string, selects : object, option : object) : Form;

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

            str += "<label>" + this.#_tagInput(name, option) + val + "</label>";
        }

        let vd = VDom(this.formName).child("form-" + name);

        if(vd){
            vd.html(str);
        }

        return this;
    }

    tagCheckboxM(name : string, index : number, selects : object) : Form;

    tagCheckboxM(name : string, index : number, selects : object, option : object) : Form;

    tagCheckboxM(name : string, index : number, selects : object, option?) : Form{

        let buffer = this._getMultiName(name, index);

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

            str += "<label>" + this.#_tagInput(buffer.baseName, option) + val + "</label>";
        }

        let vd = VDom(this.formName).child(buffer.targetName).last();

        if(vd){
            vd.html(str);
        }

        return this;
    }


    /**
     * tagButton
     * 
     * generate a button
     * 
     * @param {string} name button name
     * @param {string} value display text
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagButton(name : string, value: string, option = null) : Form{

        if(option == null){
            option = {};
        }

        option.type = "button";
        option.default = value;

        return this.tagInput(name, option);
    }

    tagButtonM(name : string, index : number, value: string, option = null) : Form{

        if(option == null){
            option = {};
        }

        option.type = "button";
        option.default = value;

        return this.tagInputM(name, index, option);
    }
    
    /**
     * tagButton
     * 
     * Generate a Submit button
     * 
     * @param {string} name button name
     * @param {string} value display text
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagSubmit(name : string, value : string, option = null) : Form{

        if(option == null){
            option = {};
        }

        option.type = "submit";
        option.default = value;

        return this.tagInput(name, option);
    }

    /**
     * tagButton
     * 
     * Generate a Reset button
     * 
     * @param {string} name button name
     * @param {string} value display text
     * @param {object} option = null Option Setting
     * @returns {Form} Form Class Object (method chain)
     */
    tagReset(name : string, value : string, option = null) : Form{
        
        if(option == null){
            option = {};
        }

        option.type = "reset";
        option.default = value;

        return this.tagInput(name, option);
    }

    /**
     * setValues
     * 
     * Set the initial value in the input field.
     * If a reset event occurs, all values and selection values set here will be cleared.
     * 
     * After the reset event occurs, 
     * if you want to return to the set value, 
     * please use the "setDefaults" method instead
     * 
     * @param {object} data Setting data
     * @returns {Form} Form Class Object (method chain)
     */
    setValues(data? : object) : Form{
        if(data){
            return this.#_setDefaultsAndValues(data, 0);
        }
        else{
            return this.#_setClearValues();
        }
    }
    
    /**
     * setDefaults
     * 
     * Set the initial value in the input field.
     * If a reset event occurs, revert to the set value.
     * 
     * @param {object} data Setting data
     * @returns {Form} Form Class Object (method chain)
     */
    setDefaults(data? : object) : Form{
        if(data){
            return this.#_setDefaultsAndValues(data, 1);
        }
        else{
            return this.#_setClearValues();
        }
    }

    #_setDefaultsAndValues(data: object , type : number, baforeName? : string) : Form{

        if(!baforeName){
            baforeName = "";
        }

        let columns = Object.keys(data);

        for(var n = 0 ; n < columns.length ; n++){
            let name = columns[n];
            let value = data[name];

            if(typeof value == "object"){
                if(!Array.isArray(value)){
                    let beforeName_ = baforeName + name + ".";
                    this.#_setDefaultsAndValues(value, type, beforeName_);
                    continue;
                }
            }

            let targetName = "";
            if(baforeName){
                targetName = baforeName + name;
            }
            else{
                targetName = name;                
            }

            var vd = VDom(this.formName).childDom("[name=\"" + targetName + "\"]");

            if(vd){
                if(type == 0){
                    vd.value(value);
                }
                else if(type == 1){
                    vd.default(value);
                }
            }
        }

        return this;
    }

    #_setClearValues(){

        var vd = VDom(this.formName).childDom("[name]");

        if(vd){
            vd.value("");
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

    /**
     * submit
     * 
     * actively execute the submit event.
     * 
     * @returns {Form} Form Class Object (method chain)
     */
    submit() : Form{

        var vd = VDom(this.formName);

        var getChildError = vd.child("error-*");
        for(var n = 0 ; n <getChildError.length ; n++){
            var gce = getChildError.index(n);
            gce.html("");
        }

        var getChild = vd.childDom("[name]");

        Request.refresh(getChild);

        var post = Request.get();

        if(this.existSubmitEvent()){
            this.getSubmitEvent()(post);
        }

        return this;
    }

    /**
     * reset
     * 
     * actively execute the reset event
     * 
     * @returns {Form} Form Class Object (method chain)
     */
    reset() : Form{

        var getChild = VDom(this.formName).childDom("[name]");

        Request.refresh(getChild);
    
        var post = Request.get();

        if(this.existResetEvent()){
            this.getResetEvent()(post);
        }

        return this;
    }

    /**
     * onSubmit
     * 
     * A method for setting the callback for the Submit event.
     * When submitted, the callback function specified in this argument will be executed.
     * 
     * @param {Function} callback Submit runtime callback
     * @returns {Form} Form Class Object (method chain)
     */
    onSubmit(callback : Function) : Form{
        Data.__form[this.formName].eventSubmit = callback;
        return this;
    }

    /**
     * onReset
     * 
     * A method for setting the callback for the Reset event.
     * When resetted, the callback function specified in this argument will be executed.
     * 
     * @param {Function} callback Reset runtime callback
     * @returns {Form} Form Class Object (method chain)
     */
    onReset(callback : Function) : Form{
        Data.__form[this.formName].eventReset = callback;
         return this;
    }

    /**
     * setError
     * 
     * display error results.
     * 
     * @param validates 
     * @returns {Form} Form Class Object (method chain)
     */
    setError(validates){

        if(validates.constructor.name == "ValidateResult"){
            var v = validates.get();
        }
        else{
            var v = validates;
        }
        var columns = Object.keys(v);

        VDom(this.formName).child("error-*").html("");

        for(var n = 0 ; n < columns.length ; n++){
            var key = columns[n];
            var val = v[key];
            
            if(typeof val == "string"){
                val = [ val ];
            }
            val = val.join("\n");
            VDom(this.formName).child("error-" + key).html(val);
        }

        return this;
    }

    getDom(name : string){

        let res = VDom(this.formName).childDom("[name=" + name + "]");

        if(res.length){
            return res;
        }

        res = VDom(this.formName).child("form-" + name).childDom("input");
        return res;
    }
};