import DomControl from "DomControl";

/**
 * Dom
 * 
 * Get element information for DOM manipulation.
 * 
 * @param {string} selectName query selector
 * @returns {DomControl} DomControl Class Object
 */
const Dom = function(selectName? : string){

    if(selectName){
        var selector = "html " + selectName;    
    }
    else{
        var selector = "html *";
    }

    var qs = document.querySelectorAll(selector);

    return new DomControl(qs);
};
export default Dom;