import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import id_paciente from "../controller/paciente_id.js";

let md_paciente_id = express();

md_paciente_id.use((req, res, next) => {
  try {
    let data = plainToClass(id_paciente, req.body, {
      excludeExtraneousValues: true,
    });
    req.body = JSON.parse(JSON.stringify(data));
    next();
  } catch (err) {
    res.status(500).send(err);
  }
});

export default md_paciente_id;
