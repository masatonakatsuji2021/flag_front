const Controller = use("app/Controller/Controller");
const TestForm = use("app/Form/TestForm");

return class FormController extends Controller{

    index(){
        // form class setting..
        let tf = new TestForm();
        tf.setting();
    }
};