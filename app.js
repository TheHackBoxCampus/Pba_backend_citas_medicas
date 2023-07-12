import express from "express";
import dotenv from "dotenv"; 
import router from "./router/router.js";

// vars 
dotenv.config(); 
let $server = JSON.parse(process.env.server)

// principal variable
let app = express(); 

// middleware
app.use(express.json());
app.use(express.text());
app.use("/consulta", router)

app.listen($server, () => {
    console.log(`listening http://${$server.hostname}:${$server.port}`); 
})


