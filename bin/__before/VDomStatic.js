return new class VDomStatic{
    constructor(){
        this.refIndexs = {};
        this.refs = {};
    }

    refresh(){

        var columns = Object.keys(this.refIndexs);

        var ind = 0;

        var deleteIndexes = [];

        const cont = this;

        columns.forEach(function(refName){

            var indexes = cont.refIndexs[refName];
            var deleteRefIndexs = [];

            indexes.forEach(function(index){
                var o = cont.refs[index][0];
                o.setAttribute("__exist_id", ind);
                if(document.querySelector("[__exist_id=\"" + ind + "\"]") === null){
                    deleteIndexes.push(index);
                    deleteRefIndexs.push(index);
                }
                o.removeAttribute("__exist_id");
                ind++;
            });

            deleteRefIndexs.forEach(function(index){
                var delIndex = cont.refIndexs[refName].indexOf(index);
                cont.refIndexs[refName].splice(delIndex, 1);
                if(!cont.refIndexs[refName].length){
                    delete cont.refIndexs[refName];
                }
            });
        });

        deleteIndexes.forEach(function(index){
            delete cont.refs[index];
        });

    }
};