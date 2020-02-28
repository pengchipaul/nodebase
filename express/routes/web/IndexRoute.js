var express = require('express')
var router = express.Router()

var indexController = require('../../controllers/web/IndexController')
/* home page */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
router.get('/about', indexController.about)

module.exports = router