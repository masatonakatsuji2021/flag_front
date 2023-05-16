import DomControl from "DomControl";
import DomStatic from "DomStatic";

export default class VDomControl extends DomControl{

    /**
     * refresh
     * @returns {VDomControl} VDomCOntrol Class Object 
     */
    refresh(){

        const refCheckCode = "__refcheck__";

        let c = Object.keys(DomStatic.__uids);
        for(var n = 0 ; n < c.length ; n++){
            var uid = c[n];
            var obj = DomStatic.__uids[uid];

            obj.target.setAttribute(refCheckCode, uid);
            if(!document.querySelector("[" + refCheckCode + "=\"" + uid + "\"]")){
                delete DomStatic.__uids[uid];
            }
            obj.target.removeAttribute(refCheckCode);
        }

        return this;
    }
    
    /**
     * child
     * Specifies the child element of the argument selector,
     * If no selector is specified, all child elements are included
     * @param {string} refName ref name
     * @returns {VDomControl} VDomControl Class Object
     */
    child(refName : string) : VDomControl{

        let v = [];
        let v1 : DomControl;
        let v2 : DomControl;

        v1 = super.child().findOnVirtual("__ref", refName);
        for(var n = 0 ; n < v1._qs.length ; n++){
            var q_ = v1._qs[n];
            v.push(q_);
        }
            
        v2 = super.child("[ref=\"" + refName + "\"]");
        v2.virtual("__ref", refName);
        v2.removeAttr("ref");
        for(var n = 0 ; n < v2._qs.length ; n++){
            var q_ = v2._qs[n];
            v.push(q_);
        }

        return new VDomControl(v);
    }

    /**
     * first
     * Specifies the first element.
     * @returns {VDomControl} VDomControl Class Object
     */
    first() : VDomControl{
        let v : DomControl = super.first();
        return new VDomControl(v._qs);
    }
    
    /**
     * last
     * Specifies the last element.
     * @returns {VDomControl} VDomControl Class Object
     */
    last() : VDomControl{
        let v : DomControl = super.last();
        return new VDomControl(v._qs);
    }

    /**
     * parent
     * Specifies the parent element one level above.
     * @returns {VDomControl} VDomControl Class Object
     */
    parent() : VDomControl{
        let v : DomControl =super.parent();
        return new VDomControl(v._qs);
    }

    /**
     * index
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {VDomControl} VDomControl Class Object
     */
    index(index : number) : VDomControl{
        let v : DomControl = super.index(index);
        return new VDomControl(v._qs);
    }

    /**
     * findOnAttr
     * Specifies only elements that contain attribute information that matches the conditions of the argument.
     * @param {string} name attribute name
     * @param {string|number} value attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    findOnAttr(name : string, value) : VDomControl{
        let v : DomControl = super.findOnAttr(name, value);
        return new VDomControl(v._qs);
    }

    /**
     * findOnVirtual
     * Specify only elements that contain Virtual attribute information that matches the argument conditions.
     * @param {string} name virtual attribute name
     * @param {string|number} value virtual attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    findOnVirtual(name : string, value) : VDomControl{
        let v : DomControl = super.findOnVirtual(name, value);
        return new VDomControl(v._qs);
    }

    
}