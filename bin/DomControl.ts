import Util from "Util";
import DomStatic from "DomStatic";

export default class DomControl{

    public _qs = null;

    public constructor(qs){
        this._qs = qs;
        for(var n = 0 ; n < this._qs.length ; n++){
            var qs_ = this._qs[n];
            if(!qs_.uid){
                var uid = Util.uniqId();
                qs_.uid = uid;
            }
        }
    }

    public static load() : DomControl;

    public static load(selector : String) : DomControl;

    public static load(htmlElement : HTMLElement) : DomControl;

    public static load(htmlElement : Array<HTMLElement>) : DomControl;

    public static load(selector? : String | HTMLElement | Array<HTMLElement>) : DomControl{
        let fullSelector = "";
        if(selector){
            if(typeof selector == "string"){
                fullSelector = "html " + selector;
            }
            else{
                let selectList = [];
                if(!Array.isArray(selector)){
                    selectList = [ selector ];
                }
                else{
                    selectList = selector;
                }

                return new DomControl(selectList);
            }    
        }
        else{
            fullSelector = "html *";
        }
    
        var qs = document.querySelectorAll(fullSelector);
    
        return new DomControl(qs);
    }

    /**
     * ***get*** : 
     * Get the document information of the get DOM.
     */
    public get get(){
        return this._qs;
    }

    /**
     * ***length*** : 
     * Get the number of elements in the get DOM.
     * @returns {number} length
     */
    public get length() : number{
        return this._qs.length;
    }

    /**
     * ***exists*** : 
     * Determine whether an element exists.
     * @returns {bolean} judgment result
     */
    public get exists() : boolean{
        if(this._qs.length){
            return true;
        }
        return false;
    }

    /**
     * ***first*** : 
     * Specifies the first element.
     * @returns {DomControl} DomControl Class Object
     */
    public get first() : DomControl{
        return new DomControl([ this._qs[0] ]);
    }

    /**
     * ***last*** : 
     * Specifies the last element.
     * @returns {DomControl} DomControl Class Object
     */
    public get last() : DomControl{
        return new DomControl([ this._qs[this._qs.length - 1] ]);
    }

    /**
     * ***parent*** : 
     * Specifies the parent element one level above.
     * @returns {DomControl} DomControl Class Object
     */
    public get parent() : DomControl{
        return new DomControl([ this._qs[this._qs.length - 1].parentNode ]);
    }

    /**
     * ***index*** : 
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {DomControl} DomControl Class Object
     */
    public index(index : number) : DomControl{
        return new DomControl([ this._qs[index] ]);
    }

    /**
     * ***even*** : 
     * Extract even element information only.
     * @returns {DomControl} DomControl Class Object
     */
    public get even() : DomControl{
        var qs_ = [];
        for(var n = 0 ; n < this._qs.length ; n++){
            var q_ = this._qs[n];
            if(n % 2 == 0){
                qs_.push(q_);
            }
        }
        return new DomControl(qs_);
    }

    /**
     * ***odd*** : 
     * Extract only odd element information
     * @returns {DomControl} DomControl Class Object
     */
    public get odd() : DomControl{
        var qs_ = [];
        for(var n = 0 ; n < this._qs.length ; n++){
            var q_ = this._qs[n];
            if(n % 2 == 1){
                qs_.push(q_);
            }
        }
        return new DomControl(qs_);
    }

    /**
     * ***findOnAttr*** : 
     * Specifies only elements that contain attribute information that matches the conditions of the argument.
     * @param {string} name attribute name
     * @param {string|number} value attribute value
     * @returns {DomControl} DomControl Class Object
     */
    public findOnAttr(name : string, value : any) : DomControl{
        var qss = [];
        for(var n = 0 ; n < this._qs.length ;n ++){
            var qs = this._qs[n];

            if(!qs.attributes[name]){
                continue;
            }

            if(qs.attributes[name].value == value){
                qss.push(qs);
            }
        }
        return new DomControl(qss);
    }

