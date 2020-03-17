const test = function (req, res, next) {
    try {
        if (process.env.NODE_ENV == 'dev') {
            next()
        } else {
            res.status(401).send({error: 'Access Forbidden'})
        }
    } catch(e) {
        res.status(401).send({error: 'Access Forbidden'})
    }
    
}

module.exports = test