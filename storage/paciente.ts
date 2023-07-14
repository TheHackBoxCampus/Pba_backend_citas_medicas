import { Transform, Expose, Exclude } from "class-transformer";

class paciente {
  @Expose({ name: "nombre" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  uName: string;
  @Expose({ name: "segundo_nombre" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  usgnName: string;
  @Expose({ name: "apellido" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  uLastname: string;
  @Expose({ name: "segundo_apellido" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  usgnLastname: string;
  @Expose({ name: "telefono" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  uphn: string;
  @Expose({ name: "correo" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  uml: string;
  @Expose({ name: "direccion" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  uddrs: string;
  @Expose({ name: "tipo_documento" })
  @Transform(
    ({ value }) => {
      if (typeof value != "number")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  uTD: number;
  @Expose({ name: "genero" })
  @Transform(
    ({ value }) => {
      if (typeof value != "number")
        throw { status: 400, message: "Parametros Incorrectos" };
      return value;
    },
    { toClassOnly: true }
  )
  ugn: number;
  @Exclude( {toPlainOnly: true} )
  @Expose({ name: "acudiente" })
  uac?: number;
  constructor(
    uName: string,
    usgnName: string,
    uLastname: string,
    usgnLastname: string,
    uphn: string,
    uml: string,
    uddrs: string,
    uTD: number,
    ugn: number,
    uac?: number
  ) {
    this.uName = uName;
    this.usgnName = usgnName;
    this.uLastname = uLastname;
    this.usgnLastname = usgnLastname;
    this.uphn = uphn;
    this.uml = uml;
    this.uddrs = uddrs;
    this.uTD = uTD;
    this.ugn = ugn;
    this.uac = uac;
  }
  
    valdUac():number {
       if(!this.uac) return;
       if(typeof this.uac != "number") {throw {status: 400, message: "Parametros Incorrectos"}}
       else {return this.uac}
   }
}

export default paciente;
