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

const instruments = [
  {
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
    img: 'o2.svg',
    name: 'Sensor oxigeno 1',
    a: 1.0,
    b: 0,
    value: 19.9,
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
    ]
  },
  {
    unitControllerId: {
      companyId: 2,
      serie: 'S2',
      mac: 'mac2',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 120'
    },
    tag: 'CO-660',
    img: 'o2.svg',
    name: 'Sensor Monoxido 6670',
    a: 1.0,
    b: 0,
    value: 28,
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
    ]
  },
  {
    unitControllerId: {
      companyId: 2,
      serie: 'S3',
      mac: 'mac3',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 130'
    },
    tag: 'vent1',
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
    unitControllerId: {
      companyId: 2,
      serie: 'S1',
      mac: 'mac1',
      chip: 'raspberry',
      ip: 'xxxxx',
      ubication: 'nivel 110'
    },
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
  }
]

// CONTROL AUTOMATIC
const control = [
  [
    {
      sensorsId: [1,2],
      actuatorsId: [3]
    },
    {
      sensorsId: [6],
      actuatorsId: [7]
    }
  ]
]

// REAL TIME DATA FROM INSTRUMENTS
// EXAMPLE SENSOR
const data = {
  mac: 'mac1',
  name: 'O2',
  serie: 'S1', // debe ser de la serie del registro
  value: 19.9,
  timestamp: 1617292800,
}

topic = 'gunjop/data'
topic = 'mac/value'