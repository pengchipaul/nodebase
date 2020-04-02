require('dotenv').config()
const express = require('express')
require('./express/db/mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
var path = require('path')
var app = express()

/* parsing input data */
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

/* override http request method */
app.use(methodOverride(function (req, res) {
    var method = req.body._method
    delete req.body._method
    return method
}))

/* configure session */
var session = require('express-session')
const day = 1000 * 60 * 60 * 24
var sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        maxAge: 7 * day
    }
}
if(process.env.NODE_ENV === 'production'){
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}
app.use(session(sess))
app.use(function(req, res, next) {
    /* initialize auth */
    if(!req.session.auth){
        req.session.auth = {}
    }
    res.locals.auth = req.session.auth

    /* load input data errors */
    if(req.session.errors) {
        res.locals.errors = req.session.errors
        delete req.session.errors
    }

    /* load previous input */
    if(req.session.input) {
        res.locals.input = req.session.input
        delete req.session.input
    }

    /* load flash messages */
    if(req.session.info) {
        res.locals.info = req.session.info
        delete req.session.info
    }

    next()
})

/* static assets */
app.use(express.static('dist'))
app.use(express.static('resources'))

/* configure view engine */
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/express/views'))
app.locals.basedir = __dirname

/* register routes */
const routeRegister = require('./express/routes/RouteRegister')
routeRegister.registerRoutes(app)

/* catch csrf error */
app.use(function(err, req, res, next) {
    if(err.code !== 'EBADCSRFTOKEN') return next(err)

    res.status(403)
    req.session.info = {
        dangers: [
            'CSRF token invalid'
        ]
    }
    res.redirect('back')
})

app.listen(process.env.PORT || 8080)