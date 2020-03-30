const logDAC = require('../dac/LogDAC')

module.exports = {
    index: async function(req, res){
        try {
            const logs = await logDAC.findAll()
            return res.render("log/table", {logs})
        } catch (e) {
            req.session.info = {
                dangers: [
                    "Unable to get log data"
                ]
            }
            return res.render("log/table")
        }   
    }
}