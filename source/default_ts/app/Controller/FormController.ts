import Form from "Form";
import Controller from "app/Controller/Controller";
import TestForm from "app/Form/TestForm";

export default class FormController extends Controller{

    index(){
        // form class setting..
        let tf : TestForm = new TestForm();
        tf.setting();
    }

    index2(){
        let tf2 : Form = new Form("test_form2");

        tf2.tagInput("name")
            .tagRadio("gender",{0:"aaa",1:"bbb",2:"cccc"})
            .tagTextarea("memo",{
                style:"width:400px;height:150px;resize:none",
            })
            .tagSubmit("submit","SUBMIT")
            .tagReset("reset", "Reset")
        ;
        
        tf2.onSubmit((postData)=>{

            console.log("-------------------------------------------------");
            console.log(postData);
            console.log("-------------------------------------------------");

        });
    }
}