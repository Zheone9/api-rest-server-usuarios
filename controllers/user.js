const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const usuariosGetVer = async (req = request, res = response) => {
  const { cedula } = req.query;

  try {
    const usuarios = await Usuario.findOne({ cedula });

    res.json(usuarios);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }
};

const usuariosGet = async (req = request, res = response) => {
  const { limite, edad, cargo, estado, cedula, nombre } = req.query;
  try {
    //numero de usuarios refistrados
    // const total = await Usuario.countDocuments();

    queryCond = {
      ...(edad && { edad }),
      ...(cargo && { cargo }),
      ...(estado && { estado }),
      ...(cedula && { cedula }),
      ...(nombre && { nombre }),
    };

    const usuarios = await Usuario.find(queryCond).limit(Number(limite));
    const total = usuarios.length;
    if (usuarios.length > 0) {
      res.json({
        status: 200,
        data: {
          total,
          usuarios,
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        msg: "No se encontraron resultados",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }
};

const usuariosPost = async (req = request, res = response) => {
  try {
    const { cedula, nombre, correo, salario, genero, edad, clave, cargo } =
      req.body;
    const usuario = new Usuario({
      cedula,
      nombre,
      correo,
      salario,
      genero,
      edad,
      clave,
      cargo,
    });

    const salt = bcrypt.genSaltSync();

    usuario.clave = bcrypt.hashSync(clave, salt);

    //guardar en db
    await usuario.save();
    res.json({
      usuario,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }
};

const usuariosPut = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const { _id, clave, ...resto } = req.body;

    if (clave) {
      const salt = bcrypt.genSaltSync();
      resto.clave = bcrypt.hashSync(clave, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuarioDB);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

const usuariosDeletePerm = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndDelete(id);

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
  usuariosGetVer,
  usuariosDeletePerm,
};
