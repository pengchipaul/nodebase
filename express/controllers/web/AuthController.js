const userDac = require('../dac/UserDAC')
const emailer = require('../../services/email')

module.exports = {
    login: function(req, res){
        res.render('auth/login', {csrfToken: req.csrfToken()})
    },
    signup: function(req, res){
        res.render('auth/signup', {csrfToken: req.csrfToken()})
    },
    forget: function(req, res){
        res.render('auth/forget', {csrfToken: req.csrfToken()})
    },
    resetForm: async function(req, res){
        try {
            const user = await userDac.findByResetToken(req.params.resetToken)
            if(!user) {
                throw new Error('Unable to find user')
            }
            res.render('auth/reset', {csrfToken: req.csrfToken(), resetToken: req.params.resetToken})
        } catch (e) {
            res.redirect('/')
        }
        
    },
    signin: async function(req, res) {
        try {
            const user = await userDac.signin(req.body.email, req.body.password)
            if(user){
                req.session.auth.user = user
                req.session.info = {
                    success: [
                        "Successfully logged in"
                    ]
                }
                res.redirect('/app')
            } else {
                req.session.info = {
                    warnings: [
                        "Email and/or password is not correct"
                    ]
                }
                req.session.input = req.body
                res.redirect('/auth/login')
            }
        } catch(e) {
            req.session.errors = {
                server: "Server error"
            }
            req.session.input = req.body
            res.redirect('/auth/login')
        }
    },
    register: async function(req, res){
        try {

            const result = await userDac.create(params = req.body)
            if(result.success){
                req.session.auth.user = result.user
                req.session.info = {
                    success: [
                        "Welcome to " + process.env.APP_NAME
                    ]
                }
                res.redirect('/app')
            } else {
                req.session.errors = {
                    input: result.error.errors
                }
                req.session.input = req.body
                res.redirect('/auth/signup')
            }
        } catch(e) {
            req.session.errors = {
                server: "server error"
            }
            req.session.input = req.body
            res.redirect('/auth/signup')
        }
    },
    logout: async function(req, res){
        try {
            delete req.session.auth
            res.redirect('/auth/login')
        } catch(e) {
            req.session.errors = {
                server: "Server error"
            }
            res.redirect('/auth/login')
        }
    },
    send_reset_link: async function(req, res){
        try {
            const user = await userDac.findByEmail(req.body.email)
            
            try {
                const resetToken = await userDac.createPasswordResetLink(user)
                const subject = "Password reset link"
                const type = "text"
                const content = "Your token is " + resetToken
                emailer.sendEmail(user.email, subject, type, content)
                req.session.info = {
                    success: [
                        "A reset password link has been sent to " + req.body.email
                    ]
                }
                res.redirect('/auth/login')
            }catch(e) {
                req.session.info = {
                    warnings: [
                        "Failed to send password rest link"
                    ]
                }
                res.redirect('/auth/forget')
            }

        } catch(e){
            req.session.info = {
                warnings: [
                    "User is not found"
                ]
            }
            res.redirect('/auth/forget')
        }
    },
    reset: async function(req, res){
        try {
            const user = await userDac.findByResetToken(req.body.resetToken)
            
            try {
                await userDac.resetPassword(user, req.body.password)

                req.session.auth.user = user
                req.session.info = {
                    success: [
                        "Password has been reset"
                    ]
                }
                res.redirect('/app')
            } catch(e) {
                req.session.info = {
                    warnings: [
                        "Unable to save the new password"
                    ]
                }
                res.redirect('back')
            }
        } catch(e) {
            req.session.info = {
                dangers: [
                    "User is not found"
                ]
            }
            res.redirect('back')
        }
    }
}