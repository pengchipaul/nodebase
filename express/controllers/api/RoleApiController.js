const roleDAC = require('../dac/RoleDAC')

module.exports = {
    all: async function(req, res){

    },
    create: async function(req, res){
        try {
            const result = await roleDAC.create(req.body)
            if(result.success){
                res.json({success: true, role: result})
            } else {
                res.json({success: false, error: result.error})
            }
        } catch(e) {
            res.status(400).send(e)
        }
    }
}