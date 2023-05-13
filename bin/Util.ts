import Data from "Data";
import FgDateTime from "FgDateTime";

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
};
