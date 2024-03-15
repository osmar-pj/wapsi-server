// Admin User
const userGUNJOP = {
  name: 'Admin',
  lastname: 'Main',
  dni: '12345678',
  email: 'asd@asdas.com',
  job: 'developer',
  roleId: [1,2,3],
  companyId: {
    name: 'GUNJOP',
    ruc: '123456789',
    address: 'asdasd',
    isClient: false,
    isContract: false,
    ownerId: {
      name: 'GUNJOP',
      ruc: '123456789',
      address: 'asdasd'
    }
  }
}

// Client User Jefe
const userMining = {
  name: 'Name 1',
  lastname: 'Lastname 1',
  dni: '12345678',
  email: 'asdas@asdads.com',
  job: 'jefe',
  roleId: [2,3],
  companyId: {
    name: 'Mining 1',
    ruc: '123456789',
    address: 'asdasd',
    isClient: true,
    isContract: false,
    ownerId: {
      name: 'GUNJOP',
      ruc: '123456789',
      address: 'asdasd'
    },
    groupInstruments: [  // filter ext
      [1,2],
      [3],
      [6],
      [7]
    ]
  },
}

// Contract User
const userContract = {
  name: 'Contract',
  lastname: 'Main',
  dni: '12345678',
  email: 'jajdskjasd@sdjklsa.com',
  job: 'Worker',
  roleId: [5],
  companyId: {
    name: 'Contract 1',
    ruc: '123456789',
    address: 'asdasd',
    isClient: true,
    isContract: true,
    ownerId: {
      name: 'Mining 1',
      ruc: '123456789',
      address: 'asdasd'
    }
  }
}

const instruments = [ // useState
  {
    _id: 1,
    unitControllerId: {
      companyId: {
        name: 'Mining 1',
        ruc: '123456789',
        address: 'asdasd',
        isClient: true,
        isContract: false,
        ownerId: {
          name: 'GUNJOP',
          ruc: '123456789',
          address: 'asdasd'
        }
      },
      serie: 'S1',
      mac: 'mac1',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 110'
    },
    tag: 'O2-660',
    symbol: 'O2',
    img: 'o2.svg',
    name: 'Sensor oxigeno 1',
    a: 1.0,
    b: 0,
    value: 20.2, // UPDATE RXJS
    measure: '%vol',
    type: 'sensor',
    signal: 'analog',
    application: 'ext',
    params: [],
    mode: 'auto',
    alarm: {
      lower_limit: 19.5,
      upper_limit: 23.5,
      category: 'success',
      message: 'Normal',
      color: 'green',
    },
    updateAt: 1617292800  // UPDATE RXJS
  },
  {
    _id: 2,
    unitControllerId: {
      companyId: 2,
      serie: 'S2',
      mac: 'mac2',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 120'
    },
    tag: 'CO-660',
    symbol: 'CO',
    img: 'o2.svg',
    name: 'Sensor Monoxido 6670',
    a: 1.0,
    b: 0,
    value: 15, // UPDATE RXJS
    measure: 'ppm',
    type: 'sensor',
    signal: 'analog',
    application: 'ext',
    params: [],
    mode: 'auto',
    alarmsId: [
      // {
      //   instrumentId: 2,
      //   lower_limit: -Infinity,
      //   upper_limit: 25,
      //   category: 'success',
      //   message: 'Normal',
      //   color: 'green',
      // },
      {
        instrumentId: 2,
        lower_limit: 25,
        upper_limit: 50,
        category: 'danger',
        message: 'Alarma baja',
        color: 'yellow',
      },
      // {
      //   instrumentId: 2,
      //   lower_limit: 50,
      //   upper_limit: Infinity,
      //   category: 'danger',
      //   message: 'Alarma alta',
      //   color: 'red',
      // }
    ],
    updateAt: 1617292800  // UPDATE RXJS
  },
  {
    _id: 3,
    unitControllerId: {
      companyId: 2,
      serie: 'S3',
      mac: 'mac3',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 130'
    },
    tag: 'vent1',
    symbol: 'V1',
    img: 'fan.svg',
    name: 'Ventilador 1',
    a: 1.0,
    b: 0,
    value: 1,
    measure: 'on/off',
    type: 'actuator',
    signal: 'digital',
    application: 'ext',
    mode: 'auto',
    params: [],
    alarmsId: []
  },
  {
    _id: 4,
    unitControllerId: {
      companyId: 2,
      serie: 'S4',
      mac: 'mac3',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 130'
    },
    tag: 'vent2',
    symbol: 'V2',
    img: 'fan.svg',
    name: 'Ventilador 2',
    a: 1.0,
    b: 0,
    value: 1,
    measure: 'on/off',
    type: 'actuator',
    signal: 'digital',
    application: 'ext',
    mode: 'auto',
    params: [],
    alarmsId: []
  },
  {
    _id: 5,
    unitControllerId: {
      companyId: 2,
      serie: 'S1',
      mac: 'mac1',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 110'
    },
    tag: 'I-660',
    name: 'Corriente',
    symbol: 'I',
    img: 'curr.png',
    type: 'sensor',
    factor: 1.0,
    value: 120,
    measure: 'A',
    type: 'analog',
    application: 'ext',
    level: 'NV-100',
    params: [],
    alarmsId: []
  },
  {
    _id: 6,
    unitControllerId: {
      companyId: 2,
      serie: 'S1',
      mac: 'mac1',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 110'
    },
    name: 'Voltaje',
    symbol: 'VAC',
    img: 'volt.png',
    type: 'sensor',
    factor: 1.0,
    value: 440,
    measure: 'VAC',
    type: 'analog',
    application: 'ext',
    level: 'NV-100',
    params: [],
    alarmsId: []
  },
  {
    _id: 7,
    unitControllerId: {
      companyId: {
        name: 'Mining 1',
        ruc: '123456789',
        address: 'asdasd',
        isClient: true,
        isContract: false,
        ownerId: {
          name: 'GUNJOP',
          ruc: '123456789',
          address: 'asdasd'
        }
      },
      serie: 'S1',
      mac: 'mac1',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 110'
    },
    tag: 'CO2-660',
    symbol: 'CO2',
    img: 'o2.svg',
    name: 'Sensor oxigeno 1',
    a: 1.0,
    b: 0,
    value: 19.9, // UPDATE RXJS
    measure: '%vol',
    type: 'sensor',
    signal: 'analog',
    application: 'ext',
    params: [],
    mode: 'auto',
    alarmsId: [
      {
        instrumentId: 2,
        lower_limit: -Infinity,
        upper_limit: 25,
        category: 'success',
        message: 'Normal',
        color: 'green',
      },
      // {
      //   instrumentId: 2,
      //   lower_limit: 25,
      //   upper_limit: 50,
      //   category: 'danger',
      //   message: 'Alarma baja',
      //   color: 'yellow',
      // },
      // {
      //   instrumentId: 2,
      //   lower_limit: 50,
      //   upper_limit: Infinity,
      //   category: 'danger',
      //   message: 'Alarma alta',
      //   color: 'red',
      // }
    ],
    updateAt: 1617292800  // UPDATE RXJS
  },
  {
    _id: 8,
    unitControllerId: {
      companyId: 2,
      serie: 'S2',
      mac: 'mac2',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 120'
    },
    tag: 'NO2-660',
    symbol: 'NO2',
    img: 'o2.svg',
    name: 'Sensor Monoxido 6670',
    a: 1.0,
    b: 0,
    value: 28, // UPDATE RXJS
    measure: 'ppm',
    type: 'sensor',
    signal: 'analog',
    application: 'ext',
    params: [],
    mode: 'auto',
    alarmsId: [
      // {
      //   instrumentId: 2,
      //   lower_limit: -Infinity,
      //   upper_limit: 25,
      //   category: 'success',
      //   message: 'Normal',
      //   color: 'green',
      // },
      {
        instrumentId: 2,
        lower_limit: 25,
        upper_limit: 50,
        category: 'danger',
        message: 'Alarma baja',
        color: 'yellow',
      },
      // {
      //   instrumentId: 2,
      //   lower_limit: 50,
      //   upper_limit: Infinity,
      //   category: 'danger',
      //   message: 'Alarma alta',
      //   color: 'red',
      // }
    ],
    updateAt: 1617292800  // UPDATE RXJS
  },
]

