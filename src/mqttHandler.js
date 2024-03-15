import mqtt from 'mqtt'
import Data from './models/Data'
import Tracking from './models/Tracking'
import Controller from './models/Controller'
import Notification from './models/Notification'
import Instrument from './models/Instrument'
import BigData from './models/BigData'

require('dotenv').config()
const socket = require('./socket').socket
const alerts = [
    {
        name: 'O2',
        alarms: [
            {
                limit_lower: 0,
                limit_upper: 19.5,
                title: 'Peligro',
                message: 'Riesgo alto de asfixia nivel bajo de oxígeno',
                color: '#ff1437',
                category: 'danger'
            },
            {
                limit_lower: 19.5,
                limit_upper: 23.5,
                title: 'Normal',
                message: 'Normal',
                color: '#b9a50c',
                category: 'success'
            },
            {
                limit_lower: 23.5,
                limit_upper: Infinity,
                title: 'Peligro',
                message: 'Riesgo alto de asfixia nivel alto de oxígeno',
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
                title: 'Normal',
                message: 'Normal',
                color: '#0bb97d',
                category: 'success'
            },
            {
                limit_lower: 25,
                limit_upper: 50,
                title: 'Advertencia',
                message: 'Riesgo de asfixia nivel alto de monóxido de carbono',
                color: '#b9a50c',
                category: 'warning'
            },
            {
                limit_lower: 50,
                limit_upper: Infinity,
                title: 'Peligro',
                message: 'Riesgo alto de asfixia nivel muy alto de monóxido de carbono',
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
                title: 'Normal',
                message: 'Normal',
                color: '#0bb97d',
                category: 'success'
            },
            {
                limit_lower: 5,
                limit_upper: 10,
                title: 'Advertencia',
                message: 'Riesgo de irritación nivel alto de dióxido de nitrógeno',
                color: '#b9a50c',
                category: 'warning'
            },
            {
                limit_lower: 10,
                limit_upper: Infinity,
                title: 'Peligro',
                message: 'Riesgo alto de irritación nivel muy alto de dióxido de nitrógeno',
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
                title: 'Normal',
                message: 'Normal',
                color: '#0bb97d',
                category: 'success'
            },
            {
                limit_lower: 2.5,
                limit_upper: 5,
                title: 'Advertencia',
                message: 'Riesgo de irritación nivel alto de dióxido de carbono',
                color: '#b9a50c',
                category: 'warning'
            },
            {
                limit_lower: 5,
                limit_upper: Infinity,
                title: 'Peligro',
                message: 'Riesgo alto de irritación nivel muy alto de dióxido de carbono',
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
            // this.client.subscribe('gunjop/monitor/#', {qos: 0})
            // this.client.subscribe('gunjop/save', {qos: 0})
            // this.client.subscribe('gunjop/notification', {qos: 0})
            // this.client.subscribe('tracking/gunjop/uchucchacua', {qos: 0})
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
                //     // data debe hacer match con lista de controllers
                //     const controller = await Controller.findOne({ serie: data.serie }).populate('mining')
                //     if (!controller) return
                //     const mining  = controller.mining.name
                //     controller.devices = data.devices
                //     const dataUpdated = await Controller.findByIdAndUpdate(controller._id, controller, {new: true})
                    
                //     // console.log(dataUpdated)
                //     const instruments = dataUpdated.devices.map(device => {
                //         const alarms = alerts.find(alert => alert.name.toUpperCase() === device.name.toUpperCase()).alarms
                //         const value = device.value
                //         const alarm = alarms.find(alarm => value >= alarm.limit_lower && value <= alarm.limit_upper)
                //         return {
                //             ...device,
                //             alarm
                //         }
                //     })
                //     dataUpdated.devices = instruments
                //     socket.io.emit(`${mining.toUpperCase()}-safety`, dataUpdated)
                // }

                if (topic == 'gunjop/pruebas/jorge' ) {
                    const controller = await Controller.findOne({ serie: data.serie }).populate('mining')
                    if (!controller) return
                    const mining  = controller.mining.name // GET MINA QUE PERTENECE EL CONTROLADOR Y EL DATO QUE SE ESTA ENVIANDO
                    data.devices.forEach(async (device) => {
                        const instrument = await Instrument.findOne({ controllerId: controller._id, serie: device.serie.toUpperCase()})
                        const alarms = alerts.find(alert => alert.name.toUpperCase() === instrument.name.toUpperCase()).alarms // CHECK IF NAME OR SERIE
                        instrument.value = device.value
                        const alarm = alarms.find(alarm => instrument.value >= alarm.limit_lower && instrument.value <= alarm.limit_upper)
                        instrument.alarm = alarm
                        const instrumentUpdated = await Instrument.findByIdAndUpdate(instrument._id, instrument, {new: true})
                        // console.log(instrumentUpdated.value, instrumentUpdated.name)
                        socket.io.emit(`${mining.toUpperCase()}`, instrumentUpdated)
                    
                        const isAlarm = instrument.alarm.category === 'danger' || instrument.alarm.category === 'warning'
                        if (isAlarm) {
                            const notification = await new Notification({
                                instrumentId: instrument._id,
                                title: instrument.alarm.title,
                                message: `${instrument.alarm.message}`,
                                value: instrument.value,
                                category: instrument.alarm.category,
                                color: instrument.alarm.color,
                            })
                            const lastNotification = await Notification.findOne({instrumentId: instrument._id}).sort({ _id: -1 })
                            if (!lastNotification) {
                                const notificationSaved = await notification.save()
                                socket.io.emit(`${mining.toUpperCase()}-notification`, notificationSaved)
                                return
                            }
                            const diff = new Date(notification.createdAt).getTime() - new Date(lastNotification.createdAt).getTime()
                            const convert = diff / 60000 // minutos
                            if (convert > 15) {
                                const notificationSaved = await notification.save()
                                socket.io.emit(`${mining.toUpperCase()}-notification`, notificationSaved)
                            }
                        }

                        const lastData = await BigData.findOne({ instrumentId: instrument._id }).sort({createdAt: -1})
                        if (!lastData) {
                            const newData = await new BigData({
                                controllerId: controller._id,
                                instrumentId: instrument._id,
                                name: instrument.name,
                                value: instrument.value,
                            })
                            console.log(newData)
                            const dataSaved = await newData.save()
                            socket.io.emit(`${mining.toUpperCase()}-bigdata`, dataSaved)
                            return
                        }
                        const delay = (new Date().getTime() - lastData.createdAt.getTime())
                        const timeMin = delay / 60000
                        if (timeMin > 1) {
                            const newData = await new BigData({
                                controllerId: controller._id,
                                instrumentId: instrument._id,
                                name: instrument.name,
                                value: instrument.value,
                            })
                            const dataSaved = await newData.save()
                            socket.io.emit(`${mining.toUpperCase()}-bigdata`, dataSaved)
                        }
                    })
                }

                if (topic == 'gunjop/monitor/yumpag' && data.serie === 'WAPSI-4490') {
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
                        console.log('saving data')
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
                    
                    if (convert > 15) {
                        const notificationSaved = await notification.save()
                        socket.io.emit('notification', notificationSaved)
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