import Util from "Util";
import DomStatic from "DomStatic";

export default class DomControl{

    _qs = null;

    constructor(qs){
        this._qs = qs;
        for(var n = 0 ; n < this._qs.length ; n++){
            var qs = this._qs[n];
            if(!qs.uid){
                var uid = Util.uniqId();
                qs.uid = uid;    
            }
        }
    }

    get get(){
        return this._qs;
    }

    get length(){
        return this._qs.length;
    }

    first() : DomControl{
        return new DomControl([ this._qs[0] ]);
    }

    last() : DomControl{
        return new DomControl([ this._qs[this._qs.length - 1] ]);
    }

    parent() : DomControl{
        return new DomControl([ this._qs[this._qs.length - 1].parentNode ]);
    }

    index(index : number) : DomControl{
        return new DomControl([ this._qs[index] ]);
    }

    findOnAttr(name : string, value) : DomControl{
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

    findOnVirtual(name : string, value) : DomControl{
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

            if(uids.virtual[name] != value){
                continue;
            }

            qss.push(qs);
        }
        return new DomControl(qss);
    }

    child(selector : string = null) : DomControl{
        
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

    text(string : string = null) : string | DomControl{
        if(string == undefined){
            return this._qs[this._qs.length - 1].innerText;
        }
        else{
            for(var n = 0 ; n < this._qs.length ;n ++){
                var qs = this._qs[n];
                qs.innerText = string;
            }
            return this;
        }
    }

    html(string : string = null) : string | DomControl{
        if(string == undefined){
            return this._qs[this._qs.length - 1].innerHTML;
        }
        else{
            for(var n = 0 ; n < this._qs.length ;n ++){
                var qs = this._qs[n];
                qs.innerHTML = string;
            }
            return this;
        }
    }

    append(string : string) : DomControl{
        this._qs.forEach(function(qs){
            qs.insertAdjacentHTML("beforeend", string);
        });
        return this;
    }

    before(string : string) : DomControl{
        this._qs.forEach(function(qs){
            qs.insertAdjacentHTML("beforebegin", string);
        });
        return this;
    }

    after(string : string) : DomControl{
        this._qs.forEach(function(qs){
            qs.insertAdjacentHTML("afterend", string);
        });
        return this;
    }

    remove() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.remove();
        }
        return this;
    }

    empty() : String | DomControl{
        return this.html("");
    }

    on(eventName : string, callback : Function) : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.addEventListener(eventName, callback.bind(this));
        }
        return this;
    }

    attribute(name : string, value = null) : string | DomControl{
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

    attr(name : string, value) : string | DomControl{
        return this.attribute(name, value);
    }

    removeAttribute(name : string) : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.removeAttribute(name);
        }
        return this;
    }

    removeAttr(name : string) : DomControl{
        return this.removeAttribute(name);
    }

    virtual(name : string, value = null) : string | DomControl{
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
                }
                
                DomStatic.__uids[qs.uid].virtual[name] = value;
            }
            return this;    
        }
    }
    
    removeVirtual(name : string) : DomControl{
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

    style(options : object) : DomControl{

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

    getStyle(name : string = null) : string{
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

    addClass(className : string | Array<string>) : DomControl{

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

    removeClass(className : string) : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.classList.remove(className);
        }
        return this;
    }

    isClass(className : string) : boolean{
        var qs = this._qs[this._qs.length - 1];
        return qs.classList.contains(className);
    }

    value(value = null){
        if(value == undefined){
            return this.#_get_value_default(0);
        }
        else{
            return this.#_set_value_Default(0, value);
        }
    }

    default(value = null){
        if(value == undefined){
            return this.#_get_value_default(1);
        }
        else{
            return this.#_set_value_Default(1, value);
        }
    }

    #_get_value_default(mode){
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

    #_set_value_Default(mode, value){
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

    click() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.click();
        }
        return this;
    }

    dblclick() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }

    submit() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    }

    focus() : DomControl{
        for(var n = 0 ; n < this._qs.length; n++){
            var qs = this._qs[n];
            qs.focus();
        }
        return this;
    }
};