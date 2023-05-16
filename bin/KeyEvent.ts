export default new class KeyEvent{

    private _callback_down = {};
    private _callback_up = {};

    constructor(){
        window.addEventListener("keydown", function(e){


        });
        window.addEventListener("keyup", function(e){


        });
    }

    on(fullKeyName : string, keyDownCallback : Function, keyUpCallback? : Function){
        this._callback_down[fullKeyName] = keyDownCallback;
        if(keyUpCallback){
            this._callback_up[fullKeyName] = keyUpCallback;
        }
        return this;
    }

    onArrowUp(keyDownCallback : Function , keyUpCallback? : Function){



    }

    onArrowDown(keyDownCallback : Function , keyUpCallback? : Function){


        
    }

    onArrowLeft(keyDownCallback : Function , keyUpCallback? : Function){
        return this.on("ArrowLeft", keyDownCallback, keyUpCallback);
    }

    onArrowRight(keyDownCallback : Function , keyUpCallback? : Function){
        return this.on("ArrowRight", keyDownCallback, keyUpCallback);
    }

    onEnter(keyDownCallback : Function , keyUpCallback? : Function){
        return this.on("Enter", keyDownCallback, keyUpCallback);
    }

    onSpace(keyDownCallback : Function , keyUpCallback? : Function){
        return this.on("Space", keyDownCallback, keyUpCallback);
    }

    onChar(keyword: string, keyDownCallback : Function , keyUpCallback? : Function){
        return this.on("Key" + keyword, keyDownCallback, keyUpCallback);
    }

    onNumber(number : number, keyDownCallback : Function , keyUpCallback? : Function){
        return this.on("Number" + number, keyDownCallback, keyUpCallback);
    }

}