    /**
     * ***findOnVirtual*** : 
     * Specify only elements that contain Virtual attribute information that matches the argument conditions.
     * @param {string} name virtual attribute name
     * @param {any} value virtual attribute value
     * @returns {DomControl} DomControl Class Object
     */
    public findOnVirtual(name : string, value : any) : DomControl{
        var qss = [];
        for(var n = 0 ; n < this._qs.length ;n ++){
            var qs = this._qs[n];

            if(!qs.uid){
                continue;
            }

            if(!DomStatic.__uids[qs.uid]){
                continue;
            }

            var uids = DomStatic.__uids[qs.uid];

            if(!uids.virtual){
                continue;
            }

            if(!uids.virtual[name]){
                continue;
            }

            let targetValue : string = uids.virtual[name].toString();

            if(value.toString().indexOf("*") > -1){

                let vns : string[] = value.split("*");

                let judge : boolean = false;

                if(!vns[0].trim()){
                    if(targetValue.indexOf(vns[1]) > 0){
                        judge = true;
                    }
                }
                else{
                    if(targetValue.indexOf(vns[0]) === 0){
                        judge = true;
                    }
                }

                if(!judge){
                    continue;
                }
            }
            else{
                if(uids.virtual[name] != value){
                    continue;
                }
            }

            qss.push(qs);
        }
        return new DomControl(qss);
    }

    /**
     * ***child*** : 
     * Specifies the child element of the argument selector,
     * If no selector is specified, all child elements are included.
     * If no selector argument is used, get all child elements.
     * @returns {DomControl} DomControl Class Object
     */
    public child() : DomControl;

    /**
     * ***child*** : 
     * Specifies the child element of the argument selector,
     * If no selector is specified, all child elements are included
     * @param {string} selector selector
     * @returns {DomControl} DomControl Class Object
     */
    public child(selector : string) : DomControl;

    public child(selector? : string) : DomControl{
        
        if(!selector){
            selector = "*";
        }
        var qss = [];
        for(var n = 0 ; n < this._qs.length ;n ++){
            var qs = this._qs[n];
            var buff = qs.querySelectorAll(selector);
            buff.forEach(function(b_){
                qss.push(b_);
            })
        }

        return new DomControl(qss);
    }

    /**
     * ***text*** : 
     * get/set the text inside the element tag
     */
    public get text(): string{
        return this._qs[this._qs.length - 1].innerText;
    }

    public set text(text : string){
        for(var n = 0 ; n < this._qs.length ;n ++){
            var qs = this._qs[n];
            qs.innerText = text;
        }
    }

    /**
     * ***html*** : 
     * Get/Set the HTML inside the element tag (innerHTML)
     */
    public get html(): string{
        return this._qs[this._qs.length - 1].innerHTML;
    }

    public set html(html : string){
        for(var n = 0 ; n < this._qs.length ;n ++){
            var qs = this._qs[n];
            qs.innerHTML = html;
        }
    }

    /**
     * ***outerHtml*** : 
     * Get/Set the HTML inside the element tag (outerHTML)
     */
    public get outerHtml() : string{
        return this._qs[this._qs.length - 1].outerHTML;
    }
    public set outerHtml(html : string){
        for(var n = 0 ; n < this._qs.length ;n ++){
            var qs = this._qs[n];
            qs.outerHtml = html;
        }
    }

    /**
     * ***append*** : 
     * add element tag.
     * @param {string} contents add contents 
     * @returns {DomControl} DomControl Class Object
     */
    public append(appendHtmlContent : string) : DomControl;

    /**
     * ***append*** : 
     * add element Object.
     * @param {Element} appendElement add contents Element object
     * @returns {DomControl} DomControl Class Object
     */
    public append(appendElement : Element) : DomControl;

    public append(contents) : DomControl{
        this._qs.forEach(function(qs){
            if(typeof contents == "string"){
                qs.insertAdjacentHTML("beforeend", contents);
            }
            else{
                qs.append(contents);
            }
        });
        return this;
    }

    /**
     * ***before*** : 
     * Append just before the element tag
     * @param {string} contents add before contents
     * @returns {DomControl} DomControl Class Object
     */
    public before(beforeHtmlContent : string) : DomControl;

    /**
     * ***before*** : 
     * Append just before the element object.
     * @param {Element} beforeElement add before contents Element object
     * @returns {DomControl} DomControl Class Object
     */
    public before(beforeElement : Element) : DomControl;

    public before(contents) : DomControl{
        this._qs.forEach(function(qs){
            if(typeof contents == "string"){
                qs.insertAdjacentHTML("beforebegin", contents);
            }
            else{
                qs.before(contents);
            }
        });
        return this;
    }

    /**
     * ***after*** : 
     * Append right after the element tag
     * @param {string} contents add after contents 
     * @returns {DomControl} DomControl Class Object
     */
    public after(beforeHtmlContent : string) : DomControl;

