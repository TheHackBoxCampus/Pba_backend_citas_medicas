## inicialización del proyecto

  Para iniciar el proyecto necesitas clonar el repositorio.

```bash
git clone 'URL' 
cd proyect 
```

  Una vez clonado instala las dependencias.  

> - ``Express``
> - ``nodemon``
> - ``dotenv``
> - ``class-transformer``
> - ``class-validator``
> - ``reflect-metadata``
> - ``typescript``
> - ``mysql``

```bash
npm install
```

### Configuramos el nodemon en el package-json


 ```json
    "scripts": {
    "dev": "nodemon --quiet app.js"
  }
 ```

## Configurar typescript, para compilar codigo:
- Crear un archivo ``tsconfig.json``
- Colocar la configuración correspondiente

```json
{
    "compilerOptions" : {
      "target": "es6",
      "module": "ES6",
      "moduleResolution": "node",
      "outDir": "./controller",
      "esModuleInterop": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true
    }
} 
```
### Configurar el typescript en el package-json
```json 
"scripts": {
    "tsc": "tsc -w"
}
```

## Despligue 
Para desplegar el nodemon y typescript, deberas escribir el siguiente comando:
```bash
npm run /*name script*/
```
Si seguimos el ejemplo del proyecto
```bash
npm run dev | npm run tsc
```


## Configurar Express y lanzar servidor

Para que los endpoints tengan funcionamiento con el `` Router ``  de express, primero tenemos que desplegar un servidor 
```js
import express from 'express';
let app = express();

let config = {
    hostname : "IP",
    port: "port"
};

app.listen(config, () => {
    console.log(`server lanzado en http://${config.hostname}:${config.port}`);
})
```
Configuramos los middleware para que acepte valores json y de texto
```javascript
import express from 'express';
let app = express(); 
// middleware
app.use(express.text())
app.use(express.json())
```
Con el ``Router`` de express en nuestro archivo app.js definimos la ruta principal llamada dbCampus
```javascript
// importamos las rutas de nuestro archivo routes, /* mas informacion mas adelante */
import express from 'express';
import router from './router/routes.js'
let app = express(); 

app.use("consultas", router); 
```


## Conexión con base de datos MYSQL

Para la conexion se utilizan variables de entorno para administrar credenciales

- El archivo .env cuenta con estos datos 
- Archivo de guia .env-example

Para su uso se configura el archivo .env

```markdown
config={...data}
```
- En el archivo database importas la libreria `` dotevn `` para el reconocimiento de las variables definidas con anterioridad

- importas mysql para efectuar la conexión

- Ejecutas el metodo ``config()`` de la libreria ``dotenv``

- El process.env reconoce las variables de entorno, una vez ya ejecutado el metodo ``config()``, el process.env.config es el nombre del json definido en el archivo .env, en caso de cambiar el nombre deberas cambiarlo tambien en la variable

- En mysql con ``createConnection()`` lanzas la conexion, le pasas las variables previamente definidas ``createConnection(vars)`` y ejecutas un callback a la variables de conexion creada con el metodo ``connect()`` para retornar un valor en caso de que se conecte y de que NO se conecte.

- Exportas la conexion para ejecutarla en el router
```javascript
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config() // variables de entorno
let variables = process.env.config 

let connection = mysql.createConnection(variables); 
connection.connect((err) =>  err ? console.log(err) : console.log("connect!!!!!")); 

export default connection; 
```

## Enrutado con Router / Express 

### Consultas HTTP en Router / Express

Para ejecutar esta consultas:
- Importar el MODULO ``Router`` de express
- importar la conexión exportada con anterioridad

En mi caso utilice la libreria nanoID para ids aleatorias no repetibles, puedes utilizar mas metodos u otras librerias para hacer este paso (opcional).
- Importamos el modulo ``customAlphabet`` de nanoID
- definimos el  ``Router`` en una variable
- Efectuamos lógica para las consultas ``http``

```javascript
import { Router } from "express";
import { customAlphabet } from "nanoid";
import connection from "./config/database.js";

let router = Router(); 

// diferentes metodos get, post, put, delete
router.get(/*query*/, (req, res) => {
    err ? 
        res
          .send(err)
        :
         // logica de consulta
} )
```
## Mas información de las librerias utilizadas
- class validator
[![class-validator](https://github.com/typestack/class-validator/workflows/CI/badge.svg)](https://github.com/typestack/class-validator.git)

- class transformer
[![class-transformer](https://github.com/typestack/class-validator/workflows/CI/badge.svg)](https://github.com/typestack/class-transformer.git)

- reflect metadata
[![reflect-metadata](https://github.com/typestack/class-validator/workflows/CI/badge.svg)](https://github.com/rbuckton/reflect-metadata.git)

## funcionamiento de los endpoints 

### Endpoint:  /pacientes
```txt
Objetivo: 
- Obtener todos los pacientes alfabéticamente

Cosas a tener en consideración
- El endpoint unicamente envia data, es decir que la data entrante no tendra ningun funcionamiento

Metodo: GET
```

### Endpoint:  /citas/orden
```txt
Objetivo:
- Obtener todas las citas alfabéticamente

