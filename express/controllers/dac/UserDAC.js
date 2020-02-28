const User = require('../../db/model/User')


module.exports = {
    create: async function(params){
        const user = new User(params)
        try {
            await user.save()
            return {user, success: true}
        } catch(error) {
            console.log(error)
            return {error: error.errmsg, success: false}
        }
    }
}