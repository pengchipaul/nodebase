var express = require('express')

module.exports = {
    registerRoutes: function(app) {

        /* Register web routes
         */
        var indexRouter = require('./web/IndexRoute')
        app.use('/', indexRouter)

        var userRouter = require('./web/UserRoute')
        app.use('/users', userRouter)

        /* Register api routes
        */
        const api_version = '/api_v1.0'
        var userApiRouter = require('./api/UserRoute')
        app.use(api_version + '/users', userApiRouter)
    }
}

