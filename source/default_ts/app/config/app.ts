export default new class App{

    name : string = "TEST APP";

    routes = {
        "/":"controller:main|action:index",
        "/page":"controller:page|action:index",
        "/form":"controller:form|action:index",
        "/form/2":"controller:form|action:index2",
        "/vdom":"controller:vdom|action:index",
    };

};