const express = require("express")
const router = express.Router()

const homeController = require('../src/controllers/homeController')
const { loginRequired } = require("../src/middlewares/middlewareGlobal")

router.get('/', loginRequired, homeController.index)


module.exports = router

