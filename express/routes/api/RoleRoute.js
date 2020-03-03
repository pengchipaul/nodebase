var express = require('express')
var router = express.Router()

var roleApiController = require('../../controllers/api/RoleApiController')
var test = require('../../middleware/test')

router.get('/all', test, function(req, res){
    roleApiController.all(req, res)
})

router.post('/create', test, function(req, res){
    roleApiController.create(req, res)
})

module.exports = router