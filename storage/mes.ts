import { Transform, Expose } from "class-transformer";

class mes {
    @Expose({name: "mes"})
    @Transform(({value}) => {
        if(typeof value != "number") throw {status: 500, message: "Parametros incorrectos"}
        return value
    })
    mtn: number
    constructor(mtn: number) {
        this.mtn = mtn
    }
}

export default mes; 