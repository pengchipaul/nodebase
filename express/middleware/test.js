const test = function (req, res, next) {
    try {
        const token = req.header('Authorization')
        if (token == process.env.TEST_TOKEN) {
            next()
        } else {
            res.status(401).send({error: 'Please authenticate'})
        }
    } catch(e) {
        console.log(e)
        res.status(401).send({error: 'Please authenticate'})
    }
    
}

module.exports = test