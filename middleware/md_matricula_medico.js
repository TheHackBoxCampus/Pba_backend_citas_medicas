import "reflect-metadata";
import express from "express"; 
import { plainToClass } from "class-transformer";
import matricula from "../controller/matricula_medico.js";

let security = express(); 

security.use((req, res, next) => {
    try {
        let data = plainToClass(matricula, req.body, {excludeExtraneousValues: true}); 
        req.body = JSON.parse(JSON.stringify(data)); 
        next(); 
    }catch (err) {
        res.status(500).send(err)
    }
})

export default security; 