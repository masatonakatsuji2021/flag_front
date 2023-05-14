import VDomControl from "VDomControl";
import Dom from "Dom";
import DomControl from "DomControl";

const VDom = function(refName, qs = null){

    let v : DomControl;

    if(qs){
        v = new DomControl(qs).findOnVirtual("__ref", refName);
    }
    else{
        v = Dom().findOnVirtual("__ref", refName);
    }

    if(!v.length){
        v = Dom("[ref=\"" + refName + "\"]");
        v.virtual("__ref", refName);
    }

    return new VDomControl(v._qs);

};
export default VDom;