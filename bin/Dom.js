const DomControl = use("DomControl");

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
return Dom;