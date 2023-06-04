const Form = use("Form");

return class TestForm extends Form{

    formName = "test_form";

    handleSetting(){

        this
            .tagInput("name")
            .tagRadio("gender",{0:"men",1:"women"})
            .tagTextarea("memo",{
                style:"width:400px;height:150px;resize:none",
            })
            .tagSubmit("submit","SUBMIT")
            .tagReset("reset", "Reset")
        ;
    }

    handleSubmit(postData) {
        console.log(postData);
    }
};