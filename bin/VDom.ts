import VDomControl from "VDomControl";
import Dom from "Dom";
import DomControl from "DomControl";

/**
 * VDom
 * @param refName ref name
 * @returns {VDomControl} VDomControl Class Object
 */
const VDom = function(refName){

    let v = [];
    let v1 : DomControl;
    let v2 : DomControl;

    v1 = Dom().findOnVirtual("__ref", refName);
    for(var n = 0 ; n < v1._qs.length ; n++){
        var q_ = v1._qs[n];
        v.push(q_);
    }

    v2 = Dom("[ref=\"" + refName + "\"]");
    v2.virtual("__ref", refName);
    v2.removeAttr("ref");
    for(var n = 0 ; n < v2._qs.length ; n++){
        var q_ = v2._qs[n];
        v.push(q_);
    }

    return new VDomControl(v);
};
export default VDom;