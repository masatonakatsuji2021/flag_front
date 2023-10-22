import Data from "Data";
import Controller from "Controller";

export default class Exception extends Controller{

    constructor(){
        super();
        this.view = "error/index";
    }

    /**
     * handle : 
     * Event handler when an error occurs.
     * @param {Exception} exception Error Exception
     * @returns {void}
     *
    handle(exception : Exception) : void;
    */
    handle(exception : Exception): void{}

    handleBefore(){}
};