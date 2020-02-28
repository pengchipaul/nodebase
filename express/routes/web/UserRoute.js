var express = require('express')
var router = express.Router()

var userController = require('../../controllers/web/UserController')

router.post('/create', async function(req, res){
    userController.createSample(req, res)
})

module.exports = router