    /**
     * ***after*** : 
     * Append right after the element tag
     * @param {Element} beforeElement add after contents Element object
     * @returns {DomControl} DomControl Class Object
     */
    public after(beforeElement : Element) : DomControl;

    public after(contents) : DomControl{
        this._qs.forEach(function(qs){
            if(typeof contents == "string"){
                qs.insertAdjacentHTML("afterend", contents);
            }
            else{
                qs.after(contents);
            }
        });
        return this;
    }

    /**
     * ***remove*** : 
     * remove the element
     * @returns {DomControl} DomControl Class Object
     */
    public remove() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.remove();
        }
        return this;
    }

    /**
     * ***empty*** : 
     * clear inside element
     * @returns {DomControl} DomControl Class Object
     */
    public empty() : DomControl{
        this.html = "";
        return this;
    }

    /**
     * ***on*** : 
     * set the event handler.
     * @param {string} eventName event name
     * @param {Function} callback callback function
     * @returns {DomControl} DomControl Class Object
     */
    public on(eventName : string, callback : Function) : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.addEventListener(eventName, (e) => {
                const targetDom = new DomControl([e.target]);
                callback(targetDom, e);
            });
        }
        return this;
    }

    /**
     * ***onClick*** : 
     * Wrapper function when eventname of on method is set to "click".
     * @param {Function} callback callback function
     */
    public set onClick(callback : Function){
        this.on("click", callback);
    }

    /**
     * ***onContextmenu*** : 
     * Wrapper function when eventname of on method is set to "contextmenu".
     * @param {Function} callback callback function
     */
    public set onContextmenu(callback : Function){
        this.on("contextmenu", callback);
    }

    /**
     * ***onChange*** : 
     * Wrapper function when eventname of on method is set to "change".
     * @param {Function} callback callback function
     */
    public set onChange(callback : Function){
        this.on("change", callback);
    }

    /**
     * ***onKeyUp*** : 
     * Wrapper function when eventname of on method is set to "keyup".
     * @param {Function} callback callback function
     */
    public set onKeyUp(callback : Function){
        this.on("keyup", callback);
    }

    /**
     * ***onKeyDown*** : 
     * Wrapper function when eventname of on method is set to "onKeyDown".
     * @param {Function} callback callback function
     */
    public set onKeyDown(callback : Function){
        this.on("keyup", callback);
    }

    /**
     * ***onKeyPress*** : 
     * Wrapper function when eventname of on method is set to "keypress".
     * @param {Function} callback callback function
     */
    public set onKeyPress(callback : Function){
        this.on("keypress", callback);        
    }

    /**
     * ***onMouseUp**** : 
     * Wrapper function when eventname of on method is set to "mouseup".
     * @param {Function} callback callback function
     */
    public set onMouseUp(callback : Function){
        this.on("mouseup", callback);        
    }

    /**
     * ***onMouseDown*** : 
     * Wrapper function when eventname of on method is set to "mousedown".
     * @param {Function} callback callback function
     */
    public set onMouseDown(callback : Function){
        this.on("mousedown", callback);        
    }

    /**
     * ***onMouseMove*** : 
     * Wrapper function when eventname of on method is set to "mousemove".
     * @param {Function} callback callback function
     */
    public set onMouseMove(callback : Function){
        this.on("mousemove", callback);        
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
     * @returns {DomControl} DomControl Class Object
     */
    public attribute(name: string, value : any) : DomControl;

    public attribute(name : string, value? : any) : string | DomControl{
        if(value == undefined){
            return this._qs[this._qs.length - 1].attributes[name].value;
        }
        else{
            for(var n = 0 ; n < this._qs.length; n++){
                var qs = this._qs[n];
                qs.setAttribute(name, value);
            }
            return this;    
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
     * @returns {DomControl} DomControl Class Object
     */
    public attr(name : string, value : any): DomControl;

    public attr(name : string, value? : any) : string | DomControl{
        return this.attribute(name, value);
    }

    /**
     * ***removeAttribute*** : 
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    public removeAttribute(name : string) : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.removeAttribute(name);
        }
        return this;
    }
    
    /**
     * ***removeAttr*** : 
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    public removeAttr(name : string) : DomControl{
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
     * @returns {DomControl} DomControl Class Object
     */
    public virtual(name : string, value : any) : DomControl;

    public virtual(name : string, value? : any) : string | DomControl{

        if(this._qs.length == 0){
            return;
        }

        if(value == undefined){
            var qs = this._qs[this._qs.length - 1];

            if(!DomStatic.__uids[qs.uid]){
                return null;
            }

            var uids = DomStatic.__uids[qs.uid];
            if(!uids.virtual){
                return null;
            }

            if(!uids.virtual[name]){
                return null;
            }

            return uids.virtual[name];
        }
        else{
            for(var n = 0 ; n < this._qs.length; n++){
                var qs = this._qs[n];

                if(!DomStatic.__uids[qs.uid]){
                    DomStatic.__uids[qs.uid] = {};
                }

                if(!DomStatic.__uids[qs.uid].virtual){
                    DomStatic.__uids[qs.uid].virtual = {};
                    DomStatic.__uids[qs.uid].target = qs;
                }
                
                DomStatic.__uids[qs.uid].virtual[name] = value;
            }
            return this;    
        }
    }
    
    /**
     * ***removeVirtual*** : 
     * Delete virtual attribute information
     * @param {string} name virtual attribute name
     * @returns {DomControl} DomControl Class Object
     */
    public removeVirtual(name : string) : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];

            if(!DomStatic.__uids[qs.uid]){
                continue;
            }

            if(!DomStatic.__uids[qs.uid].virtual){
                continue;
            }
            
            delete DomStatic.__uids[qs.uid].virtual[name];

            // @ts-ignore
            if(DomStatic.__uids[qs.uid].virtual == {}){
                delete DomStatic.__uids[qs.uid].virtual;
            }
            
            // @ts-ignore
            if(DomStatic.__uids[qs.uid] == {}){
                delete DomStatic.__uids[qs.uid];
            }
        }
        return this;
    }

    /**
     * ***style*** : 
     * Sets stylesheet information.
     * @param {object} options stylesheet attribute information
     * @returns {DomControl} DomControl Class Object
     */
    public style(options : object) : DomControl{

        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];

            var columns = Object.keys(options);
            for(var n2 = 0 ; n2 < columns.length ; n2++){
                var key = columns[n2];
                var val = options[key];
                qs.style[key] = val;
            }
        }
        return this;
    }

    /**
     * ***getStyle*** : 
     * Get all stylesheet information.
     * @returns stylesheet information
     */
    public getStyle() : string;

    /**
     * #### getStyle
     * Gets the specified style from the stylesheet information
     * @param {string} name specified style
     * @returns {string} stylesheet info
     */
    public getStyle(name: string): string;

    public getStyle(name? : string) : string{
        var qs = this._qs[this._qs.length - 1];
        
        if(name){
            if(!qs.style[name]){
                return null;
            }
    
            return qs.style[name];    
        }
        else{
            return qs.style;
        }
    }

    /**
     * ***addClass*** : 
     * add class attribute
     * @param {string} className additional class name
     * @returns {DomControl} DomControl Class Object
     */
    public addClass(className : string) : DomControl;
    
    /**
     * ***addClass*** : 
     * Add multiple class attributes
     * @param {Array<string>} className additional class names
     * @returns {DomControl} DomControl Class Object
     */
    public addClass(className : Array<string>) : DomControl;

    public addClass(className : string | Array<string>) : DomControl{

        if(typeof className == "string"){
            className = [ className ];
        }

        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            for(var n2 = 0 ; n2 < className.length ; n2++){
                var c = className[n2];
                qs.classList.add(c);
            }
        }
        return this;
    }

    /**
     * ***removeClass*** : 
     * remove the class attribute
     * @param {string} className Delete class name
     * @returns {DomControl} DomControl Class Object
     */
    public removeClass(className : string) : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.classList.remove(className);
        }
        return this;
    }

    /**
     * ***isClass*** : 
     * Checks if the specified class exists in the element
     * @param {string} className Delete class name 
     * @returns {boolean} exists status
     */
    public isClass(className : string) : boolean{
        var qs = this._qs[this._qs.length - 1];
        return qs.classList.contains(className);
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
        if(value == undefined){
            return this.get_value_default(0);
        }
        else{
            return this.set_value_Default(0, value);
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
     * @returns {DomControl} DomControl Class Object
     */
    public default(value : any): DomControl;

    public default(value? : any){
        if(value == undefined){
            return this.get_value_default(1);
        }
        else{
            return this.set_value_Default(1, value);
        }
    }

    private get_value_default(mode){
        var qs = this._qs[this._qs.length - 1];
        if(qs.type == "radio"){
            for(var n = 0 ; n < this._qs.length ; n++){
                var qs = this._qs[n];

                if(qs.checked == true){
                    return qs.value;
                }
            }
        }
        else if(qs.type == "checkbox"){
            var result = [];
            for(var n = 0 ; n < this._qs.length ; n++){
                var qs = this._qs[n];

                if(qs.checked == true){
                    result.push(qs.value);
                }
            }

            return result;
        }
        else{
            return qs.value;
        }
    }

    private set_value_Default(mode, value){
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            var type = qs.type;

            if(type == "radio"){
                if(qs.value == value){
                    if(mode == 0){
                        qs.checked = true;
                    }
                    else{
                        qs.setAttribute("checked", true);
                    }
                }
                else{
                    if(mode == 0){
                        qs.checked = false;
                    }
                    else{
                        qs.removeAttribute("checked");
                    }
                }
            }
            else if(type == "checkbox"){
                if(typeof value == "string"){
                    value = [ value ];                        
                }

                if(mode == 0){
                    qs.checked = false;
                }
                else{
                    qs.removeAttribute("checked");
                }

                for(var n2 = 0 ; n2 < value.length ; n2++){
                    var v = value[n2];

                    if(qs.value == v){
                        if(mode == 0){
                            qs.checked = true;
                        }
                        else{
                            qs.setAttribute("checked", true);
                        }
                    }
                }
            }
            else{
                if(mode == 0){
                    qs.value = value;
                }
                else{
                    qs.setAttribute("value", value);
                }
            }
        }
        return this;
    }

    /**
     * ***valueIncrement*** : 
     * This function automatically increments when the target element is a numerical input field (text box, etc.)
     * Increment is performed based on the value range of min and max attributes.
     * @returns {DomControl} DomControl Class Object
     */
    public valueIncrement() : DomControl;

    /**
     * ***valueIncrement*** : 
     * This function automatically increments when the target element is a numerical input field (text box, etc.)
     * Increment is performed based on the value range of min and max attributes.
     * The number of steps in the argument is added.
     * @param {number} step Number of addition steps
     * @returns {DomControl} DomControl Class Object
     */
    public valueIncrement(step : number) : DomControl;

    public valueIncrement(step? : number) : DomControl{
        let value = this.value();

        if(!step){
            step = parseInt(this.attr("step"));
        }

        let min = this.attr("min");
        let max = this.attr("max");

        value++;

        if(min){
            if(value < min){
                value = min;
            }
        }

        if(max){
            if(value > max){
                value = max;
            }
        }

        return this.value(value);
    }
    
    /**
     * ***valueIncrement*** : 
     * This function automatically decrements when the target element is a numerical input field (text box, etc.)
     * Decrement is performed based on the value range of min and max attributes.
     * @returns {DomControl} DomControl Class Object
     */
    public valueDecrement() : DomControl;

    /**
     * ***valueIncrement*** : 
     * This function automatically decrements when the target element is a numerical input field (text box, etc.)
     * Decrement is performed based on the value range of min and max attributes.
     * The number of steps in the argument is added.
     * @param {number} step Number of subtraction steps
     * @returns {DomControl} DomControl Class Object
     */
    public valueDecrement(step : number) : DomControl;

    public valueDecrement(step? : number) : DomControl{
        let value = this.value();

        if(!step){
            step = parseInt(this.attr("step"));
        }

        let min = this.attr("min");
        let max = this.attr("max");

        value--;

        if(min){
            if(value < min){
                value = min;
            }
        }

        if(max){
            if(value > max){
                value = max;
            }
        }

        return this.value(value);
    }

    /**
     * ***nodeName*** : 
     * get the node name of an element.
     */
    public get nodeName(): string{
        var qs = this._qs[this._qs.length - 1];
        return qs.localName;
    }

    /**
     * ***type*** : 
     * get the type attribute.
     */
    public get type(): string{
        return this.attr("type");
    }

    /**
     * ***click*** : 
     * performs a click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    public click() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.click();
        }
        return this;
    }

    /**
     * ***dblclick*** : 
     * Performs a double click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    public dblclick() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }

    /**
     * ***submit*** : 
     * Executes element submission.
     * @returns {DomControl} DomControl Class Object
     */
    public submit() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }
    
    /**
     * ***focus*** : 
     * Performs element focus.
     * @returns {DomControl} DomControl Class Object
     */
    public focus() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.focus();
        }
        return this;
    }
};