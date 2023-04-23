return new class SessionStorage{

    constructor(){

        this.__name = "flag";

        const app = use("app/config/app.js");

        if(app.sessionStorage){
            if(app.sessionStorage.name){
                this.__name = app.sessionStorage.name;
            }
        }
    }

    #_get(){
        var buff = sessionStorage.getItem(this.__name);
        return JSON.parse(buff);
    }

    read(name){
        var buff = this.#_get();

        if(buff[name]){
            return buff[name];
        }
        else{
            return buff;
        }
    }

    write(name, value){
        var buff = this.#_get();
        buff[name] = value;
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }

    delete(name){
        var buff = this.#_get();
        delete buff[name];
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
}