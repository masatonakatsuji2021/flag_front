export default new class App{

    name : string = "TEST APP";

    routes = {
        "/":"controller:main|action:index",
        "/page":"controller:page|action:index",
    };

};