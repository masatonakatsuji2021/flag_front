const Controller = use("app/Controller/Controller");
const Util = use("Util");
const v = use("VDom");

return class PageController extends Controller{

    title = "Page Sample";

    dts = null;

    index(){
        this._datetime();
        this.dts = setInterval(this._datetime, 1000);
    }

    _datetime(){
        var dateStr = Util.dt().format("YYYY/MM/DD");
        var timeStr = Util.dt().format("HH:II:SS");

        v("date").text(dateStr);
        v("time").text(timeStr);
    }

    handleLeave() {
        clearInterval(this.dts);
    }
};