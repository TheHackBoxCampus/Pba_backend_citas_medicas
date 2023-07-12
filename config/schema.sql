CREATE DATABASE citasmedicas;

USE citasmedicas;


CREATE TABLE usuario (
    usu_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_nombre VARCHAR(50),
    usu_segdo_nombre VARCHAR(45),
    usu_primero_apellido VARCHAR(50),
    usu_segdo_apellido VARCHAR(45),
    usu_telefono VARCHAR(50),
    usu_direccion VARCHAR(100),
    usu_email VARCHAR(100),
    usu_tipodoc INT,
    usu_genero INT,
    usu_acudiente INT
)

INSERT INTO usuario(usu_nombre, usu_segdo_nombre, usu_primero_apellido, usu_segdo_apellido, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente)
VALUES ("eduardo", "martinez", "nosa", "alvarez", "122111", "carrera 3", "email@gmail.com", 1, 1, 1)

INSERT INTO genero (gen_nombre, gen_abreviatura) VALUES ("masculino", "M")
INSERT INTO tipo_documento (tipdoc_nombre, tipodoc_abreviatura) VALUES ("tarjeta identidad", "TI"), ("cedula", "cc");

INSERT INTO acudiente (acu_nombreCompleto, acu_telefono, acu_direccion) VALUES ("Edgar Sanchez", "14234324", "carrera 22")

CREATE TABLE tipo_documento (
    tipodoc_id INT PRIMARY KEY AUTO_INCREMENT,
    tipdoc_nombre VARCHAR(20),
    tipodoc_abreviatura VARCHAR(20)
)

CREATE TABLE genero (
    gen_id INT PRIMARY KEY AUTO_INCREMENT,
    gen_nombre VARCHAR(20),
    gen_abreviatura VARCHAR(20)
)

CREATE TABLE acudiente (
    acu_codigo INT PRIMARY KEY AUTO_INCREMENT,
    acu_nombreCompleto VARCHAR(100),
    acu_telefono VARCHAR(100),
    acu_direccion VARCHAR(200)
)

CREATE TABLE cita (
    cit_codigo INT PRIMARY KEY AUTO_INCREMENT,
    cit_fecha DATE,
    cit_estadoCita INT,
    cit_medico INT,
    cit_datosUsuario INT
)

CREATE TABLE estado_cita (
    estcita_id INT PRIMARY KEY AUTO_INCREMENT,
    estcita_nombre VARCHAR(20)
)

CREATE TABLE medico (
    med_nrMatriculaProfesional INT PRIMARY KEY,
    med_nombreCompleto VARCHAR(120),
    med_consultorio INT,
    med_especialidad INT
)

CREATE TABLE especialidad (
    esp_id INT PRIMARY KEY AUTO_INCREMENT,
    esp_nombre VARCHAR(20)
)

CREATE TABLE consultorio (
    cons_codigo INT PRIMARY KEY AUTO_INCREMENT,
    cons_nombre VARCHAR(50)
)

ALTER TABLE acudiente
DROP CONSTRAINT fk_usuario_acudiente

ALTER TABLE usuario
ADD CONSTRAINT fk_usuario_tipo_documento
FOREIGN KEY (usu_tipodoc)
REFERENCES tipo_documento(tipodoc_id)

ALTER TABLE usuario
ADD CONSTRAINT fk_usuario_genero
FOREIGN KEY (usu_genero)
REFERENCES genero(gen_id)

ALTER TABLE usuario
ADD CONSTRAINT fk_usuario_acudiente
FOREIGN KEY (usu_acudiente)
REFERENCES acudiente(acu_codigo)

ALTER TABLE cita
ADD CONSTRAINT fk_usuario_datos_usuario
FOREIGN KEY (cit_datosUsuario)
REFERENCES usuario(usu_id)

ALTER TABLE cita 
ADD CONSTRAINT fk_cita_estado_cita
FOREIGN KEY (cit_estadoCita)
REFERENCES estado_cita(estcita_id)

ALTER TABLE cita
ADD CONSTRAINT fk_cita_medico
FOREIGN KEY (cit_medico)
REFERENCES medico(med_nrMatriculaProfesional)

ALTER TABLE medico 
ADD CONSTRAINT fk_medico_especialidad
FOREIGN KEY (med_especialidad)
REFERENCES especialidad(esp_id)

ALTER TABLE medico 
ADD CONSTRAINT fk_medico_consultorio
FOREIGN KEY (med_consultorio)
REFERENCES consultorio(cons_codigo)


INSERT INTO usuario(usu_nombre, usu_segdo_nombre, usu_primero_apellido, usu_segdo_apellido, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente)
VALUES ("martinez", "eduard", "almeida", "chacon", "60001", "carrera21", "esmails@gmail.com", 1, 1, 1)

INSERT INTO genero (gen_nombre, gen_abreviatura) VALUES ("masculino", "M")
INSERT INTO tipo_documento (tipdoc_nombre, tipodoc_abreviatura) VALUES ("tarjeta identidad", "TI"), ("cedula", "cc");

INSERT INTO acudiente (acu_nombreCompleto, acu_telefono, acu_direccion) VALUES ("Edgar Sanchez", "14234324", "carrera 22")

INSERT INTO estado_cita (estcita_nombre) VALUES ("BIEN")

INSERT INTO especialidad (esp_nombre) VALUES ("general")

INSERT INTO consultorio (cons_nombre) VALUES ("A3")

INSERT INTO medico (med_nrMatriculaProfesional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES (132123, "johani Rojas", 1,1)

INSERT INTO cita (cit_fecha, cit_estadoCita, cit_medico,  cit_datosUsuario) VALUES ("2005/09/12", 1, 132123, 1);