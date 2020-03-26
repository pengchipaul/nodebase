const userDac = require('../dac/UserDAC')

module.exports = {
    login: function(req, res){
        res.render('auth/login', {csrfToken: req.csrfToken()})
    },
    signup: function(req, res){
        res.render('auth/signup', {csrfToken: req.csrfToken()})
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
            if(req.body.password !== req.body.confirmPassword) {
                req.session.errors = {
                    input: {
                        passwordConfirmation: {
                            message: "Confirm password does not match"
                        }

                    }
                }
                req.session.input = req.body
                res.redirect('/auth/signup')
                return
            }
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
    }
}