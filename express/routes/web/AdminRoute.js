var express = require('express')
var router = express.Router()

const logController = require('../../controllers/web/LogController')
const adminController = require('../../controllers/web/AdminController')

const admin = require('../../middleware/web/admin')
const csrf = require('../../middleware/web/csrf')

/* routes for logging */
router.get('/logs', admin, logController.index)

/* routes for admin management */
router.get('/index', [admin, csrf], function(req, res) {
    res.redirect('/admin/index/tab=user')
})
router.get('/index/tab=:tab', [admin, csrf], adminController.index)
router.get('/users/edit/:id', [admin, csrf], adminController.editUser)
router.post('/roles/create', [admin, csrf], adminController.createRole)


module.exports = router

