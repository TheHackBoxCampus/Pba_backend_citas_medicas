import { Router } from "express";
import connection from "../config/database.js";
import md_especialidad from "../middleware/md_especialidad.js";
import md_matricula from "../middleware/md_matricula_medico.js";
import md_paciente_id from "../middleware/md_paciente_id.js";
import md_fecha from "../middleware/md_fecha.js";
import md_genero from "../middleware/md_genero.js";
import md_paciente from "../middleware/md_paciente.js";
import md_mes from "../middleware/mes.js";

let router = Router();

router.get("/pacientes", (req, res) => {
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
    if (err) res.status(400).send(err);
    res.status(200).json(results);
  });
});

router.get("/citas/orden", (req, res) => {
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
    if (err) res.status(400).send(err);
    res.status(200).json(results);
  });
});

router.post("/especialidad/medico", md_especialidad, (req, res) => {
  let data = req.body;
  let orderJobDoctor = /* sql */ `
    SELECT m.med_nombreCompleto as nombre,
          e.esp_nombre as Especialidad
    FROM medico AS m
    JOIN especialidad as e ON e.esp_id = m.med_especialidad
    HAVING Especialidad = ?`;

  connection.query(orderJobDoctor, Object.values(data), (err, results) => {
    if (err) res.status(400).send(err);
    else {
      if (Object.entries(results).length < 1)
        res.status(400).json({ status: 400, message: "undefined" });
      else res.status(200).json(results);
    }
  });
});

router.get("/citas", (req, res) => {
  let searchCites = /* sql */ `
        SELECT c.cit_fecha AS Fecha,
               m.med_nombreCompleto as Medico,
               u.usu_id as IdPaciente,
               u.usu_nombre AS Paciente
        FROM cita AS c
        JOIN medico AS m ON c.cit_medico = m.med_nrMatriculaProfesional
        JOIN usuario AS u on c.cit_datosUsuario = u.usu_id
    `;
  connection.query(searchCites, (err, results) => {
    err ? res.status(500).send(err) : res.status(200).send(results);
  });
});

router.post("/medico/citas", md_matricula, (req, res) => {
  let data = req.body;
  let searchCiteDoctor = /* sql */ `
        SELECT c.cit_fecha AS Fecha,
	           u.usu_nombre as Paciente,
               m.med_nrMatriculaProfesional AS Matricula,
               m.med_nombreCompleto as Medico
        FROM cita AS c 
        JOIN usuario AS u ON c.cit_datosUsuario = u.usu_id
        JOIN medico AS m ON c.cit_medico = m.med_nrMatriculaProfesional 
        HAVING Matricula = ?;
    `;
  connection.query(searchCiteDoctor, Object.values(data), (err, results) => {
    if (err) res.status(400).send(err);
    else {
      if (Object.entries(results).length < 1)
        res.status(400).json({ status: 400, message: "undefined" });
      else res.status(200).json(results);
    }
  });
});

router.post("/paciente/citas", md_paciente_id, (req, res) => {
  let data = req.body;
  let searchCitePatient = /* sql */ `
        SELECT c.cit_fecha AS Fecha,
               u.usu_nombre as Paciente,
               m.med_nombreCompleto AS Medico,
               ct.cons_nombre as Consultorio
        FROM cita AS c
        JOIN medico AS m ON c.cit_medico = m.med_nrMatriculaProfesional
        JOIN consultorio AS ct ON m.med_consultorio = ct.cons_codigo
        JOIN usuario AS u ON u.usu_id = c.cit_datosUsuario
        WHERE u.usu_id = ?
    `;

  connection.query(searchCitePatient, Object.values(data), (err, results) => {
    if (err) res.status(400).send(err);
    else {
      if (Object.entries(results).length < 1)
        res.status(400).json({ status: 400, message: "undefined" });
      else res.status(200).json(results);
    }
  });
});

router.post("/fecha/citas", md_fecha, (req, res) => {
  let data = req.body;
  let searchCiteDate = /* sql */ `
        SELECT c.cit_fecha AS Fecha,
               m.med_nombreCompleto AS Medico,
               u.usu_nombre AS Paciente       
        FROM cita AS c
        JOIN medico AS m ON c.cit_medico = m.med_nrMatriculaProfesional
        JOIN usuario AS u ON c.cit_datosUsuario = u.usu_id
        HAVING Fecha = ?;   
    `;

  connection.query(searchCiteDate, Object.values(data), (err, results) => {
    if (err) res.status(400).send(err);
    else {
      if (Object.entries(results).length < 1)
        res.status(400).json({ status: 400, message: "undefined" });
      else res.status(200).json(results);
    }
  });
});

router.get("/medico/consultorio", (req, res) => {
  let searchConsultoryDoctor = /* sql */ `
        SELECT m.med_nombreCompleto AS Medico,
               c.cons_nombre as consultorio
        FROM medico AS m
        JOIN consultorio AS c ON m.med_consultorio = c.cons_codigo
    `;

  connection.query(searchConsultoryDoctor, (err, results) => {
    err ? res.status(500).send(err) : res.status(200).send(results);
  });
});

