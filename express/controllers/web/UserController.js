const userDAC = require('../dac/UserDAC')

module.exports = {
    createSample: async function(req, res) {
        try {
            const result = await userDAC.create(params = req.body)
            if(result.success){
                const user = result.user
                const token = await user.generateAuthToken()
                res.json({success: true, user, token})
            } else {
                res.json({success: false, error: result.error})
            }
        } catch(e) {
            res.status(400).send(e)
        }
        
    }
}