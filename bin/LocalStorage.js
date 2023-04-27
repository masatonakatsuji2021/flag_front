return new class LocalStorage{

    constructor(){

        this.__name = "flag";

        const app = use("app/config/app");

        if(app.localStorage){
            if(app.localStorage.name){
                this.__name = app.localStorage.name;
            }
        }
    }

    #_get(){
        var buff = localStorage.getItem(this.__name);
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
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }

    delete(name){
        var buff = this.#_get();
        delete buff[name];
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
}