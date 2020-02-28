const User = require('../../db/model/User')


module.exports = {
    create: async function(params){
        const user = new User(params)
        try {
            await user.save()
            return user
        } catch(e) {
            return null
        }
    }
}