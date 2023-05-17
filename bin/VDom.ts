import VDomControl from "VDomControl";
import Dom from "Dom";
import DomControl from "DomControl";
import DomStatic from "DomStatic";

/**
 * VDom
 * @param refName ref name
 * @returns {VDomControl} VDomControl Class Object
 */
const VDom = function(refName? : string){

    let v = [];
    
    if(refName){
        let v1 : DomControl;
        let v2 : DomControl;

        v1 = Dom().findOnVirtual("__ref", refName);
        for(var n = 0 ; n < v1._qs.length ; n++){
            var q_ = v1._qs[n];
            v.push(q_);
        }
       
        if(refName.indexOf("*") > -1){

            var rns = refName.split("*");

            let selector : string = "";

            if(!rns[0].trim()){
                selector = "[ref$=\"" + rns[1] + "\"]";
            }
            else{
                selector = "[ref^=\"" + rns[0] + "\"]";
            }

            v2 = Dom(selector);

            for(var n = 0 ; n < v2.length ; n++){
                var v2_ = v2.index(n);
                var refName2 = v2_.attr("ref");
                v2_.virtual("__ref", refName2);
            }

        }
        else{
            v2 = Dom("[ref=\"" + refName + "\"]");
            v2.virtual("__ref", refName);
        }

        v2.removeAttr("ref");
        for(var n = 0 ; n < v2._qs.length ; n++){
            var q_ = v2._qs[n];
            v.push(q_);
        }
    }

    return new VDomControl(v);
};
export default VDom;