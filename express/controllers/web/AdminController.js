const userDAC = require('../dac/UserDAC')
const roleDAC = require('../dac/RoleDAC')

module.exports = {
    showUsers: async function(req, res) {
        try {
            const users = await userDAC.all()
            return res.render('admin/user/table', { tab: "user", users})
        } catch(e) {
            req.session.info = {
                dangers: [
                    "Unable to get users data"
                ]
            }
            return res.render('admin/user/table')
        }
    },
    showRoles: async function(req, res) {
        try {
            const roles = await roleDAC.all()
            return res.render('admin/role/table', { tab: "role", roles, csrfToken: req.csrfToken() }) 
        } catch(e) {
            req.session.info = {
                dangers: [
                    "Unable to get roles data"
                ]
            }
            return res.render('admin/role/table')
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
    updateUser: async function(req, res){
        /* find the user or throw errors */
        var user, roles = [];
        try {
            user = await userDAC.findById(req.body.id)
        } catch (e) {
            req.session.info = {
                dangers: [
                    'Unable to find user'
                ]
            }
            return res.redirect('back')
        }

        /* find the roles */
        if(req.body.roles){
            try {
                roles = await roleDAC.findManyByIds(req.body.roles)
            } catch (e) {
                console.log(e)
                req.session.info = {
                    dangers: [
                        'Unable to assign roles'
                    ]
                }
                return res.redirect('back')
            }
        }

        /* update user */
        try {
            await userDAC.updateInfo(user, req.body, roles)
            req.session.info = {
                success: [
                    'User was updated successfully.'
                ]
            }
            return res.redirect('back')
        } catch (e) {
            req.session.info = {
                dangers: [
                    'Unable to update user'
                ]
            }
            return res.redirect('back')
        }
    },
    updateUserPassword: async function(req, res){
        var user
        try {
            user = await userDAC.findById(req.body.id)
        } catch(e) {
            req.session.info = {
                dangers: [
                    'Unable to find user'
                ]
            }
            return res.redirect('back')
        }

        try {
            await userDAC.updatePassword(user, req.body.password)
            req.session.info = {
                success: [
                    'Password was updated successfully'
                ]
            }
            return res.redirect('back')
        } catch(e) {
            if(e.errors) {
                req.session.errors = {
                    input: e.errors
                }
            }
            req.session.info = {
                dangers: [
                    'Unable to update password'
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
            return res.redirect('/admin/users/tab=role')
        } catch (e) {
            req.session.info = {
                dangers: [
                    "Unable to create role"
                ]
            }
            return res.redirect('/admin/users/tab=role')
        }
    }
}