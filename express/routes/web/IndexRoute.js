var express = require('express')
var router = express.Router()

const indexController = require('../../controllers/web/IndexController')
const auth = require('../../middleware/web/auth')
const role = require('../../middleware/web/role')

/* home page */
router.get('/', indexController.index)
/* user app page */
router.get('/app', auth, indexController.app)
/* other static pages */
router.get('/about', indexController.about)

module.exports = router