router.get("/medico/citas/numero", (req, res) => {
  let searchCountCitesDoctor = /* sql */ `
    SELECT c.cit_fecha AS Fecha,
	       u.usu_nombre as Paciente,
           m.med_nrMatriculaProfesional AS Matricula,
           m.med_nombreCompleto as Medico,
           COUNT(c.cit_fecha) AS Citas
    FROM cita AS c 
    JOIN usuario AS u ON c.cit_datosUsuario = u.usu_id
    JOIN medico AS m ON c.cit_medico = m.med_nrMatriculaProfesional 
    GROUP BY Fecha
    `;

  connection.query(searchCountCitesDoctor, (err, results) => {
    err ? res.status(500).send(err) : res.status(200).send(results);
  });
});

router.get("/paciente/consultorio", (req, res) => {
  let searchStatusCite = /* sql */ `
        SELECT u.usu_nombre AS Paciente,
               ct.cons_nombre AS Consultorio,
               c.cit_fecha AS Fecha
        FROM cita AS c
        JOIN medico AS m ON c.cit_medico = m.med_nrMatriculaProfesional
        JOIN usuario AS u ON u.usu_id = c.cit_datosUsuario
        JOIN consultorio AS ct ON ct.cons_codigo = m.med_consultorio
    `;

  connection.query(searchStatusCite, (err, results) => {
    err ? res.status(500).send(err) : res.status(200).send(results);
  });
});

router.post("/genero/cita", md_genero, (req, res) => {
  let data = req.body;
  let searchGCites = /* sql */ `
        SELECT e.estcita_nombre AS Estado_cita, 
               u.usu_nombre AS Paciente,
               c.cit_fecha AS Fecha	   
        FROM usuario AS u
        JOIN cita AS c ON c.cit_datosUsuario = u.usu_id
        JOIN genero AS g ON g.gen_id = u.usu_genero
        JOIN estado_cita AS e ON e.estcita_id = c.cit_estadoCita
        WHERE g.gen_nombre = ? AND e.estcita_nombre = "Atendido" 
    `;

  connection.query(searchGCites, Object.values(data), (err, results) => {
    if (err) res.status(400).send(err);
    else {
      if (Object.entries(results).length < 1)
        res.status(400).json({ status: 400, message: "undefined" });
      else {
        res.status(200).json(results);
      }
    }
  });
});

router.post("/paciente/nuevo", md_paciente, (req, res) => {
  let data = req.body;
  let insertNewPatient = /* sql */ `
    INSERT INTO usuario(usu_nombre, usu_segdo_nombre, usu_primero_apellido, usu_segdo_apellido, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let insertNewPatientlegal = /* sql */ `
    INSERT INTO usuario(usu_nombre, usu_segdo_nombre, usu_primero_apellido, usu_segdo_apellido, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let searchAge = /* sql */ `SELECT tipodoc_id as id FROM tipo_documento`;
  connection.query(searchAge, (err, results) => {
    if (err) res.send(err);
    else {
      let minor = false;
      let legal = false;

      for (let y = 0; y < results.length; y++) {
        if (results[y].id == 1 && results[y].id == data["uTD"]) {
          minor = true;
        } else legal = true;
      }

      if (minor) {
        if(data['uac'] == undefined) {
          res.status(500).send({message: "Eres menor de edad, Escribe a tu acudiente"})
        }else {
          let searchAc = /* sql */ `SELECT acu_codigo AS id FROM acudiente`;
          connection.query(searchAc, (err, results) => {
            if (err) res.status(500).send(err);
            else {
              let exist = false;
              for (let x = 0; x < results.length; x++) {
                if (results[x].id == data["uac"]) {
                  exist = true;
                }
              }
              if (exist) {
                connection.query(insertNewPatient, Object.values(data), (err) => {
                  err
                    ? res.status(500).send(err)
                    : res
                        .status(200)
                        .send({
                          status: 200,
                          message: "Se insertaron los campos correctamente!",
                        });
                });
              } else {
                res
                  .status(500)
                  .send({
                    status: 400,
                    message: "El acudiente no existe en la BD",
                  });
              }
            }
          });
        }
      } else if (legal) {
        connection.query(insertNewPatientlegal, Object.values(data), (err) => {
          err
            ? res.status(500).send(err)
            : res
                .status(200)
                .send({
                  status: 200,
                  message: "Se insertaron los campos correctamente!",
                });
        });
      }
    }
  });
});

router.post("/citas/rechazadas", md_mes, (req, res) => {
  let data = req.body;
  let searchCitesDenied = /* sql */ `
    SELECT c.cit_fecha AS Fecha,
           u.usu_nombre as Paciente,
           m.med_nrMatriculaProfesional AS Matricula,
           m.med_nombreCompleto as Medico,
           e.estcita_nombre AS estado
    FROM cita AS c 
    JOIN usuario AS u ON c.cit_datosUsuario = u.usu_id
    JOIN medico AS m ON c.cit_medico = m.med_nrMatriculaProfesional 
    JOIN estado_cita AS e ON c.cit_estadoCita = e.estcita_id
    WHERE EXTRACT(MONTH FROM c.cit_fecha) = ?
    GROUP BY Fecha
    `;
  connection.query(searchCitesDenied, Object.values(data), (err, results) => {
    err ? res.status(500).send(results) : res.status(200).send(results);
  });
});

export default router;
