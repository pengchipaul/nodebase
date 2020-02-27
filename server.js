const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'build')))

/* register routes */
const routeRegister = require('./express/routes/RouteRegister')
routeRegister.registerRoutes(app)



app.listen(process.env.PORT || 8080)