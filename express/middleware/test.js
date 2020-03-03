const test = function (req, res, next) {
    try {
        const token = req.header('Authorization')
        if (token == process.env.TEST_TOKEN) {
            //console.log("test middleware passed")
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