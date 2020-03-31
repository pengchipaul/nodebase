const userDac = require('../dac/UserDAC')
const logDac = require('../dac/LogDAC')

const emailer = require('../../services/email')

module.exports = {
    login: function (req, res) {
        return res.render('auth/login', { csrfToken: req.csrfToken() })
    },
    signup: function (req, res) {
        return res.render('auth/signup', { csrfToken: req.csrfToken() })
    },
    forget: function (req, res) {
        return res.render('auth/forget', { csrfToken: req.csrfToken() })
    },
    resetForm: async function (req, res) {
        try {
            const user = await userDac.findByResetToken(req.params.resetToken)
            if (!user) {
                throw new Error('Unable to find user')
            }
            return res.render('auth/reset', { csrfToken: req.csrfToken(), resetToken: req.params.resetToken })
        } catch (e) {
            return res.redirect('/')
        }

    },
    signin: async function (req, res) {
        try {
            const user = await userDac.signin(req.body.email, req.body.password)

            if (!user.locked) {
                req.session.auth.user = user
                req.session.info = {
                    success: [
                        "Successfully logged in"
                    ]
                }
                return res.redirect('/app')
            } else {
                req.session.info = {
                    warnings: [
                        "Your account is locked."
                    ]
                }
                req.session.input = req.body
                return res.redirect('/auth/login')
            }
        } catch (e) {
            req.session.info = {
                warnings: [
                    "Email and/or password is not correct"
                ]
            }
            req.session.input = req.body
            return res.redirect('/auth/login')
        }
    },
    register: async function (req, res) {
        try {

            const result = await userDac.create(params = req.body)
            if (result.success) {
                req.session.auth.user = result.user
                req.session.info = {
                    success: [
                        "Welcome to " + process.env.APP_NAME
                    ]
                }
                try {
                    const message = result.user.email + " has registerd."
                    logDac.create('New Account', 'System', message)
                } catch (e) {
                    console.log(e)
                }
                return res.redirect('/app')
            } else {
                req.session.errors = {
                    input: result.error.errors
                }
                req.session.input = req.body
                return res.redirect('/auth/signup')
            }
        } catch (e) {
            req.session.errors = {
                server: "server error"
            }
            req.session.input = req.body
            return res.redirect('/auth/signup')
        }
    },
    logout: async function (req, res) {
        try {
            req.session.auth = {}
            return res.redirect('/auth/login')
        } catch (e) {
            req.session.errors = {
                server: "Server error"
            }
            return res.redirect('/auth/login')
        }
    },
    send_reset_link: async function (req, res) {
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
                return res.redirect('/auth/login')
            } catch (e) {
                req.session.info = {
                    warnings: [
                        "Failed to send password rest link"
                    ]
                }
                return res.redirect('/auth/forget')
            }

        } catch (e) {
            req.session.info = {
                warnings: [
                    "User is not found"
                ]
            }
            return res.redirect('/auth/forget')
        }
    },
    reset: async function (req, res) {
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
                return res.redirect('/app')
            } catch (e) {
                req.session.info = {
                    warnings: [
                        "Unable to save the new password"
                    ]
                }
                return res.redirect('back')
            }
        } catch (e) {
            req.session.info = {
                dangers: [
                    "User is not found"
                ]
            }
            return res.redirect('back')
        }
    }
}