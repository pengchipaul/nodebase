const auth = async (req, res, next) => {
    try {
        const user = req.session.auth.user
        if(user){
            req.user = user
            next()
        } else {
            throw new Error('Unauthorized')
        }
    } catch (e){
        res.redirect('/auth/login')
    }
}

module.exports = auth