import http from 'http'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import socket from './socket.js'
import { createRoles } from './libs/initialSetup'
import mqttClient from './mqttClient'

require('dotenv').config()
createRoles()

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mqttClient.receiveMessage()

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import empresaRoutes from './routes/empresa.routes'
import dataRoutes from './routes/data.routes'
import controllerRoutes from './routes/controller.routes'
import notificationRoutes from './routes/notification.routes'
import advertiserRoutes from './routes/advertiser.routes'
import utilidadRoutes from './routes/utilidad.routes'
import offlineRoutes from './routes/offline.routes.js'
import relationRoutes from './routes/relation.routes.js'
import instrumentRoutes from './routes/instrument.routes.js'
import groupInstrumentRoutes from './routes/groupInstrument.routes.js'

import travelTruck from './routes/travelTruck.routes.js'
import travelWagon from './routes/travelWagon.routes.js'
import trip from './routes/trip.routes.js'

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the application WAPSI'})
})

app.use(`/auth/${process.env.API_VERSION}`, authRoutes)
app.use(`/${process.env.API_VERSION}/user`, userRoutes)
app.use(`/${process.env.API_VERSION}/empresa`, empresaRoutes)
app.use(`/${process.env.API_VERSION}/data`, dataRoutes)
app.use(`/${process.env.API_VERSION}/controller`, controllerRoutes)
app.use(`/${process.env.API_VERSION}/notification`, notificationRoutes)
app.use(`/${process.env.API_VERSION}/advertiser`, advertiserRoutes)
app.use(`/${process.env.API_VERSION}/utilidad`, utilidadRoutes)
app.use(`/${process.env.API_VERSION}/offline`, offlineRoutes)
app.use(`/${process.env.API_VERSION}/relation`, relationRoutes)
app.use(`/${process.env.API_VERSION}/instrument`, instrumentRoutes)
app.use(`/${process.env.API_VERSION}/groupInstrument`, groupInstrumentRoutes)
// codigo de Henry
app.use(`/${process.env.API_VERSION}/travelTruck`, travelTruck)
app.use(`/${process.env.API_VERSION}/travelWagon`, travelWagon)
app.use(`/${process.env.API_VERSION}/trip`, trip)

const httpServer = http.createServer(app)

socket.connect(httpServer)
httpServer.listen(process.env.PORT)

export default app