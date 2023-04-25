const DomControl = use("DomControl");

const Dom = function(selectName){

    if(selectName){
        var selector = "[spa-contents] " + selectName;    
    }
    else{
        var selector = "[spa-contents]";
    }

    var qs = document.querySelector(selector);

    return qs;

    return new DomControl(qs);
};
return Dom;