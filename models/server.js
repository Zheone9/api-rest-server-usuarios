const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/usuarios";

    this.middlewares();
    this.routes();
    this.connectDB();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connectDB() {
    await dbConnection();
  }
  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
