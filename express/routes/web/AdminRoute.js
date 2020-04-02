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
router.get('/users/tab=user', admin, adminController.showUsers)
router.get('/users/tab=role', [admin, csrf], adminController.showRoles)
router.get('/users/edit/:id', [admin, csrf], adminController.editUser)
router.post('/users/roles/create', [admin, csrf], adminController.createRole)
router.patch('/users/update', [admin, csrf], adminController.updateUser)


module.exports = router

