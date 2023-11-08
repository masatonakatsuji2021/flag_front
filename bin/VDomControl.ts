import DomControl from "DomControl";
import DomStatic from "DomStatic";

export default class VDomControl extends DomControl{

    get ref() : string{
        return this.virtual("__ref");
    }

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
     * childDom
     * Specifies the child element of the argument selector,
     * @param {string} selector 
     * @returns {VDomControl} VDomControl Class Object
     */
    childDom(selector : string) : VDomControl{
        let v : DomControl = super.child(selector);
        return new VDomControl(v._qs);
    }

    /**
     * #### child
     * Specifies the child element of the argument selector,  
     * If no selector is specified, all child elements are included.  
     * If no selector argument is used, get all child elements.
     * @returns {VDomControl} VDomControl Class Object
     */
    child() : VDomControl;

    /**
     * #### child
     * Specifies the child element of the argument selector,  
     * If no selector is specified, all child elements are included.  
     * @param {string} refName ref name
     * @returns {DomControl} DomControl Class Object
     */
    child(refName : string) : VDomControl;

    child(refName? : string) : VDomControl{

        let v = [];
        let v1 : DomControl;
        let v2 : DomControl;

        v1 = super.child().findOnVirtual("__ref", refName);
        for(var n = 0 ; n < v1._qs.length ; n++){
            var q_ = v1._qs[n];
            v.push(q_);
        }

        if(!refName){
            refName = "*";
        }

        if(refName.indexOf("*") > -1){
            var rns = refName.split("*");

            if(!rns[0].trim()){
                v2 = super.child("[ref$=\"" + rns[1] + "\"]");                
            }
            else{
                v2 = super.child("[ref^=\"" + rns[0] + "\"]");
            }

            for(var n = 0 ; n < v2.length ; n++){
                var v2_ = v2.index(n);
                var ref = v2_.attr("ref");
                v2_.virtual("__ref", ref);
            }
        }
        else{
            v2 = super.child("[ref=\"" + refName + "\"]");
            v2.virtual("__ref", refName); 
        }

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
     * even
     * Extract even element information only.
     * @param {number} index element index
     * @returns {VDomControl} VDomControl Class Object
     */
    even() : VDomControl{
        let v : DomControl = super.even();
        return new VDomControl(v._qs);
    }

    /**
     * odd : 
     * Extract only odd element information
     * @returns {VDomControl} VDomControl Class Object
     */
    odd() : VDomControl{
        let v : DomControl = super.odd();
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