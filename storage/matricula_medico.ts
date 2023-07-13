import { Transform, Expose } from "class-transformer";

class matricula {
    @Expose({name: "matricula"})
    @Transform(({value}) => {
        if(typeof value != "number") throw {status: 500, message: "Parametros incorrectos"}
        return value
    }, {toClassOnly: true})
    num: number

    construtor(num: number) {
        this.num = num;
    }
}
export default matricula; 