Cosas a tener en consideración
- El endpoint unicamente envia data, es decir que la data entrante no tendra ningun funcionamiento

Metodo: GET
```

### Endpoint:  /especialidad/medico
```txt
Objetivo: 
- Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**)

Cosas a tener en consideracion: 
- los parametros de la data deben estar escritos de la manera en como se indica a continuacion
- No pueden ir parametros vacios
- los parametros deben ser existentes para evitar excepciones

Metodo: POST
```

```json
{
    "especialidad": "..." // type String 
}
```

### Endpoint:  /citas
```txt
Objetivo:
- Encontrar la próxima cita para un paciente específico (por ejemplo, el paciente con **usu_id 1**):

Cosas a tener en consideración
- El endpoint unicamente envia data, es decir que la data entrante no tendra ningun funcionamiento

Metodo: GET
```

### Enpoint: /medico/citas
```txt
Objetivo: 
- Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con **med_nroMatriculaProsional 1**)

Cosas a tener en consideracion
- los parametros de la data deben estar escritos de la manera en como se indica a continuacion
- No pueden ir parametros vacios
- los parametros deben ser existentes para evitar excepciones

Metodo: POST
``` 

```json
{
    "matricula": "..." // type number
}
```

### Enpoint: /paciente/citas
```txt
Objetivo:
- Obtener las consultorías para un paciente específico (por ejemplo, paciente **con usu_id 1**)

Cosas a tener en consideracion
- los parametros de la data deben estar escritos de la manera en como se indica a continuacion
- No pueden ir parametros vacios
- los parametros deben ser existentes para evitar excepciones

Metodo: POST
```

```json
{
    "id": "..." // type number
}
```

### Endpoint: /fecha/citas
```txt
Objetivo:
- Encontrar todas las citas para un día específico (por ejemplo, **'2023-07-12'**)

Cosas a tener en consideracion
- los parametros de la data deben estar escritos de la manera en como se indica a continuacion
- No pueden ir parametros vacios
- los parametros deben ser existentes para evitar excepciones`
- Formato de hora correspondiente => y/m/d : 2023/09/21

Metodo: POST
```

```json
{
    "fecha": "..." // type string
}
```

### Endpoint:  /medico/consultorio
```txt
Objetivo:
- Obtener los médicos y sus consultorios

Cosas a tener en consideración
- El endpoint unicamente envia data, es decir que la data entrante no tendra ningun funcionamiento

Metodo: GET
```

### Endpoint: /medico/citas/numero
```txt
Objetivo:
- Contar el número de citas que un médico tiene en un día específico (por ejemplo, el médico con **med_nroMatriculaProsional 1 en '2023-07-12'**)

Cosas a tener en consideración
- El endpoint unicamente envia data, es decir que la data entrante no tendra ningun funcionamiento

Metodo: GET
```

### Endpoint: /paciente/consultorio
```txt
Objetivo:
- Obtener los consultorio donde se aplicó las citas de un paciente

Cosas a tener en consideración
- El endpoint unicamente envia data, es decir que la data entrante no tendra ningun funcionamiento

Metodo: GET
```

### Endpoint: /genero/cita
```txt
Objetivo:
- Obtener todas las citas realizadas por los pacientes de un genero si su estado de la cita fue atendidad

Cosas a tener en consideracion
- los parametros de la data deben estar escritos de la manera en como se indica a continuacion
- No pueden ir parametros vacios
- los parametros deben ser existentes para evitar excepciones`
- Valores posibles: Masculino - Femenino

Metodo: POST
```

```json
{
    "genero": "..." // type string
}
```

### Endpoint:  /paciente/nuevo
```txt
Objetivo:
- Insertar un paciente a la tabla usuario pero si es menor de edad solicitar primero que ingrese el acudiente y validar si ya estaba registrado el acudiente.

Cosas a tener en consideracion
- los parametros de la data deben estar escritos de la manera en como se indica a continuacion
- No pueden ir parametros vacios
- los parametros deben ser existentes para evitar excepciones`
- * valor opcional acudiente, el en caso de que el paciente sea menor de edad y tenga el tipo de documento de tipo 1
- tipo de documento 1 = tarjeta de identidad || ti
- tipo de documento 2 = cedula || cc
- genero 1 = masculino
- genero 2 = femenino

Metodo: POST
```

```json
{
    "nombre": "...", // type string
    "segundo_nombre": "...", // type string
    "apellido": "...", // type string
    "segundo_apellido": "...", // type string
    "telefono": "...", // type string
    "correo": "...", // type string
    "direccion": "...", // type string
    "tipo_documento": "...", // type number
    "genero": "...", // type number
    "acudiente": "...", // type string * optional
}
```

### Endpoint:  /citas/rechazadas
```txt
Objetivo:
- Mostrar todas las citas que fueron rechazadas y en un mes específico, mostrar la fecha de la cita, el nombre del usuario y el médico.

Cosas a tener en consideracion
- los parametros de la data deben estar escritos de la manera en como se indica a continuacion
- No pueden ir parametros vacios
- los parametros deben ser existentes para evitar excepciones`
- valores permitidos numeros del 1 al 12, siguiendo el orden de cada mes.

Metodo: POST
```

```json
{
    "mes": "..." // type number
}
```