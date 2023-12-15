const express = require('express')
const router = express.Router()

const contatoController = require("../src/controllers/contatoController")
const { loginRequired } = require('../src/middlewares/middlewareGlobal')

router.get("/", loginRequired, contatoController.indexRegister)
router.post("/register", loginRequired, contatoController.register)
router.get("/:id", loginRequired, contatoController.UpdateIndex)
router.post("/edit/:id", loginRequired, contatoController.update)
router.get("/delete/:id", loginRequired, contatoController.remove)

module.exports = router