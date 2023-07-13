import { Transform, Expose } from "class-transformer";

class fecha {
    @Expose({name: "fecha"})
    @Transform(({value}) => {
        if(typeof value != "string") throw {status: 500, message: "Parametros incorrectos"}
        return value
    }, {toClassOnly: true})
    num: string

    construtor(num: string) {
        this.num = num;
    }
}
export default fecha; 