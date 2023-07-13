import { Transform, Expose } from "class-transformer";

class id_paciente {
    @Expose({name: "id"})
    @Transform(({value}) => {
        if(typeof value != "number") throw {status: 500, message: "Parametros incorrectos"}
        return value
    }, {toClassOnly: true})
    uid: number; 

    constructor(uid: number) {
        this.uid = uid
    }
}

export default id_paciente; 