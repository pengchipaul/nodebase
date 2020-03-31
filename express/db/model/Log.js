const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    type: {
        type: String,
        trim: true,
        required: true
    },
    by: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String, 
        required: true, 
        trim: true
    },
    priority: {
        type: String,
        required: true,
        default: 'low'
    }
}, {
    timestamps: true
})

const Log = mongoose.model('Log', logSchema)

module.exports = Log