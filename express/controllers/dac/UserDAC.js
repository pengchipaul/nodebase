const User = require('../../db/model/User')


module.exports = {
    all: async function() {
        try {
            const users = await User.find()
            return users
        } catch(error) {
            throw new Error("Unable to get all users")
        }
    },
    create: async function(params){
        const user = new User(params)
        try {
            await user.save()
            return {user, success: true}
        } catch(error) {
            console.log(error)
            return {error, success: false}
        }
    }
}