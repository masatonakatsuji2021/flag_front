return class DomControl{

    constructor(qs){
        this._qs = qs;
    }

    child(selector){
        var qss = [];
        this._qs.forEach(function(qs){
            var buff = qs.querySelectorAll(selector);
            buff.forEach(function(b_){
                qss.push(b_);
            })
        });
        return new DomControl(qss);
    }

    html(string){
        if(string == undefined){
            return this._qs[this._qs.length - 1].innerHTML;
        }
        else{
            this._qs.forEach(function(qs){
                qs.innerHTML = string;
            });
            return this;
        }
    }

    text(string){
        if(string == undefined){
            return this._qs[this._qs.length - 1].innerText;
        }
        else{
            this._qs.forEach(function(qs){
                qs.innerText = string;
            });
            return this;
        }
    }

    
}