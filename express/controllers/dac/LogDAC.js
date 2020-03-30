const Log = require("../../db/model/Log")

module.exports = {
    findAll: async function(){
        const logs = await Log.find()
        return logs
    },
    findInRecent: async function(hours) {
        const milliseconds = hours * 60 * 60 * 1000
        const logs = await Log.find({
            createdAt: {
                $gte: new Date(new Date() - milliseconds)
            }
        })
        return logs
    },
    findByRecorder: async function(by){
        const logs = await Log.find({
            by
        })
        return logs
    },
    create: function(type, by, message){
        new Log({
            type, 
            by, 
            message
        })
    }
}