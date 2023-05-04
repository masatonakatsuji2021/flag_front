import DomControl from "DomControl";

const Dom = function(selectName){

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