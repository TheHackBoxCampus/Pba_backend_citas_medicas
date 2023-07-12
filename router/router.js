import { Router } from "express";
import connection from "../config/database.js";
import security from "../middleware/md_especialidad.js";

let router = Router();

router.get('/pacientes', (req, res) => {
    let orderUsers = /* sql */ `
    SELECT usu_id AS id,
           usu_nombre AS nombre,
           usu_primero_apellido AS apellido,
           usu_telefono AS telefono,
           usu_direccion AS direccion,
           usu_email AS correo,
           t.tipdoc_nombre AS documento,
           g.gen_nombre,
           a.acu_nombreCompleto
    FROM usuario as u
    JOIN tipo_documento AS t ON u.usu_tipodoc = t.tipodoc_id
    JOIN genero AS g ON u.usu_genero = g.gen_id
    JOIN acudiente AS a ON u.usu_acudiente = a.acu_codigo
    ORDER BY nombre ASC
    `;

    connection.query(orderUsers, (err, results) => {
        if(err) res.status(400).send(err)
        res.status(200).json(results); 
    })
})

router.get("/citas/orden", (req,res) => {
    let orderCites = /* sql */ `
    SELECT c.cit_codigo as Codigo, 
	       c.cit_fecha as Fecha, 
           e.estcita_nombre as Estado, 
           m.med_nombreCompleto as Medico,
           u.usu_nombre as Paciente
    FROM cita as c
    JOIN estado_cita as e ON c.cit_estadoCita = e.estcita_id
    JOIN medico as m ON c.cit_medico = m.med_nrMatriculaProfesional
    JOIN usuario as u ON c.cit_datosUsuario = u.usu_id
    ORDER BY c.cit_fecha ASC 
    `;

    connection.query(orderCites, (err, results) => {
        if(err) res.status(400).send(err)
        res.status(200).json(results);
    })
})


router.post("/especialidad/medico", security, (req, res) => {
    let data = req.body; 
    let orderJobDoctor = /* sql */ `
    SELECT m.med_nombreCompleto as nombre,
          e.esp_nombre as Especialidad
    FROM medico AS m
    JOIN especialidad as e ON e.esp_id = m.med_especialidad
    HAVING Especialidad = ?`;
    
    connection.query(orderJobDoctor, req.body["especialidad"], (err, results) => {
        if(err) res.status(400).send(err)
        res.status(200).json(results); 
    })
})

export default router;