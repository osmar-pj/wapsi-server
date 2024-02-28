const controller = {
    serie: 'asd',
    devices: [
        {
            name: 'sensor1',
            value: 1,
            msg: 'OK'
        },
        {
            name: 'sensor2',
            value: 2,
            msg: 'OK'
        },
        {
            name: 'sensor3',
            value: 3,
            msg: 'OK'
        },
    ]
}
let alertaEnviada = false
const alarmas = controller.devices.filter(d => d.msg != 'OK')
alarmas.forEach(i => {
    if (!alertaEnviada) {
        console.log('ALERTA')
        alertaEnviada = true
    }
})
alarmas
