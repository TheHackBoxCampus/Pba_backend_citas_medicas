import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import paciente from "../controller/paciente.js";

let md_paciente = express();

md_paciente.use((req, res, next) => {
  try {
    let data = plainToClass(paciente, req.body, {
      excludeExtraneousValues: true,
    });
    req.body = JSON.parse(JSON.stringify(data));
    next();
  } catch (err) {
    res.status(500).send(err);
  }
});

export default md_paciente;
