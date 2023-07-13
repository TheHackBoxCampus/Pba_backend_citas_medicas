import { Transform, Expose } from "class-transformer";

class genero {
    @Expose({name: "genero"})
    @Transform(({value}) => {
        if(typeof value != "string") throw {status: 500, message: "Parametros incorrectos"}
        else {
          let convertLowerCase = value.toLowerCase(); 
          let reform = convertLowerCase[0].toUpperCase() + convertLowerCase.slice(1); 
          return reform; 
    }}, {toClassOnly: true})
    genero: string
    constructor(gn: string) {
        this.genero = gn;
    }
}

export default genero;