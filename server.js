require('dotenv').config()
const express = require('express')
require('./express/db/mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

app.set('view engine', 'pug')

/* register routes */
const routeRegister = require('./express/routes/RouteRegister')
routeRegister.registerRoutes(app)



app.listen(process.env.PORT || 8080)