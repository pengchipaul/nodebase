const userDAC = require('../dac/UserDAC')
const roleDAC = require('../dac/RoleDAC')
const arrayHelper = require('../../helper/array')

module.exports = {
    getAllUsers: async function (req, res) {
        try {
            const users = await userDAC.all()
            const roles = await roleDAC.all()
            for(var i = 0; i < users.length; i++) {
                if(users[i].roles.length !== 0) {
                    for(var j = 0; j < users[i].roles.length; j++){
                        var r = roles.find(role => {
                            return role._id === users[i].roles[j].roleId
                        })
                        console.log(r)
                        users[i].roles[j]["name"] = r.name
                    }
                }
            }
            res.json(users)
        } catch (e) {
            res.status(400).send({success: false, error: e})
        }
    },
    create: async function (req, res) {
        /**
         * roles array must have distinct values in it
         */
        if(req.body.roles && req.body.roles.length !== 0){
            req.body.roles = arrayHelper.getDistinctObj(req.body.roles, "roleId")
        }

        try {
            const result = await userDAC.create(params = req.body)
            if (result.success) {
                const user = result.user
                const token = await user.generateAuthToken()
                res.json({ success: true, user, token })
            } else {
                res.json({ success: false, error: result.error })
            }
        } catch (e) {
            res.status(400).send({e})
        }
    }
}