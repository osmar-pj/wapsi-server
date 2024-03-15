import Utilidad from '../models/Utilidad'
import mqtt from 'mqtt'

require('dotenv').config()

const client = mqtt.connect(process.env.MQTT_URL, {
    clientId: `${process.env.MQTT_CLIENT_ID}_${Math.random().toString(16).substr(2, 8)}`,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
})

client.on('connect', () => {
    console.log('MQTT connected')
})

export const getUtilidades = async (req, res) => {
    try {
        const utilidades = await Utilidad.find()
        res.status(200).json(utilidades)
    } catch (error) {
        console.error(error)
    }
}

export const getUtilidad = async (req, res) => {
    try {
        const utilidad = await Utilidad.findById(req.params.id)
        res.status(200).json(utilidad)
    } catch (error) {
        console.error(error)
    }
}

export const createUtilidad = async (req, res) => {
    try {
        const { userId } = req.body
        const newUtilidad = new Utilidad({
            userId
        })
        const utilidadSaved = await newUtilidad.save()
        res.status(201).json(utilidadSaved)
    } catch (error) {
        console.error(error)
    }
}

export const getMonitorHuaron = async (req, res) => {
    try {
        console.log(req.query)
        const data = req.body
        client.publish('gunjop/monitor/huaron', JSON.stringify(data.data))
        res.status(200).json({data: 'OK MONITOR'})
    } catch (error) {
        console.error(error)
    }
}

export const getDataHuaron = async (req, res) => {
    try {
            const data = req.body
            client.publish('gunjop/monitor/huaron', JSON.stringify(data.data))
            res.status(200).json({data: 'OK MONITOR'})

    } catch (error) {
            console.error(error)
    }
}

export const saveDataHuaron = async (req, res) => {
    try {
        const data = req.body
        client.publish('gunjop/save', JSON.stringify(data.data))
        res.status(200).json({data: 'OK SAVE'})
    } catch (error) {
        console.error(error)
    }
}

export const saveNotificationHuaron = async (req, res) => {
    try {
        const data = req.body
        client.publish('gunjop/notification', JSON.stringify(data.data))
        res.status(200).json({data: 'OK NOTIFICATION'})
    } catch (error) {
        console.error(error)
    }
}