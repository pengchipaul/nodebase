var express = require('express')
var router = express.Router()

var userApiController = require('../../controllers/api/UserApiController')
var test = require('../../middleware/test')

router.get('/all', test, async function(req, res){
    userApiController.getAllUsers(req, res)
})

router.post('/create', test, async function(req, res){
    userApiController.createSample(req, res)
})

module.exports = router