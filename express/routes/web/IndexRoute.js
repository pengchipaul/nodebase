var express = require('express')
var router = express.Router()

var indexController = require('../../controllers/web/IndexController')
/* home page */
router.get('/app', function(req, res) {
    res.render('index/app')
})
router.get('/about', indexController.about)

module.exports = router