import Util from "Util";
import Dom from "Dom";
import DomControl from "DomControl";

/**
 * Dialog : 
 * A class object for displaying the dialog by default.
 */
export default class Dialog{

    /**
     * open : 
     * show a dialog
     * @param {string} contents dialog window content
     * @returns {DomControl} DomControl Class Object
     */
    open(contents : string) : DomControl;

    /**
     * open : 
     * show a dialog
     * @param {string} contents dialog window content
     * @param {object} option Option Setting
     * @returns {DomControl} DomControl Class Object
     */
    open(contents : string, option : object) : DomControl;

    open(contents : string, option = null) : DomControl{

        if(option == null){
            option = {};
        }

        var uid = Util.uniqId();
        var baseHtml = use("DialogHtml");
        baseHtml = Util.base64Decode(baseHtml);
        baseHtml = baseHtml.split("{{uid}}").join(uid);
        baseHtml = baseHtml.split("{{contents}}").join(contents);
        Dom("body").append(baseHtml);

        var v = Dom("[data-uid=\"" + uid + "\"]");

        if(option.class){
            v.child(".window").addClass(option.class);
        }

        return v;
    }

    /**
     * loading : 
     * Show loading dialog
     * @returns {DomControl} DomControl Class Object
     */
    loading() : DomControl;

    /**
     * loading : 
     * Show loading dialog
     * @param {string} message text message
     * @returns {DomControl} DomControl Class Object
     */
    loading(message : string) : DomControl;

    /**
     * loading : 
     * Show loading dialog
     * @param {string} message text message
     * @param {object} option Option Setting
     * @returns {DomControl} DomControl Class Object
     */
    loading(message : string, option: object) : DomControl;

    loading(message : string = null, option = null) : DomControl{

        if(!option){
            option = {};
        }

        if(!option.class){
            option.class = [];
        }
        option.class.push("loading_circle");

        var str = "<div class=\"icon\"></div>";
        if(message){
            str += "<div class=\"message\">" + message + "</div>";
        }

        var v = this.open(str, option);

        return v;
    }

    /**
     * alert : 
     * Displays a dialog for displaying alerts
     * @param {string} message alert message
     * @returns {DomControl} DomControl Class Object
     */
    alert(message : string): DomControl;

    /**
     * alert : 
     * Displays a dialog for displaying alerts
     * @param {string} message alert message
     * @param {string} title alert title
     * @returns {DomControl} DomControl Class Object
     */
    alert(message : string, title : string): DomControl;

    /**
     * alert : 
     * Displays a dialog for displaying alerts
     * @param {string} message alert message
     * @param {string} title alert title
     * @param {object} option Option Setting
     * @returns {DomControl} DomControl Class Object
     */
    alert(message : string, title : string, option : object): DomControl;

    alert(message : string, title : string = null, option = null) : DomControl{

        if(option == null){
            option = {};
        }

        if(!option.close){
            option.close = {};
        }

        if(!option.close.text){
            option.close.text = "Close";
        }

        var str = "<div class=\"message\">" + message + "</div><div style=\"text-align:right\"><a class=\"close_btn\">" + option.close.text + "</a></div>";

        if(title){
            str = "<div class=\"title\">" + title + "</div>" + str;
        }

        var v = this.open(str, option);

        v.child(".close_btn").on("click", ()=>{
            if(option.close.callback){
                option.close.callback.bind(v)();
            }
            v.remove();
        });

        return v;
    }

};