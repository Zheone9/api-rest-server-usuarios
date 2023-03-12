const express = require("express");
const { dbConnection } = require("./db/config");
const cors = require("cors");

require("dotenv").config();

const expressApp = express();
//Base de datos
dbConnection();
//cors
expressApp.use(cors());
//Directorio publico
expressApp.use(express.static("public"));
//Lectura y parseo del body
expressApp.use(express.json());
//Rutas
expressApp.use("/api/auth", require("./routes/auth"));

//TODO: CRUD: Eventos

expressApp.listen(process.env.PORT, () => {
  console.log("servidor corriendo en puerto " + process.env.PORT);
});
