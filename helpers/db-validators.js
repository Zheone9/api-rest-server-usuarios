const Cargo = require("../models/cargo");
const Usuario = require("../models/usuario");

const esCargoValido = async (cargo = "") => {
  const existeRol = await Cargo.findOne({ cargo });
  if (!existeRol) {
    throw new Error(`el cargo "${cargo}" no existe en la base de datos`);
  }
};
//verificar si el correo existe
const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error("el correo ya existe");
  }
};
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`el id "${id}" no existe en la base de datos`);
  }
};

const existeCedula = async (cedula) => {
  const existeCed = await Usuario.findOne({ cedula });

  if (existeCed) {
    throw new Error(`la cedula "${cedula}" ya está registrada`);
  }
};

const noExisteCedula = async (cedula) => {
  const existeCed = await Usuario.findOne({ cedula });
  if (!existeCed) {
    throw new Error(`la cedula "${cedula}" no existe en la base de datos`);
  }
};

module.exports = {
  esCargoValido,
  emailExiste,
  existeUsuarioPorId,
  existeCedula,
  noExisteCedula,
};
