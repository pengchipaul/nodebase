var express = require('express')
var router = express.Router()

const authController = require('../../controllers/web/AuthController')
const guest = require('../../middleware/web/guest')
const csrf = require('../../middleware/web/csrf')

router.get('/login', [guest, csrf], authController.login)
router.get('/signup', [guest, csrf], authController.signup)

module.exports = router