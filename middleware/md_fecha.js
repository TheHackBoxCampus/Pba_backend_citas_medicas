import "reflect-metadata";
import express from "express"; 
import { plainToClass } from "class-transformer";
import fecha from "../controller/fecha.js"; 

let md_fecha = express(); 

md_fecha.use((req, res, next) => {
    try {
        let data = plainToClass(fecha, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data)); 
        next(); 
    }catch(err) {
        res.status(500).send(err)
    }
})

export default md_fecha; 