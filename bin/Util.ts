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

export default new class Util{

    /**
     * base64Encode : 
     * Encode the text to base64 format
     * @param {string} content text content
     * @returns {string} base64 encode content
     */
    base64Encode(content: string) : string{
        return btoa(unescape(encodeURIComponent(content)));
    }

    /**
     * base64Decode : 
     * Decode base64 text to plaintext
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    base64Decode(b64text: string) : string{
        return decodeURIComponent(escape(atob(b64text)));
    }

    /**
     * uniqId : 
     * Generates an arbitrary string of 32 characters
     * @returns {string} uniq id string
     */
    uniqId() : string;

    /**
     * uniqId : 
     * generates an arbitrary string of specified length characters
     * @param {number} length text length
     * @returns {string} uniq id string
     */
    uniqId(length : number) : string;

    uniqId(length: number = null){

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
     * ucFirst : 
     * Outputs text with the first letter converted to uppercase
     * @param {string} content text content 
     * @returns {string} convert text content
     */
    ucFirst(content : string) : string{
        return content.substring(0,1).toUpperCase() + content.substring(1);
    }

    /**
     * lcFirst : 
     * Outputs text with the first letter converted to lowercase
     * @param {string} content text content 
     * @returns {string} convert text content
     */
    lcFirst(content : string) : string{
        return content.substring(0,1).toLowerCase() + content.substring(1);
    }

    getClassName(string : string, classType : string) : string{
        return string.substring(0, string.indexOf(classType));
    }

    searchForm(formName : string){
        if(Data.__form[formName]){
            return Data.__form[formName];
        }
    }

    /**
     * dt
     * prints the current date and time
     * Output as fgDateTime class object
     * @returns {FgDateTime} FgDateTime class Object
     */
    dt() : FgDateTime;

    /**
     * dt
     * Get date and time from given datetime
     * Output as fgDateTime class object
     * @param {string} datetime Specified date and time
     * @returns {FgDateTime} FgDateTime class Object
     */
    dt(datetime : string) : FgDateTime;

    dt(datetime? : string) : FgDateTime{
        return new FgDateTime(datetime);
    }

    /**
     * sleep : 
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

    sleep(time : number) : Promise<unknown>{

        return new Promise(function(resolve: Function){
            setTimeout(function(){
                resolve();
            },time);
        });
    }

    promise(callback) : Promise<unknown>{
        return new Promise(callback);
    }

    /**
     * addHeadTag : 
     * Add tags dynamically to head tag
     * @param {string} type additional tag name
     * @returns {HeadTags} HeadTags Class Object
     */
    addHeadTag(type : string) : HeadTags;

    /**
     * addHeadTag : 
     * Add tags dynamically to head tag
     * @param {string} type additional tag name
     * @param {object} option Configuration options
     * @returns {HeadTags} HeadTags Class Object
     */
    addHeadTag(type : string, option : object) : HeadTags;

    addHeadTag(type : string, option?) : HeadTags{
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
     * addHeadScript : 
     * .Add script tag dynamically in head tag
     * @param {string} path Loading script path
     * @returns {HeadTags} HeadTags Class Object
     */
    addHeadScript(path : string) : HeadTags;

    /**
     * addHeadScript : 
     * .Add script tag dynamically in head tag
     * @param {string} path Loading script path
     * @param {object} option Configuration options
     * @returns {HeadTags} HeadTags Class Object
     */
    addHeadScript(path : string, option : object) : HeadTags;

    addHeadScript(path : string, option?) : HeadTags{
        if(!option){
            option = {};
        }
        option.src = path;
        return this.addHeadTag("script", option);
    }

    /**
     * addHeadStyle : 
     * Add stylesheet loading tag dynamically in head tag
     * @param {string} path Loading css file path
     * @returns {HeadTags} HeadTags Class Object
     */
    addHeadStyle(path : string) : HeadTags;

    /**
     * addHeadStyle : 
     * Add stylesheet loading tag dynamically in head tag
     * @param {string} path Loading css file path    
     * @param {object} option Configuration options
     * @returns {HeadTags} HeadTags Class Object
     */
    addHeadStyle(path : string, option : object) : HeadTags;

    addHeadStyle(path : string, option?) : HeadTags{
        if(!option){
            option = {};
        }
        option.rel = "stylesheet";
        option.href = path;
        return this.addHeadTag("link", option);
    }

};