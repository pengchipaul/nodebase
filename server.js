require('dotenv').config()
const express = require('express')
require('./express/db/mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.json())

/* static assets */
app.use(express.static('dist'))

/* set view engine */
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/express/views'))
app.locals.basedir = __dirname

/* register routes */
const routeRegister = require('./express/routes/RouteRegister')
routeRegister.registerRoutes(app)



app.listen(process.env.PORT || 8080)