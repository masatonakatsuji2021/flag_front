import Controller from "Controller";

export default class Exception extends Controller{

    public view : string = "error/index";

    /**
     * ***handle*** : 
     * Event handler when an error occurs.
     * @param {Exception} exception Error Exception
     * @returns {void}
    */
    handle(exception : any): void{}
}