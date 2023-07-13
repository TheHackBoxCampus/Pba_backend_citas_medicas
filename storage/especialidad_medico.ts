import { Transform, Expose} from "class-transformer";

class especialidad {
    @Expose({name: "especialidad"})
    @Transform(({value}) => {
        if(typeof value  != "string") throw ({status: 500, message: "Parametros incorrectos"})
        return value;
    }, {toClassOnly : true})
    esp: string

    constructor(esp: string){
        this.esp = esp; 
    }
}

export default especialidad;