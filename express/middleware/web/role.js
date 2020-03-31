const logDAC = require('../../controllers/dac/LogDAC')

const role = roleNames => {
    return async function(req, res, next) {
        try {
            if(req.session.auth.user){
                const user = req.session.auth.user

                /* grant super admin access */
                if(user.superAdmin) {
                    return next()
                }

                var authenticated = true
                roleNames.forEach(roleName => {
                    if(!user.roles.includes(roleName)){
                        authenticated = false
                    }
                })
                if(authenticated) {
                    next()
                } else {
                    try {
                        const message = req.session.auth.user.email + 
                        " tried to access route " + req.originalUrl + 
                        " for roles [" + roleNames.toString() + "]."
                        logDAC.create('Unauthroized', 'System', message, 'medium')
                    } catch(e) {
                        console.log(e)
                    }
                    throw new Error('Unauthorized')
                }
            } else {
                throw new Error('Unauthorized')
            }
        } catch(e) {
            delete req.session.auth
            res.redirect('/auth/login')
        }
    }
}

module.exports = role