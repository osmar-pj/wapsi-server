const axios = require('axios')
const mqtt = require('mqtt')

// const url = 'https://server.paranoid.lat/api/v1/utilidad'
const url = 'https://2pc845pz-5100.brs.devtunnels.ms/api/v1/utilidad'
const mqttUrl = 'mqtt://172.22.102.226:1883'
// const mqttUrl = 'mqtt://localhost:1883'
const topic = 'gunjop/monitor/huaron'
// const topic = 'gunjop/temperatura'

const client = mqtt.connect(mqttUrl, {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
})

client.on('connect', function () {
    console.log('Connected')
    client.subscribe(topic, {qos: 0})
})

client.on('message', async (topic, message) => {
    try {
      const str = message.toString()
      const data = JSON.parse(str)
      if (topic == 'gunjop/monitor/huaron') {
        const response = await axios.post(`${url}/monitor/huaron`, {data: data})
      }
      if (topic == 'gunjop/save') {
        const response = await axios.post(`${url}/save/huaron`, {data: data})
      }
      if (topic == 'gunjop/notification') {
        const response = await axios.post(`${url}/notification/huaron`, {data: data})
      }
    } catch (error) {
        console.error(error)
    }
})