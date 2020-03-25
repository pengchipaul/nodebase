const guest = async (req, res, next) => {
    try {
        const user = req.session.auth.user
        if(!user){
            next()
        } else {
            throw new Error()
        }
    } catch (e){
        res.redirect('/app')
    }
}

module.exports = guest