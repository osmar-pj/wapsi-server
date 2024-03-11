import mqtt from 'mqtt'
import Data from './models/Data'
import Tracking from './models/Tracking'
import Controller from './models/Controller'
import Notification from './models/Notification'

require('dotenv').config()
const socket = require('./socket').socket
const alerts = [
    {
        name: 'O2',
        alarms: [
            {
                limit_lower: 0,
                limit_upper: 19.5,
                msg: 'Peligro',
                color: '#ff1437',
                category: 'danger'
            },
            {
                limit_lower: 19.5,
                limit_upper: 23.5,
                msg: 'Normal',
                color: '#b9a50c',
                category: 'success'
            },
            {
                limit_lower: 23.5,
                limit_upper: Infinity,
                msg: 'Peligro',
                color: '#ff1437',
                category: 'danger'
            }
        
        ]
    },
    {
        name: 'CO',
        alarms: [
            {
                limit_lower: 0,
                limit_upper: 25,
                msg: 'Normal',
                color: '#0bb97d',
                category: 'success'
            },
            {
                limit_lower: 25,
                limit_upper: 50,
                msg: 'Advertencia',
                color: '#b9a50c',
                category: 'warning'
            },
            {
                limit_lower: 50,
                limit_upper: Infinity,
                msg: 'Peligro',
                color: '#ff1437',
                category: 'danger'
            }
        ]
    },
    {
        name: 'NO2',
        alarms: [
            {
                limit_lower: 0,
                limit_upper: 5,
                msg: 'Normal',
                color: '#0bb97d',
                category: 'success'
            },
            {
                limit_lower: 5,
                limit_upper: 10,
                msg: 'Advertencia',
                color: '#b9a50c',
                category: 'warning'
            },
            {
                limit_lower: 10,
                limit_upper: Infinity,
                msg: 'Peligro',
                color: '#ff1437',
                category: 'danger'
            }
        ]
    },
    {
        name: 'CO2',
        alarms: [
            {
                limit_lower: 0,
                limit_upper: 2.5,
                msg: 'Normal',
                color: '#0bb97d',
                category: 'success'
            },
            {
                limit_lower: 2.5,
                limit_upper: 5,
                msg: 'Advertencia',
                color: '#b9a50c',
                category: 'warning'
            },
            {
                limit_lower: 5,
                limit_upper: Infinity,
                msg: 'Peligro',
                color: '#ff1437',
                category: 'danger'
            }
        ]
    }
]
class mqttHandler {
    constructor() {
        this.client = {}
        this.options = {
            clientId: `${process.env.MQTT_CLIENT_ID}_${Math.random().toString(16).substr(2, 8)}`,
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD
        }
    }

    connect() {
        this.client = mqtt.connect(process.env.MQTT_URL, this.options)
        this.client.on('connect', () => {
            console.log('MQTT connected')
            this.client.subscribe('gunjop/monitor/#', {qos: 0})
            this.client.subscribe('gunjop/save', {qos: 0})
            this.client.subscribe('gunjop/notification', {qos: 0})
            this.client.subscribe('tracking/gunjop/uchucchacua', {qos: 0})
            this.client.subscribe('gunjop/pruebas/jorge', {qos: 0})
        })
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message)
    }
    
    receiveMessage() {

        let counter = 0
        
        this.client.on('message', async (topic, message) => {
            try {
                const data = JSON.parse(message.toString())
                if (topic == 'tracking/gunjop/uchucchacua') {
                    // revisar el delay con el ultimo rgistro de la BD
                    // const lastData = await Data.findOne({ serie: data.serie }).sort({createdAt: -1})
                    // // revisar si el delay es mayor a 5 minutos
                    // if (lastData) {
                    //     const delay = (data.timestamp - lastData.timestamp)
                    //     if (delay > 120) {
                    //         // es un nuevo viaje, enviar los registros para que aumenten en 1
                    //         socket.io.emit('tracking', data)
                    //     }
                    // }

                    const newData = await new Tracking({
                        serie: data.serie,
                        mining: data.mining,
                        category: data.category,
                        devices: data.devices,
                        timestamp: data.timestamp*1000,
                        createdAt: new Date(data.timestamp*1000),
                        datetimeServer: new Date()
                    })

                    // await newData.save()

                    // console.log(newData)
                    // socket.io.emit('tracking', data)
                }
                
                // if (topic == 'gunjop/monitor/julcani' || topic == 'gunjop/monitor/yumpag' || topic == 'gunjop/monitor/huaron' ) {
                if (topic == 'gunjop/pruebas/jorge' ) {
                    // data debe hacer match con lista de controllers
                    const controller = await Controller.findOne({ serie: data.serie }).populate('mining')
                    if (!controller) return
                    const mining  = controller.mining.name
                    controller.devices = data.devices
                    const dataUpdated = await Controller.findByIdAndUpdate(controller._id, controller, {new: true})
                    
                    // console.log(dataUpdated)
                    const instruments = dataUpdated.devices.map(device => {
                        const alarms = alerts.find(alert => alert.name.toUpperCase() === device.name.toUpperCase()).alarms
                        const value = device.value
                        const alarm = alarms.find(alarm => value >= alarm.limit_lower && value <= alarm.limit_upper)
                        return {
                            ...device,
                            alarm
                        }
                    })
                    dataUpdated.devices = instruments
                    socket.io.emit(`${mining.toUpperCase()}-safety`, dataUpdated)
                }

                if (topic == 'gunjop/monitor/yumpag' && data.serie === 'WAPSI-4490') {
                    //console.log(data)
                    const devicesData = data.devices.map(device => new Data({
                        serie: data.serie,
                        mining: data.mining,
                        level: data.level,
                        ubication: data.ubication,
                        name: device.name,
                        devices: device,
                        category: data.category,
                        timestamp: data.timestamp,
                        createdAt: new Date(data.timestamp),
                        datetimeServer: new Date()
                    }))

                    counter++
        
                    if (counter === 30) {
                        await Promise.all(devicesData.map(deviceData => deviceData.save()))
                        counter = 0
                    }
                }

                if (topic == "gunjop/save") {
                    // if (data.devices.length == 0) return
                    const newData = await new Data({
                        serie: data.serie,
                        mining: data.mining,
                        level: data.level,
                        ubication: data.ubication,
                        name: data.devices.name,
                        devices: data.devices,
                        category: data.category,
                        timestamp: data.timestamp,
                        createdAt: new Date(data.timestamp),
                        datetimeServer: new Date()
                    })
                    
                    const dataSaved = await newData.save()
                }

                if (topic == "gunjop/notification") {
                    // console.log(data)
                    const notification = await new Notification({
                        description: data.description,
                        serie: data.serie,
                        value: data.value,
                        name: data.name,
                        msg: data.msg,
                        createdAt: new Date(data.timestamp)
                    })

                    const compare = await Notification.findOne({
                        serie: notification.serie,
                        name: notification.name
                    }).sort({ _id: -1 })
                    
                    if (!compare) {
                        await notification.save()
                    }
                    
                    const diff = new Date(notification.createdAt).getTime() - new Date(compare.createdAt).getTime()
                    const convert = diff / 60000
                    
                    if (convert > 300) {
                        await notification.save()
                    }

                    // enviar por socket la nueva notification
                }

            } catch (error) {
                // console.error(error, 'un dispositivo no registrado intenta enviar datos')
            }
        })
    }
}

module.exports = mqttHandler

// active venv in python
// source venv/bin/activate