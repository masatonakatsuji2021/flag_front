import Routes from "Routes";
import Response from "Response";

/**
 * #### View Class
 * 
 * This class is used to implement logic that automatically executes the page when it is displayed.
 * If necessary for each page, create a derived class of this View for each controller name and action name and override the necessary methods.  
 */
export default class View{

    public view : string = null;

    /**
     * view 
     * 
     * Set the page view path to display.  
     * If not specified, automatically determined by "{Controller Name}/{action name}"  
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     */
    public setView(value : string)  : void{
        this.view = value;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    public template : string = null;

    /**
     * setTemplate
     * 
     * Specifies the template name to use on the displayed page.  
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.  
     */
    public setTemplate(value : string){
        this.template = value;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * #### handle
     * An event handler that runs automatically when the view is drawn on the screen.  
     * This event is executed only when rendered.
     */
    handle(aregment? : Array<any>) : void{}


    /**
     * #### handleAlways
     * An event handler that runs automatically when the View is displayed on screen.  
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() : void{}

    handleBegin() : void{}

    handleBefore() : void{}
    
    handleAfter() : void{}

    handleRenderBefore() : void{}

    handleRenderAfter() :void{}

    handleLeave() : void{}
}