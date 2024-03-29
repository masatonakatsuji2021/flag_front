import * as fs from "fs";

const deepSearch = (path: string) => {

    var glob = fs.readdirSync(path);

    var res = {
        dir:[],
        file:[],
    };

    for(var n = 0 ; n < glob.length ; n++){
        var g_ = path + "/" + glob[n];

        if(fs.statSync(g_).isDirectory()){
            res.dir.push(g_);
            var buffer = deepSearch(g_);
            for(var n2 = 0 ; n2 < buffer.dir.length ; n2++){
                res.dir.push(buffer.dir[n2]);
            }
            for(var n2 = 0 ; n2 < buffer.file.length ; n2++){
                res.file.push(buffer.file[n2]);
            }
        }
        else{
            res.file.push(g_);
        }
    }

    return res;
};
export default deepSearch;
