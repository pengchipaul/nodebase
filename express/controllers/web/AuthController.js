module.exports = {
    login: function(req, res){
        res.render('auth/login', {csrfToken: req.csrfToken()})
    },
    signup: function(req, res){
        res.render('auth/signup')
    }
}