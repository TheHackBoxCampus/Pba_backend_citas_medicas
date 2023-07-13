import "reflect-metadata";
import express from "express"; 
import { plainToClass } from "class-transformer";
import genero from "../controller/genero.js";

let md_genero = express(); 

md_genero.use((req, res, next) => {
    try{
        let data = plainToClass(genero, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next(); 
    }catch (err) {
        res.status(500).send(err)
    }
})

export default md_genero; 