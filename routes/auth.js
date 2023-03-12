const { Router } = require("express");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateUser } = require("../middlewares/userValidator");
const { validarJWT } = require("../middlewares/validateToken");
const { userSchema } = require("../schemas/auth");

const router = Router();

router.post("/", [validateUser(userSchema, true)], loginUser);
router.post("/new", [validateUser(userSchema)], createUser);
router.get("/renew", validarJWT, renewToken);

module.exports = router;
