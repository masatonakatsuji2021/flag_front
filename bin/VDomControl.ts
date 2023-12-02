import DomControl from "DomControl";
import DomStatic from "DomStatic";

export default class VDomControl extends DomControl{

    public get ref() : string{
        return this.virtual("__ref");
    }

    /**
     * ***refresh*** : 
     * @returns {VDomControl} VDomCOntrol Class Object 
     */
    public refresh(){

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
     * #### child
     * Specifies the child element of the argument selector,  
     * If no selector is specified, all child elements are included.  
     * If no selector argument is used, get all child elements.
     * @returns {VDomControl} VDomControl Class Object
     */
    public child() : VDomControl;

    /**
     * #### child
     * Specifies the child element of the argument selector,  
     * If no selector is specified, all child elements are included.  
     * @param {string} refName ref name
     * @returns {DomControl} DomControl Class Object
     */
    public child(refName : string) : VDomControl;

    public child(refName? : string) : VDomControl{
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
     * ***first*** : 
     * Specifies the first element.
     * @returns {VDomControl} VDomControl Class Object
     */
    public get first() : VDomControl{
        let v : DomControl = super.first;
        return new VDomControl(v._qs);
    }
    
    /**
     * ***last*** : 
     * Specifies the last element.
     * @returns {VDomControl} VDomControl Class Object
     */
    public get last() : VDomControl{
        let v : DomControl = super.last;
        return new VDomControl(v._qs);
    }

    /**
     * ***parent*** : 
     * Specifies the parent element one level above.
     * @returns {VDomControl} VDomControl Class Object
     */
    public get parent() : VDomControl{
        let v : DomControl =super.parent;
        return new VDomControl(v._qs);
    }

    /**
     * ***index*** : 
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {VDomControl} VDomControl Class Object
     */
    public index(index : number) : VDomControl{
        let v : DomControl = super.index(index);
        return new VDomControl(v._qs);
    }
    
    /**
     * ***even*** : 
     * Extract even element information only.
     * @returns {VDomControl} VDomControl Class Object
     */
    public get even() : VDomControl{
        const v : DomControl = super.even;
        return new VDomControl(v._qs);
    }

    /**
     * ***odd** : 
     * Extract only odd element information
     * @returns {VDomControl} VDomControl Class Object
     */
    public get odd() : VDomControl{
        const v : DomControl = super.odd;
        return new VDomControl(v._qs);
    }

    /**
     * findOnAttr
     * Specifies only elements that contain attribute information that matches the conditions of the argument.
     * @param {string} name attribute name
     * @param {string|number} value attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    public findOnAttr(name : string, value) : VDomControl{
        const v : DomControl = super.findOnAttr(name, value);
        return new VDomControl(v._qs);
    }

    /**
     * findOnVirtual
     * Specify only elements that contain Virtual attribute information that matches the argument conditions.
     * @param {string} name virtual attribute name
     * @param {string|number} value virtual attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    public findOnVirtual(name : string, value) : VDomControl{
        const v : DomControl = super.findOnVirtual(name, value);
        return new VDomControl(v._qs);
    }    

        /**
     * ***append*** : 
     * add element tag.
     * @param {string} contents add contents 
     * @returns {VDomControl} VDomControl Class Object
     */
    public append(appendHtmlContent : string) : VDomControl;

    /**
     * ***append*** : 
     * add element Object.
     * @param {string} contents add contents 
     * @returns {VDomControl} VDomControl Class Object
     */
    public append(appendElement : Element) : VDomControl;
    
    public append(contents) : VDomControl{
        const v : DomControl = super.append(contents);
        return new VDomControl(v._qs);
    }

    /**
     * ***before*** : 
     * Append just before the element tag
     * @param {string} contents add contents 
     * @returns {VDomControl} VDomControl Class Object
     */
    public before(beforeHtmlContent : string) : VDomControl;

    /**
     * ***before*** : 
     * Append just before the element object.
     * @param {string} contents add contents 
     * @returns {VDomControl} VDomControl Class Object
     */
    public before(beforeElement : Element) : VDomControl;
    
    public before(contents) : VDomControl{
        const v : DomControl = super.before(contents);
        return new VDomControl(v._qs);
    }

    /**
     * ***after*** : 
     * Append right after the element tag
     * @param {string} contents add after contents 
     * @returns {VDomControl} VDomControl Class Object
     */
    public after(beforeHtmlContent : string) : VDomControl;

    /**
     * ***after*** : 
     * Append right after the element tag
     * @param {Element} beforeElement add after contents Element object
     * @returns {VDomControl} VDomControl Class Object
     */
    public after(beforeElement : Element) : VDomControl;

    public after(contents) : VDomControl{
        const v : DomControl = super.after(contents);
        return new VDomControl(v._qs);
    }


    /**
     * ***remove*** : 
     * remove the element
     * @returns {VDomControl} VDomControl Class Object
     */
    public remove() : VDomControl{
        const v : DomControl = super.remove();
        return new VDomControl(v._qs);
    }

    /**
     * ***empty*** : 
     * clear inside element
     * @returns {VDomControl} VDomControl Class Object
     */
    public empty() : VDomControl{
        const v : DomControl = super.empty();
        return new VDomControl(v._qs);
    }

    /**
     * ***on*** : 
     * set the event handler.
     * @param {string} eventName event name
     * @param {Function} callback callback function
     * @returns {VDomControl} VDomControl Class Object
     */
    public on(eventName : string, callback : Function) : VDomControl{
        const v : DomControl = super.on(eventName, callback);
        return new VDomControl(v._qs);
    }

        /**
     * ***attribute*** : 
     * get attribute information
     * @param {string} name attribute name
     * @returns {string} attribute value
     */
    public attribute(name: string): string;

    /**
     * ***attribute*** : 
     * Set attribute information
     * @param {string} name attribute name
     * @param value attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    public attribute(name: string, value : any) : VDomControl;
    
    public attribute(name : string, value? : any) : string | VDomControl{
        const v = super.attribute(name, value);
        if(typeof v == "string"){
            return v;
        }
        else{
            return new VDomControl(v._qs);
        }
    }

    /**
     * ***attr*** : 
     * get attribute information
     * @param {string} name attribute name
     * @returns {string} attribute value
     */
    public attr(name : string): string;

    /**
     * ***attr*** : 
     * Set attribute information
     * @param {string} name attribute name
     * @param value attribute value
     * @returns {VDomControl} VDomControl Class Object
     */
    public attr(name : string, value : any): VDomControl;
    
    public attr(name : string, value? : any) : string | VDomControl{
        return this.attribute(name, value);
    }
    
    /**
     * ***removeAttribute*** : 
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {VDomControl} VDomControl Class Object
     */
    public removeAttribute(name : string) : VDomControl{
        const v : DomControl = super.removeAttribute(name);
        return new VDomControl(v._qs);
    }

    /**
     * ***removeAttr*** : 
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {VDomControl} VDomControl Class Object
     */
    public removeAttr(name : string) : VDomControl{
        return this.removeAttribute(name);
    }

    /**
     * ***virtual*** : 
     * Get virtual attribute information
     * @param {string} name virtual attribute name
     * @returns {string} virtual attribute value
     */
    public virtual(name : string) : string;

    /**
     * ***virtual*** : 
     * Set virtual attribute information
     * @param {string} name virtual attribute name
     * @param {any} value virtual attribute value
     * @returns {VDomControl} VDomControl Class Object
    */
    public virtual(name : string, value : any) : VDomControl;
    
    public virtual(name : string, value? : any) : string | VDomControl{
        const v = super.virtual(name, value);
        if(typeof v == "string"){
            return v;
        }
        else{
            return new VDomControl(v._qs);
        }
    }

    /**
     * ***removeVirtual*** : 
     * Delete virtual attribute information
     * @param {string} name virtual attribute name
     * @returns {VDomControl} VDomControl Class Object
     */
    public removeVirtual(name : string) : VDomControl{
        const v : DomControl = super.removeVirtual(name);
        return new VDomControl(v._qs);
    }

    /**
     * ***style*** : 
     * Sets stylesheet information.
     * @param {object} options stylesheet attribute information
     * @returns {VDomControl} VDomControl Class Object
     */
    public style(options : object) : VDomControl{
        const v : DomControl = super.style(options);
        return new VDomControl(v._qs);
    }

    /**
     * ***addClass*** : 
     * add class attribute
     * @param {string} className additional class name
     * @returns {VDomControl} VDomControl Class Object
     */
    public addClass(className : string) : VDomControl;
    
    /**
     * ***addClass*** : 
     * Add multiple class attributes
     * @param {Array<string>} className additional class names
     * @returns {VDomControl} VDomControl Class Object
    */
    public addClass(className : Array<string>) : VDomControl;
    
    public addClass(className) : VDomControl{
        const v : DomControl = super.addClass(className);
        return new VDomControl(v._qs);
    }

    /**
     * ***removeClass*** : 
     * remove the class attribute
     * @param {string} className Delete class name
     * @returns {VDomControl} VDomControl Class Object
     */
    public removeClass(className : string) : VDomControl{
        const v : DomControl = super.removeClass(className);
        return new VDomControl(v._qs);
    }
    
    /**
     * ***value*** : 
     * For input fields, get the specified value
     * @returns {any} input value
     */
    public value() : any;

    /**
     * ***value*** : 
     * For input fields, specify the value
     * @param {string} value input value
     * @returns {DomControl} DomControl Class Object
     */
    public value(value): DomControl;
    
    public value(value? : any){
        const v = super.value(value);
        if(v instanceof DomControl){
            return new VDomControl(v._qs);
        }
        else{
            return v;
        }
    }

    /**
     * ***default*** : 
     * For input fields, get the specified value
     * @returns {any} input value
     */
    public default(): any;

    /**
     * ***default**** : 
     * For input fields, specify the value
     * * If a reset event occurs, it will revert to the value specified in this method.
     * @param {string} value input value
     * @returns {VDomControl} VDomControl Class Object
     */
    public default(value : any): VDomControl;
    
    public default(value? : any){
        const v = super.default(value);
        if(v instanceof DomControl){
            return new VDomControl(v._qs);
        }
        else{
            return v;
        }
    }

    /**
     * ***valueIncrement*** : 
     * This function automatically increments when the target element is a numerical input field (text box, etc.)
     * Increment is performed based on the value range of min and max attributes.
     * @returns {VDomControl} VDomControl Class Object
     */
    public valueIncrement() : VDomControl;

    /**
     * ***valueIncrement*** : 
     * This function automatically increments when the target element is a numerical input field (text box, etc.)
     * Increment is performed based on the value range of min and max attributes.
     * The number of steps in the argument is added.
     * @param {number} step Number of addition steps
     * @returns {VDomControl} VDomControl Class Object
     */
    public valueIncrement(step : number) : VDomControl;
    
    public valueIncrement(step? : number) : VDomControl{
        const v : DomControl = super.valueIncrement(step);
        return new VDomControl(v._qs);
    }

    /**
     * ***valueIncrement*** : 
     * This function automatically decrements when the target element is a numerical input field (text box, etc.)
     * Decrement is performed based on the value range of min and max attributes.
     * @returns {VDomControl} VDomControl Class Object
     */
    public valueDecrement() : VDomControl;

    /**
     * ***valueIncrement*** : 
     * This function automatically decrements when the target element is a numerical input field (text box, etc.)
     * Decrement is performed based on the value range of min and max attributes.
     * The number of steps in the argument is added.
     * @param {number} step Number of subtraction steps
     * @returns {VDomControl} VDomControl Class Object
     */
    public valueDecrement(step : number) : VDomControl;
    
    public valueDecrement(step? : number) : VDomControl{
        const v : DomControl = super.valueDecrement(step);
        return new VDomControl(v._qs);
    }

    /**
     * ***click*** : 
     * performs a click on an element.
     * @returns {VDomControl} VDomControl Class Object
     */
    public click() : VDomControl{
        const v : DomControl = super.click();
        return new VDomControl(v._qs);
    }

    /**
     * ***dblclick*** : 
     * Performs a double click on an element.
     * @returns {VDomControl} VDomControl Class Object
     */
    public dblclick() : VDomControl{
        const v : DomControl = super.dblclick();
        return new VDomControl(v._qs);
    }

    /**
     * ***submit*** : 
     * Executes element submission.
     * @returns {VDomControl} VDomControl Class Object
     */
    public submit() : VDomControl{
        const v : DomControl = super.submit();
        return new VDomControl(v._qs);
    }

    /**
     * ***focus*** : 
     * Performs element focus.
     * @returns {DomControl} DomControl Class Object
     */
    public focus() : VDomControl{
        const v : DomControl = super.focus();
        return new VDomControl(v._qs);
    }
}