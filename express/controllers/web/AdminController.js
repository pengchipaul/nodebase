const userDAC = require('../dac/UserDAC')
const roleDAC = require('../dac/RoleDAC')

module.exports = {
    index: async function(req, res) {
        try {
            const users = await userDAC.all()
            const roles = await roleDAC.all()
            if(req.params.tab){
                switch(req.params.tab) {
                    case 'role':
                        return res.render('admin/index', { tab: "role", users, roles, csrfToken: req.csrfToken() }) 
                    default:
                        return res.render('admin/index', { tab: "user", users, roles, csrfToken: req.csrfToken() })
                }
            } else {
                return res.render('admin/index', { tab: "user", users, roles, csrfToken: req.csrfToken() })
            }
            
        } catch(e) {
            req.session.info = {
                dangers: [
                    "Unable to get user and role data"
                ]
            }
            return res.render('admin/index')
        }
    },
    editUser: async function(req, res){
        try {
            const user = await userDAC.findById(req.params.id)
            const roles = await roleDAC.all()
            return res.render('admin/user/edit', {user, roles, csrfToken: req.csrfToken()})
        } catch(e) {
            req.session.info = {
                dangers: [
                    'Unable to get user info'
                ]
            }
            return res.redirect('back')
        }
    },
    createRole: async function(req, res) {
        try {
            await roleDAC.create(req.body)
            req.session.info = {
                success: [
                    "Role was created successfully!"
                ]
            }
            return res.redirect('/admin/index/tab=role')
        } catch (e) {
            req.session.info = {
                dangers: [
                    "Unable to create role"
                ]
            }
            return res.redirect('/admin/index/tab=role')
        }
    }
}