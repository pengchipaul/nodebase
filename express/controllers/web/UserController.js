const userDAC = require('../dac/UserDAC')

module.exports = {
    createSample: async function(req, res) {
        try {
            const user = await userDAC.create(params = req.body)
            const token = await user.generateAuthToken()
            res.json({user, token})
        } catch(e) {
            res.status(400).send(e)
        }
        
    }
}