const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosGetVer,
  usuariosDeletePerm,
} = require("../controllers/user");
const {
  emailExiste,
  esCargoValido,
  existeCedula,
  existeUsuarioPorId,
  noExisteCedula,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);
router.get(
  "/ver",
  [
    check("cedula", "La cedula no existe en la BD").custom(noExisteCedula),
    validarCampos,
  ],
  usuariosGetVer
);
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("cedula", "la cedula ya está registrada").custom(existeCedula),
    check("correo", "el correo no es valido").isEmail(),
    check("correo", "el correo ya está registrado").custom(emailExiste),
    check("clave", "la clave debe ser segura").isStrongPassword(),
    check("cargo", "el cargo debe ser uno valido").custom(esCargoValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("cargo").custom(esCargoValido),
    validarCampos,
  ],

  usuariosPut
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.delete(
  "/eliminar/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDeletePerm
);

module.exports = router;
