return {
    
    default: {

        name : "TEST APP",

        routes: {
            "/":"controller:main|action:index",
            "/page":"controller:page|action:index",
            "/form":"controller:form|action:index",
            "/vdom":"controller:vdom|action:index",
        },
    },
};