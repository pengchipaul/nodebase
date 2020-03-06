function registerWebRoutes(app) {
    /* Register web routes
         */
    var indexRouter = require('./web/IndexRoute')
    app.use('/', indexRouter)

    var userRouter = require('./web/UserRoute')
    app.use('/users', userRouter)
}

function registerApiRoutes(app) {
    const ver = '/api_v1.0'

    var userApiRouter = require('./api/UserRoute')
    app.use(ver + '/users', userApiRouter)

    var roleApiRouter = require('./api/RoleRoute')
    app.use(ver + '/roles', roleApiRouter)
}

module.exports = {
    registerRoutes: function (app) {

        registerWebRoutes(app)
        registerApiRoutes(app)
    }
}

