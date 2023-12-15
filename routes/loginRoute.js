const express = require("express")
const router = express.Router()

const loginController = require('../src/controllers/loginController')


router.get('/', loginController.index)
router.post('/register', loginController.register)
router.post('/login', loginController.login)


module.exports = router