// REAL TIME DATA FROM INSTRUMENTS
// EXAMPLE SENSOR
const data = {
  controllerId: 1,
  instrumentId: 1,
  name: 'Sensor oxigeno 1',
  value: 20.2
}

const relationsId = [
  {
    _id: "65f0d83d36852be7e55759f6",
    sensors: [
      {
        _id: 1,
      },
      {
        _id: 2,
      }
    ],
    actuators: [
      {
        _id: 3,
      }
    ],
    createdAt: "2024-03-12T22:33:33.422Z",
    updatedAt: "2024-03-12T22:33:33.422Z"
  },
  {
    _id: "65f0d83d36852be7e55759f6",
    sensors: [
      {
        _id: 7,
      },
      {
        _id: 8,
      }
    ],
    actuators: [
      {
        _id: 4,
      }
    ],
    createdAt: "2024-03-12T22:33:33.422Z",
    updatedAt: "2024-03-12T22:33:33.422Z"
  },
]

// create relation complete in _id of sensors and actuators of instruments
const relations = relationsId.map(item => {
  const sensors = instruments.filter(sensor => item.sensors.some(sensorId => sensorId._id === sensor._id))
  const actuators = instruments.filter(actuator => item.actuators.some(actuatorId => actuatorId._id === actuator._id))
  return {
    ...item,
    sensors,
    actuators
  }
})

let table = []

relations.forEach(item => {
  // Verificamos si hay actuadores
  if (item.actuators && item.actuators.length > 0) {
      // Iteramos sobre los actuadores del elemento actual
      item.actuators.forEach(actuator => {
          // Creamos un objeto para representar la fila del actuador
          const actuadorRow = {
              actuador: actuator.name || "",
              mode: actuator.mode || "",
              id:actuator._id || "",
              signal: actuator.signal || "",
              symbol: actuator.symbol || "",
          };

          // Iteramos sobre los sensores del elemento actual
          if (item.sensors && item.sensors.length > 0) {
              item.sensors.forEach(sensor => {
                  // Agregamos el nombre y el valor del sensor como propiedades del actuador
                  actuadorRow[`${sensor.symbol}`] = sensor.value;
              });
          }

          // Agregamos la fila del actuador al array de datos formateados
          table.push(actuadorRow);
      });
  }
});

console.log(table)
