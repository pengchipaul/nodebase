var express = require('express')
var router = express.Router()

var roleApiController = require('../../controllers/api/RoleApiController')
var test = require('../../middleware/api/test')

router.get('/all', test, roleApiController.all)
router.post('/create', test, roleApiController.create)

module.exports = router