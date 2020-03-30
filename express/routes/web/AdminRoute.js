var express = require('express')
var router = express.Router()

const logController = require('../../controllers/web/LogController')

const admin = require('../../middleware/web/admin')

router.get('/logs', admin, logController.index)

module.exports = router

