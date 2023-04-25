const VDomStatic = use("VDomStatic");

return class VDomControl{

    constructor(qs, uniqId){
        this._qs = qs;
        this._uniqId = uniqId;
    }

    refresh(){

        var columns = Object.keys(VDomStatic.refIndexs);

        var ind = 0;

        var deleteIndexes = [];

        columns.forEach(function(refName){

            var indexes = VDomStatic.refIndexs[refName];
            var deleteRefIndexs = [];

            indexes.forEach(function(index){
                var o = VDomStatic.refs[index][0];
                o.setAttribute("__exist_id", ind);
                if(document.querySelector("[__exist_id=\"" + ind + "\"]") === null){
                    deleteIndexes.push(index);
                    deleteRefIndexs.push(index);
                }
                o.removeAttribute("__exist_id");
                ind++;
            });

            deleteRefIndexs.forEach(function(index){
                var delIndex = VDomStatic.refIndexs[refName].indexOf(index);
                VDomStatic.refIndexs[refName].splice(delIndex, 1);
                if(!VDomStatic.refIndexs[refName].length){
                    delete VDomStatic.refIndexs[refName];
                }
            });
        });

        deleteIndexes.forEach(function(index){
            delete VDomStatic.refs[index];
        });

        return this;
    }

    child(refName){

        var qs = this._qs[this._qs.length - 1];
        var qs = qs.querySelectorAll("[ref=" + refName + "]");

        if(qs.length == 0){
            var uniqId = VDomStatic.refIndexs[refName];
            var qs = [];
            uniqId.forEach(function(uid){
                VDomStatic.refs[uid].forEach(function(q_){
                    qs.push(q_);
                });
            });
        }
        else{
            var uniqId = Math.random() * 100000000000;
            if(!VDomStatic.refIndexs[refName]){
                VDomStatic.refIndexs[refName] = [];
            }
            VDomStatic.refIndexs[refName].push(uniqId);
            VDomStatic.refs[uniqId] = qs;
        }

        qs.forEach(function(qs_){
            qs_.ref = refName;
            if(!qs_.uid){
                qs_.uid = uniqId;
            }
            qs_.removeAttribute("ref");
        });

        return new VDomControl(qs, uniqId);
    }

    first(){
        var target = this._qs[0];
        return new VDomControl([ target ], target.uid);
    }

    last(){
        var target = this._qs[this._qs.length - 1];
        return new VDomControl([ target ], target.uid);
    }

    index(index){
        var target = this._qs[index];
        return new VDomControl([ target ], target.uid);
    }

    even(){
        var target = [];
        var targetUid = [];
        this._qs.forEach(function(qs_, index){
            if(index % 2 == 0){
                target.push(qs_);
                targetUid.push(qs_.uid);
            }
        });

        return new VDomControl(target, targetUid);
    }

    odd(){
        var target = [];
        var targetUid = [];
        this._qs.forEach(function(qs_, index){
            if(index % 2 == 1){
                target.push(qs_);
                targetUid.push(qs_.uid);
            }
        });

        return new VDomControl(target, targetUid);
    }

    findOnData(name, value){
        var target = [];
        var targetUid = [];
        this._qs.forEach(function(qs_){
            if(qs_.data[name] == value){
                target.push(qs_);
                targetUid.push(qs_.uid);
            }
        });

        return new VDomControl(target, targetUid);
    }

    text(string){
        if(string == undefined){
            return this._qs[this._qs.length - 1].innerText;
        }
        else{
            this._qs.forEach(function(qs_){
                qs_.innerText = string;
            });
            return this;
        }
    }

    html(string){
        if(string == undefined){
            return this._qs[this._qs.length - 1].innerHTML;
        }
        else{
            this._qs.forEach(function(qs_){
                qs_.innerHTML = string;
            });
            return this;
        }
    }

    empty(){
        return this.html("");
    }

    append(string){
        return this.beforeEnd(string);
    }

    beforeEnd(string){
        this._qs.forEach(function(qs_){
            qs_.insertAdjacentHTML("beforeend", string);
        });
        return this;
    }

    beforeBegin(string){
        this._qs.forEach(function(qs_){
            qs_.insertAdjacentHTML("beforebegin", string);
        });
        return this;
    }

    afterEnd(string){
        this._qs.forEach(function(qs_){
            qs_.insertAdjacentHTML("afterend", string);
        });
        return this;
    }

    remove(){
        this._qs.forEach(function(qs_){
            qs_.remove();
        });
        return this;
    }

    data(name, value){
        if(value == undefined){
            return this._qs[this._qs.length - 1].data[name];
        }
        else{
            this._qs.forEach(function(qs_){
                if(!qs_.data){
                    qs_.data = {};
                }
                qs_.data[name] = value;
            });
            return this;
        }
    }

    removeData(name){
        this._qs.forEach(function(qs_){
            if(!qs_.data){
                return;
            }
            delete qs_.data[name];
        });
        return this;
    }

    setEventHandller(eventName, callback, option){
        var cont = this;
        this._qs.forEach(function(qs_){
            qs_.addEventListener(eventName, callback.bind(cont), option);
        });
        return this;
    }

    on(eventName, callback, option){
        return this.setEventHandller(eventName, callback, option);
    }

    attribute(name, value){
        if(value == undefined){
            if(name == undefined){
                return this._qs[this._qs.length - 1].attributes;
            }
            else{
                return this._qs[this._qs.length - 1].getAttribute(name);
            }
        }
        else{
            this._qs.forEach(function(qs_){
                qs_.setAttribute(name, value);
            });
            return this;
        }
    }

    attr(name, value){
        return this.attribute(name, value);
    }

    removeAttribute(name){
        this._qs.forEach(function(qs_){
            qs_.removeAttribute(name);
        });
        return this;
    }

    removeAttr(name, value){
        return this.attribute(name, value);
    }

    addClass(className){
        this._qs.forEach(function(qs_){
            qs_.classList.add(className);
        });
        return this;
    }

    removeClass(className){
        this._qs.forEach(function(qs_){
            qs_.classList.remove(className);
        });
        return this;
    }
    
    isClass(className){
        return this._qs[this._qs.length - 1].classList.contains(className);
    }

    style(options){

        this._qs.forEach(function(qs_){
            var columns = Object.keys(options);
            for(var n = 0 ; n < columns.length ; n++){
                var key = columns[n];
                var val = options[key];
                qs_.style[key] = val;
            }
        });

        return this;
    }

    getStyle(name){
        return this._qs[this._qs.length - 1].style[name];
    }

    click(){
        this._qs.forEach(function(qs_){
            qs_.click();
        });
        return this;
    }

    dblclick(){
        this._qs.forEach(function(qs_){
            qs_.dblclick();
        });
        return this;
    }

    submit(){
        this._qs.forEach(function(qs_){
            qs_.dblclick();
        });
        return this;
    }
};