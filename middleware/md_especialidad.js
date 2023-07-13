import express from "express";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import especialidad from "../controller/especialidad_medico.js";

let security = express();

security.use((req, res, next) => {
  try {
    let data = plainToClass(especialidad, req.body);
    req.body = JSON.parse(JSON.stringify(data));
    next();
  } catch (err) {
    res.send(err);
  }
});

export default security;
