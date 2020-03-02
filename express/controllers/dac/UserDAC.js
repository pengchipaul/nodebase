const User = require('../../db/model/User')


module.exports = {
    all: async function() {
        try {
            await User.find({}, function(err, users){
                return {success: true, users}
            })
        } catch(error) {
            return {success: false, error}
        }
    },
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