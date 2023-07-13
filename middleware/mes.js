import "reflect-metadata";
import express from "express"; 
import { plainToClass } from "class-transformer";
import mes from "../controller/mes.js";

let md_mes = express(); 
md_mes.use((req, res, next) => {
    try {
        let data = plainToClass(mes, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data)); 
        next(); 
    }catch(err) {
        res.status(500).send(err)
    }
})
export default md_mes; 