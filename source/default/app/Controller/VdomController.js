const Controller = use("app/Controller/Controller");
const Response = use("Response");
const v = use("VDom");

return class VdomController extends Controller{

    title = "VDom Sample";

    index(){

        let lists = v("lists");

        let itemSource = Response.viewPart("vdom_item");

        let ind = 0;

        v("add_btn").on("click", ()=>{
            ind++;

            lists.append(itemSource);

            let target = lists.child("item").last();

            target.virtual("ind", ind);
            target.child("name").text("name-" + ind);
            target.child("code").text(("00" + ind).slice(-3));
            target.child("del_btn")
                .virtual("ind", ind)
                .on("click",(e, context)=>{
                    let getInd = context.virtual("ind");
                    lists.child("item").findOnVirtual("ind", getInd).remove();
                })
            ;
        });
    }
};