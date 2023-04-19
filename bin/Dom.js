const Dom = function(selectName){

    if(selectName){
        var selector = "[spa-contents] " + selectName;    
    }
    else{
        var selector = "[spa-contents]";
    }

    var dom = document.querySelector(selector);
    return dom;
};
return Dom;