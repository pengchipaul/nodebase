const userDAC = require('../dac/UserDAC')

module.exports = {
    getAllUsers: async function (req, res) {
        try {
            const users = await userDAC.all()
            res.json(users)
        } catch (e) {
            res.status(400).send({success: false, error: e})
        }
    },
    create: async function (req, res) {
        try {
            const result = await userDAC.create(params = req.body)
            if (result.success) {
                const user = result.user
                const token = await user.generateAuthToken()
                res.json({ success: true, user, authToken })
            } else {
                res.json({ success: false, error: result.error })
            }
        } catch (e) {
            res.status(400).send(e)
        }
    }
}