var express = require('express')

var indexRouter = require('./web/IndexRoute')
var userRouter = require('./web/UserRoute')
module.exports = {
    registerRoutes: function(app) {
        app.use('/', indexRouter)
        app.use('/users', userRouter)
    }
}

