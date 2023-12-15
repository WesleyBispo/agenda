const express = require('express')
const router = express.Router()

const logoutController = require("../src/controllers/logoutController")
const { loginRequired } = require('../src/middlewares/middlewareGlobal')


router.get('/', loginRequired, logoutController.main)

module.exports = router