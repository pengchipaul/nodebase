require('dotenv').config()
const express = require('express')
require('./express/db/mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

/* parsing input data */
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

/* configure session */
var session = require('express-session')
var sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
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
    } else {
        res.locals.auth = req.session.auth
    }

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
app.use(express.static('resources/public'))

/* configure view engine */
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/express/views'))
app.locals.basedir = __dirname

/* register routes */
const routeRegister = require('./express/routes/RouteRegister')
routeRegister.registerRoutes(app)

app.listen(process.env.PORT || 8080)