import Dom from "Dom";

const VDom = function(refName, qs = null){

    if(qs){
//        var v = Dom(null , qs).findOnVirtual("__ref", refName);
    }
    else{
        var v = Dom().findOnVirtual("__ref", refName);
    }

    if(!v.length){
        var v = Dom("[ref=\"" + refName + "\"]");
        v.virtual("__ref", refName);
        v.removeAttr("ref");
    }

    // @ts-ignore
    v.find = (refName)=>{

        if(refName){
            return VDom(refName, )


        }
        else{



        }


    };

    return v;
};
export default VDom;