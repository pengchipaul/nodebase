var express = require('express')
var router = express.Router()

const authController = require('../../controllers/web/AuthController')
const guest = require('../../middleware/web/guest')
const csrf = require('../../middleware/web/csrf')
const auth = require('../../middleware/web/auth')

router.get('/login', [guest, csrf], authController.login)
router.get('/signup', [guest, csrf], authController.signup)
router.post('/signin', [guest, csrf], authController.signin)
router.post('/register', [guest, csrf], authController.register)
router.post('/logout', auth, authController.logout)

module.exports = router