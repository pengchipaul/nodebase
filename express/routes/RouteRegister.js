var express = require('express')

var indexRouter = require('./web/index')

module.exports = {
    registerRoutes: function(app) {
        app.use('/', indexRouter)
    }
}