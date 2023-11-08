import Data from "Data";
import FgDateTime from "FgDateTime";

interface HeadTags{
    _el;
    /**
     * remove : 
     * Delete the tag added inside the head tag
     */
    remove() : void;
}

/**
 * #### Util
 * This class provides various functions required for static.
 */
export default class Util{

    /**
     * #### getFramework
     * @returns {string} framework
     */
    public static getFramework() : string{
        // @ts-ignore
        return FRAMEWORK;
    }

    /**
     * #### base64Encode
     * Encode the text to base64 format.
     * @param {string} content text content
     * @returns {string} base64 encode content
     */
    public static base64Encode(content: string) : string{
        return btoa(unescape(encodeURIComponent(content)));
    }

    /**
     * #### base64Decode
     * Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    public static base64Decode(b64text: string) : string{
        return decodeURIComponent(escape(atob(b64text)));
    }

    /**
     * #### loadHtml
     * Read and output external modularized static HTML files.
     * @param {string} path Load source module path.
     * @returns {string} Static HTML content
     */
    public static loadHtml(path : string) : string;
    
    /**
     * #### loadHtml
     * Read and output external modularized static HTML files.
     * @param {string} path Load source module path.
     * @returns {string} Static HTML content
     */
    public static loadHtml(path : string, binds : Object) : string;

    public static loadHtml(path : string, binds? : Object) : string{
        let content = use(path);
        content = Util.base64Decode(content);
        if(binds){
            const c = Object.keys(binds);
            for(let n = 0 ; n < c.length ; n++){
                const key = c[n];
                const val = binds[key];
                content = content.replace("{" + key + "}", val);
            }
        }
        return content;
    }

    /**
     * #### uniqId
     * Generates an arbitrary string of 32 characters
     * @returns {string} uniq id string
     */
    public static uniqId() : string;

    /**
     * #### uniqId
     * generates an arbitrary string of specified length characters.
     * @param {number} length text length
     * @returns {string} uniq id string
     */
    public static uniqId(length : number) : string;

    public static uniqId(length? : number) : string{

        if(!length){
            length = 32;
        }

        const lbn : string = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str : string = "";

        for(var n = 0 ; n < length ; n++){
            let index : number = parseInt((Math.random() * 10000).toString());
            let s : string = lbn[index % lbn.length];

            str += s;
        }

        return str;
    }

    /**
     * #### ucFirst
     * Outputs text with the first letter converted to uppercase.
     * @param {string} content text content 
     * @returns {string} convert text content
     */
    public static ucFirst(content : string) : string{
        return content.substring(0,1).toUpperCase() + content.substring(1);
    }

    /**
     * #### lcFirst
     * Outputs text with the first letter converted to lowercase.
     * @param {string} content text content 
     * @returns {string} convert text content
     */
    public static lcFirst(content : string) : string{
        return content.substring(0,1).toLowerCase() + content.substring(1);
    }

    public static getClassName(string : string, classType : string) : string{
        return string.substring(0, string.indexOf(classType));
    }

    /*
    2023.11.08 abolition!
    public static searchForm(formName : string){
        if(Data.__form[formName]){
            return Data.__form[formName];
        }
    }
    */

    /**
     * #### dt
     * prints the current date and time
     * Output as fgDateTime class object
     * @returns {FgDateTime} FgDateTime class Object
     */
    public static dt() : FgDateTime;

    /**
     * #### dt
     * Get date and time from given datetime
     * Output as fgDateTime class object
     * @param {string} datetime Specified date and time
     * @returns {FgDateTime} FgDateTime class Object
     */
    public static dt(datetime : string) : FgDateTime;

    public static dt(datetime? : string) : FgDateTime{
        return new FgDateTime(datetime);
    }

    /**
     * #### sleep
     * Stop processing for a certain period of time.(Synchronous processing)  
     * This method is synchronized by executing it with await inside the asynced function.  
     * 
     * Example) 
     * 
     * await sleep(1000);        <= Stop processing for 1000ms
     * 
     * @param {number} time Stop time
     * @returns {promise<unknown>} Promise Object 
     */

    public static sleep(time : number) : Promise<unknown>{

        return new Promise(function(resolve: Function){
            setTimeout(function(){
                resolve();
            },time);
        });
    }

    /**
     * ##### promise
     * Simple version of promise class method.
     * @param callback 
     * @returns 
     */
    public static promise(callback) : Promise<unknown>{
        return new Promise(callback);
    }

    /**
     * #### addHeadTag
     * Add tags dynamically to head tag.
     * @param {string} type additional tag name
     * @returns {HeadTags} HeadTags Class Object
     */
    public static addHeadTag(type : string) : HeadTags;

    /**
     * #### addHeadTag
     * Add tags dynamically to head tag.
     * @param {string} type additional tag name
     * @param {object} option Configuration options
     * @returns {HeadTags} HeadTags Class Object
     */
    public static addHeadTag(type : string, option : object) : HeadTags;

    public static addHeadTag(type : string, option?) : HeadTags{
        if(!option){
            option = {};
        }
        let el = document.createElement(type);
        let c = Object.keys(option);
        for(let n = 0 ; n < c.length ; n++){
            let key = c[n];
            let val = option[key];
            el.setAttribute(key, val);
        }
        document.head.appendChild(el);

        return {
            _el: el,
            remove: ()=>{
                el.remove();
            },
        };
        
    }

    /**
     * #### addHeadScript
     * .Add script tag dynamically in head tag.
     * @param {string} path Loading script path
     * @returns {HeadTags} HeadTags Class Object
     */
    public static addHeadScript(path : string) : HeadTags;

    /**
     * #### addHeadScript
     * .Add script tag dynamically in head tag.
     * @param {string} path Loading script path
     * @param {object} option Configuration options
     * @returns {HeadTags} HeadTags Class Object
     */
    public static addHeadScript(path : string, option : object) : HeadTags;

    public static addHeadScript(path : string, option?) : HeadTags{
        if(!option){
            option = {};
        }
        option.src = path;
        return Util.addHeadTag("script", option);
    }

    /**
     * #### addHeadStyle : 
     * Add stylesheet loading tag dynamically in head tag.
     * @param {string} path Loading css file path
     * @returns {HeadTags} HeadTags Class Object
     */
    public static addHeadStyle(path : string) : HeadTags;

    /**
     * #### addHeadStyle : 
     * Add stylesheet loading tag dynamically in head tag.
     * @param {string} path Loading css file path    
     * @param {object} option Configuration options
     * @returns {HeadTags} HeadTags Class Object
     */
    public static addHeadStyle(path : string, option : object) : HeadTags;

    public static addHeadStyle(path : string, option?) : HeadTags{
        if(!option){
            option = {};
        }
        option.rel = "stylesheet";
        option.href = path;
        return Util.addHeadTag("link", option);
    }

};