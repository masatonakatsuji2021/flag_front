import Controller from "app/Controller/Controller";
import Util from "Util";
import v from "VDom";

export default class PageController extends Controller{

    title : string = "Page Sample";

    dts = null;

    index(){

        this._datetime();
        this.dts = setInterval(this._datetime, 1000);

    }

    private _datetime(){

        var dateStr = Util.dt().format("YYYY/MM/DD");
        var timeStr = Util.dt().format("HH:II:SS");

        v("date").text(dateStr);
        v("time").text(timeStr);

    }

    handleLeave(): void {
        clearInterval(this.dts);
    }
}