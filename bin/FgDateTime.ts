export default class FgDateTime{

    private d : Date;

    constructor(datetime? : string){

        if(datetime){
            this.d = new Date(datetime);
        }
        else{
            this.d = new Date();
        }
    }

    format(format : string) : string{

        if(format == undefined){
            format = "YYYY/MM/DD HH:II:SS";
        }

        format = format.split("YYYY").join(this.getYear());
        format = format.split("MM").join(this.getMonth());
        format = format.split("DD").join(this.getDate());
        format = format.split("W").join(this.getDay());
        format = format.split("HH").join(this.getHours());
        format = format.split("II").join(this.getMinutes());
        format = format.split("SS").join(this.getSeconds());
        format = format.split("U").join(this.getTime());
        
        return format;
    }

    getYear() : string{
        return this.d.getFullYear().toString();
    };

    getMonth() : string{
        return ("00" + (this.d.getMonth() + 1)).slice(-2);
    }

    getDate() : string{
        return ("00" + this.d.getDate()).slice(-2);
    }

    getDay() : string{
        return this.d.getDay().toString();
    }

    getHours() : string{
        return ("00" + this.d.getHours()).slice(-2);
    }

    getMinutes() : string{
        return ("00" + this.d.getMinutes()).slice(-2);
    }

    getSeconds() : string{
        return ("00" + this.d.getSeconds()).slice(-2);
    }

    getTime() : string{
        return this.d.getTime().toString();
    }
}