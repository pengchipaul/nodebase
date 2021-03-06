const logDAC = require('../../controllers/dac/LogDAC')

const admin = async (req, res, next) => {
    try {
       if(req.session.auth.user.superAdmin){
           next()
       } else {
           try { 
                const message = req.session.auth.user.email + " tried to access super admin route " + req.originalUrl + "."
                logDAC.create('Unauthorized', 'System', message, 'high')
           } catch (e) {
               console.log(e)
           }
           throw new Error('Unauthorized')
       }
    } catch (e) {
        delete req.session.auth
        res.redirect('/auth/login')
    }
}

module.exports = admin