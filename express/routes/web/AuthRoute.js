var express = require('express')
var router = express.Router()

const authController = require('../../controllers/web/AuthController')
const guest = require('../../middleware/web/guest')
const csrf = require('../../middleware/web/csrf')
const auth = require('../../middleware/web/auth')
const confirmPassword = require('../../middleware/web/confirmPassword')

router.get('/login', [guest, csrf], authController.login)
router.get('/signup', [guest, csrf], authController.signup)
router.get('/forget', [guest, csrf], authController.forget)
router.get('/reset/:resetToken', [guest, csrf], authController.resetForm)
router.post('/signin', [guest, csrf], authController.signin)
router.post('/register', [guest, csrf, confirmPassword], authController.register)
router.post('/logout', auth, authController.logout)
router.post('/send_reset_link', [guest, csrf], authController.send_reset_link)
router.post('/reset', [guest, csrf], confirmPassword, authController.reset)

module.exports = router