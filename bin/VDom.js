const Dom = use("Dom");

const VDom = function(refName, qs){

    if(qs){
        var v = Dom(null ,qs).findOnVirtual("__ref", refName);
    }
    else{
        var v = Dom().findOnVirtual("__ref", refName);
    }

    if(!v.length){
        var v = Dom("[ref=\"" + refName + "\"]");
        v.virtual("__ref", refName);
        v.removeAttr("ref");
    }

    v.find = (refName)=>{

        if(refName){
            return VDom(refName, )


        }
        else{



        }


    };

    return v;
};
return VDom;