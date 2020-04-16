const api = async (req, res, next) => {
    try {
        const user = req.session.auth.user
        if(user){
            req.user = user
            next()
        } else {
            throw new Error('Unauthorized')
        }
    } catch (e){
        res.set('Authorizatioin', 'invalid')
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = api