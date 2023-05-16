import Controller from "app/Controller/Controller";
import TestForm from "app/Form/TestForm";

export default class FormController extends Controller{

    index(){
        // form class setting..
        let tf : TestForm = new TestForm();
        tf.setting();
    }
}