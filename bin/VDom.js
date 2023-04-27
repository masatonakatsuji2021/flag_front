const VDomStatic = use("VDomStatic");
const VDomControl = use("VDomControl");

const VDom = function(refObj, qs0){

    if(!refObj){

        return {
            refresh: ()=>{
                VDomStatic.refresh();
            },
        };
    }

    if(typeof refObj == "string"){
        var refName = refObj;

        if(qs0 == undefined){
            qs0 = document;
        }
    
        var qs = qs0.querySelectorAll("[ref=" + refName + "]");
    }
    else{
        var qs = refObj;
        var refName = qs[0].ref;    
    }

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
};
return VDom;