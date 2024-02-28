import { Server } from 'socket.io'
import axios from 'axios'

const socket = {}
let io

const getWeekNumber = (date) => {
    const currentDate = date ? new Date(date) : new Date();
    const year = currentDate.getFullYear();
    const yearStart = new Date(year, 0, 1); // 1 de enero
  
    // Establecer el inicio del año al primer jueves a las 7:00 AM
    yearStart.setHours(7, 0, 0, 0);
    yearStart.setDate(yearStart.getDate() + (11 - yearStart.getDay()) % 7);
  
    if (yearStart > currentDate) {
      yearStart.setFullYear(year - 1);
      yearStart.setDate(yearStart.getDate() - 7);
    }
  
    const diffMilliseconds = currentDate - yearStart;
    const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffDays / 7) + 1;
    return weekNumber;
}

function connect(server) {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    })
    socket.io = io
    let USERS = {}
    io.on('connection', socket => {
        console.log(`${socket.id} connected`)
        USERS[socket.id] = socket
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`)
            delete USERS[socket.id]
        })
    })

    setInterval(() => {
        for (let i in USERS) {
            USERS[i].emit('truck-D', 'JUANCITO')
        }
    }, 1000)


    // DIA
    // setInterval(async () => {
    //     // get number of day today
    //     const timestamp = new Date().getTime()
    //     const period = 'D'
    //     const value = timestamp
    //     const response = await axios.get(`${process.env.FLASK_URL}/wagon?period=${period}&value=${value}`)
    //     const colorDia = '#F3BD5A'
    //     const colorNoche = '#598CF3'
    //     const colorTextWhite = '#FFFFFF'
    //     const colorTextBlack = '#000000'
    //     const data = response.data.data
    //     const events = data.events.map(i => {
    //         return {
    //             checklist_conditionLocomotive: i.checklist_conditionsL.filter(j => j.status == 'MAL'),
    //             checklist_conditionsWagon: i.checklist_conditionsW.filter(j => j.status == 'MAL'),
    //             checklist_verifyLocomotive: i.checklist_verifyL.filter(j => j.status == 'MAL'),
    //             checklist_verifyWagon: i.checklist_verifyW.filter(j => j.status == 'MAL'),
    //             tag: (i.tag).toLowerCase(),
    //             date: i.createdAt,
    //             operator: i.name
    //         }
    //     })
    //     const score = {
    //         trips: data.score.operation_Id,
    //         timeIda: data.score.timeIda,
    //         timeRetorno: data.score.timeRetorno,
    //         weight: data.score.weight,
    //         periodo: data.score.periodo
    //     }
    //     const graphic = data.graphic.map(i => {
    //         const NOCHE = i.NOCHE ? i.NOCHE * 8 : 0
    //         const DIA = i.DIA ? i.DIA * 8 : 0
    //         let x = ''
    //         if (period == 'D') {
    //             x = `${i.date}`
    //         } else if (period == 'S') {
    //             const dia = parseInt(i.date.split('/')[0])
    //             x = `${i.day} - ${dia}`
    //         }
    //         else if (period == 'M') {
    //             const dia = parseInt(i.date.split('/')[0])
    //             x = `${dia}`
    //         }
    //         return {
    //             NOCHE: NOCHE,
    //             DIA: DIA,
    //             day: i.day,
    //             date: i.date,
    //             x: x
    //         }
    //     })
    //     const locomotives = data.locomProduction.map(i => {
    //         const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
    //         const weightDia = i.DIA ? i.DIA * 8 : 0
    //         const weightNoche = i.NOCHE ? i.NOCHE * 8 : 0
    //         const turn = {
    //             DIA: { value: weightDia, percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `D=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `N=${weightNoche}` }
    //         }
    //         const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
    //         const weightAlb = i.alabandita ? i.alabandita * 8 : 0
    //         const weightCarb = i.carbonato ? i.carbonato * 8 : 0
    //         const weightDesm = i.desmonte ? i.desmonte * 8 : 0
    //         const weightMineral = weightPol + weightAlb + weightCarb
    //         const material = {
    //             MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `M=${weightMineral}` },
    //             // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
    //             // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
    //             // CARB: { value: weightCarb, perecnt: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
    //             DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#996633', colorText: colorTextWhite, msg: `D=${weightDesm}`}
    //         }
    //         // const weightG1 = i.G1 ? i.G1 * 8 : 0
    //         // const weightG2 = i.G2 ? i.G2 * 8 : 0
    //         // const weightG3 = i.G3 ? i.G3 * 8 : 0
    //         // const weightG4 = i.G4 ? i.G4 * 8 : 0
    //         // const gibas = {
    //         //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
    //         //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
    //         //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
    //         //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
    //         // }
    //         let totalTime = 0
    //         if (period == 'D') {
    //             totalTime = 24
    //         } else if (period == 'S') {
    //             totalTime = 168
    //         }
    //         else if (period == 'M') {
    //             totalTime = 720
    //         }
    //         const timeInoperation = i.timeInoperation ? i.timeInoperation : 0
    //         const timeOperation = totalTime - timeInoperation
    //         const disponibilidad = {
    //             UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', colorText: colorTextBlack, msg: `Op=${(timeOperation * 100 / totalTime).toFixed(1)} %` },
    //             NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', colorText: colorTextBlack, msg: `Inop=${(timeInoperation * 100 / totalTime).toFixed(1)} %` },
    //             MANT: { value: 0, percent: 0, color: '#F35959', colorText: colorTextWhite, msg: `Mt=0` }
    //         }
    //         return {
    //             turn,
    //             material,
    //             disponibilidad,
    //             totalWeight,
    //             meanTime: i.meanTime,
    //             tag: (i.tag).toLowerCase()
    //         }
    //     })
    //     const piques = data.pique.map(i => {
    //         const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
    //         const stock = {
    //             STOCK: { value: 0, percent: 0, color: '#5AF35F' }
    //         }
    //         const weightDia = i.DIA ? i.DIA * 8: 0
    //         const weightNoche = i.NOCHE ? i.NOCHE * 8: 0
    //         const turn = {
    //             DIA: { value: weightDia , percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `D=${weightDia}` },
    //             NOCHE: { value: weightNoche , percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `N=${weightNoche}` }
    //         }
    //         const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
    //         const weightAlb = i.alabandita ? i.alabandita * 8 : 0
    //         const weightCarb = i.carbonato ? i.carbonato * 8 : 0
    //         const weightDesm = i.desmonte ? i.desmonte * 8 : 0
    //         const weightMineral = weightPol + weightAlb + weightCarb
    //         const material = {
    //             MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `M=${weightMineral}` },
    //             // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
    //             // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
    //             // CARB: { value: weightCarb, percent: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
    //             DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#996633', colorText: colorTextWhite, msg: `D=${weightDesm}` }
    //         }
    //         // const weightG1 = i.G1 ? i.G1 * 8 : 0
    //         // const weightG2 = i.G2 ? i.G2 * 8 : 0
    //         // const weightG3 = i.G3 ? i.G3 * 8 : 0
    //         // const weightG4 = i.G4 ? i.G4 * 8 : 0
    //         // const gibas = {
    //         //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
    //         //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
    //         //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
    //         //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
    //         // }
    //         return {
    //             stock,
    //             turn,
    //             material,
    //             pique: (i.pique).toLowerCase(),
    //             totalWeight
    //         }
    //     })
    //     const dataTurn = data.turn.totalValidWagons
    //     let turn = {
    //         DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
    //         NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
    //     }
    //     if (dataTurn) {
    //         const DIA = data.turn.totalValidWagons.DIA ? data.turn.totalValidWagons.DIA * 8 : 0
    //         const NOCHE = data.turn.totalValidWagons.NOCHE ? data.turn.totalValidWagons.NOCHE * 8 : 0
    //         const TOTAL = DIA + NOCHE
    //         turn = {
    //             DIA: { value: DIA, percent: DIA * 100 / TOTAL, color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
    //             NOCHE: { value: NOCHE, percent: NOCHE * 100 / TOTAL, color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
    //         }
    //     }

    //     const total = data.total
    //     const trips = data.trips

    //     const wagon = {
    //         events,
    //         graphic,
    //         locomotives,
    //         piques,
    //         score,
    //         total,
    //         trips,
    //         turn
    //     }
    //     for (let i in USERS) {
    //         USERS[i].emit('wagon-D', { wagon })
    //     }
    // }, 600000)

    // SEMANA
    // setInterval(async () => {
    //     // get number of day today
    //     const weekNumber = getWeekNumber()
    //     const period = 'S'
    //     const value = weekNumber
    //     const response = await axios.get(`${process.env.FLASK_URL}/wagon?period=${period}&value=${value}`)
    //     const colorDia = '#F3BD5A'
    //     const colorNoche = '#598CF3'
    //     const colorTextWhite = '#FFFFFF'
    //     const colorTextBlack = '#000000'
    //     const data = response.data.data
    //     const events = data.events.map(i => {
    //         return {
    //             checklist_conditionLocomotive: i.checklist_conditionsL.filter(j => j.status == 'MAL'),
    //             checklist_conditionsWagon: i.checklist_conditionsW.filter(j => j.status == 'MAL'),
    //             checklist_verifyLocomotive: i.checklist_verifyL.filter(j => j.status == 'MAL'),
    //             checklist_verifyWagon: i.checklist_verifyW.filter(j => j.status == 'MAL'),
    //             tag: (i.tag).toLowerCase(),
    //             date: i.createdAt,
    //             operator: i.name
    //         }
    //     })
    //     const score = {
    //         trips: data.score.operation_Id,
    //         timeIda: data.score.timeIda,
    //         timeRetorno: data.score.timeRetorno,
    //         weight: data.score.weight,
    //         periodo: data.score.periodo
    //     }
    //     const graphic = data.graphic.map(i => {
    //         const NOCHE = i.NOCHE ? i.NOCHE * 8 : 0
    //         const DIA = i.DIA ? i.DIA * 8 : 0
    //         let x = ''
    //         if (period == 'D') {
    //             x = `${i.date}`
    //         } else if (period == 'S') {
    //             const dia = parseInt(i.date.split('/')[0])
    //             x = `${i.day} - ${dia}`
    //         }
    //         else if (period == 'M') {
    //             const dia = parseInt(i.date.split('/')[0])
    //             x = `${dia}`
    //         }
    //         return {
    //             NOCHE: NOCHE,
    //             DIA: DIA,
    //             day: i.day,
    //             date: i.date,
    //             x: x
    //         }
    //     })
    //     const locomotives = data.locomProduction.map(i => {
    //         const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
    //         const weightDia = i.DIA ? i.DIA * 8 : 0
    //         const weightNoche = i.NOCHE ? i.NOCHE * 8 : 0
    //         const turn = {
    //             DIA: { value: weightDia, percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `D=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `N=${weightNoche}` }
    //         }
    //         const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
    //         const weightAlb = i.alabandita ? i.alabandita * 8 : 0
    //         const weightCarb = i.carbonato ? i.carbonato * 8 : 0
    //         const weightDesm = i.desmonte ? i.desmonte * 8 : 0
    //         const weightMineral = weightPol + weightAlb + weightCarb
    //         const material = {
    //             MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `M=${weightMineral}` },
    //             // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
    //             // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
    //             // CARB: { value: weightCarb, perecnt: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
    //             DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#996633', colorText: colorTextWhite, msg: `D=${weightDesm}`}
    //         }
    //         // const weightG1 = i.G1 ? i.G1 * 8 : 0
    //         // const weightG2 = i.G2 ? i.G2 * 8 : 0
    //         // const weightG3 = i.G3 ? i.G3 * 8 : 0
    //         // const weightG4 = i.G4 ? i.G4 * 8 : 0
    //         // const gibas = {
    //         //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
    //         //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
    //         //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
    //         //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
    //         // }
    //         let totalTime = 0
    //         if (period == 'D') {
    //             totalTime = 24
    //         } else if (period == 'S') {
    //             totalTime = 168
    //         }
    //         else if (period == 'M') {
    //             totalTime = 720
    //         }
    //         const timeInoperation = i.timeInoperation ? i.timeInoperation : 0
    //         const timeOperation = totalTime - timeInoperation
    //         const disponibilidad = {
    //             UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', colorText: colorTextBlack, msg: `Op=${(timeOperation * 100 / totalTime).toFixed(1)} %` },
    //             NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', colorText: colorTextBlack, msg: `Inop=${(timeInoperation * 100 / totalTime).toFixed(1)} %` },
    //             MANT: { value: 0, percent: 0, color: '#F35959', colorText: colorTextWhite, msg: `Mt=0` }
    //         }
    //         return {
    //             turn,
    //             material,
    //             disponibilidad,
    //             totalWeight,
    //             meanTime: i.meanTime,
    //             tag: (i.tag).toLowerCase()
    //         }
    //     })
    //     const piques = data.pique.map(i => {
    //         const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
    //         const stock = {
    //             STOCK: { value: 0, percent: 0, color: '#5AF35F' }
    //         }
    //         const weightDia = i.DIA ? i.DIA * 8: 0
    //         const weightNoche = i.NOCHE ? i.NOCHE * 8: 0
    //         const turn = {
    //             DIA: { value: weightDia , percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `D=${weightDia}` },
    //             NOCHE: { value: weightNoche , percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `N=${weightNoche}` }
    //         }
    //         const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
    //         const weightAlb = i.alabandita ? i.alabandita * 8 : 0
    //         const weightCarb = i.carbonato ? i.carbonato * 8 : 0
    //         const weightDesm = i.desmonte ? i.desmonte * 8 : 0
    //         const weightMineral = weightPol + weightAlb + weightCarb
    //         const material = {
    //             MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `M=${weightMineral}` },
    //             // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
    //             // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
    //             // CARB: { value: weightCarb, percent: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
    //             DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#996633', colorText: colorTextWhite, msg: `D=${weightDesm}` }
    //         }
    //         // const weightG1 = i.G1 ? i.G1 * 8 : 0
    //         // const weightG2 = i.G2 ? i.G2 * 8 : 0
    //         // const weightG3 = i.G3 ? i.G3 * 8 : 0
    //         // const weightG4 = i.G4 ? i.G4 * 8 : 0
    //         // const gibas = {
    //         //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
    //         //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
    //         //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
    //         //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
    //         // }
    //         return {
    //             stock,
    //             turn,
    //             material,
    //             pique: (i.pique).toLowerCase(),
    //             totalWeight
    //         }
    //     })
    //     const dataTurn = data.turn.totalValidWagons
    //     let turn = {
    //         DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
    //         NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
    //     }
    //     if (dataTurn) {
    //         const DIA = data.turn.totalValidWagons.DIA ? data.turn.totalValidWagons.DIA * 8 : 0
    //         const NOCHE = data.turn.totalValidWagons.NOCHE ? data.turn.totalValidWagons.NOCHE * 8 : 0
    //         const TOTAL = DIA + NOCHE
    //         turn = {
    //             DIA: { value: DIA, percent: DIA * 100 / TOTAL, color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
    //             NOCHE: { value: NOCHE, percent: NOCHE * 100 / TOTAL, color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
    //         }
    //     }

    //     const total = data.total
    //     const trips = data.trips

    //     const wagon = {
    //         events,
    //         graphic,
    //         locomotives,
    //         piques,
    //         score,
    //         total,
    //         trips,
    //         turn
    //     }
    //     for (let i in USERS) {
    //         USERS[i].emit('wagon-S', { wagon })
    //     }
    // }, 580340)


    // MES
    // setInterval(async () => {
    //     // get number of day today
    //     const numberMonth = new Date().getMonth() + 1
    //     const period = 'M'
    //     const value = numberMonth
    //     const response = await axios.get(`${process.env.FLASK_URL}/wagon?period=${period}&value=${value}`)
    //     const colorDia = '#F3BD5A'
    //     const colorNoche = '#598CF3'
    //     const colorTextWhite = '#FFFFFF'
    //     const colorTextBlack = '#000000'
    //     const data = response.data.data
    //     const events = data.events.map(i => {
    //         return {
    //             checklist_conditionLocomotive: i.checklist_conditionsL.filter(j => j.status == 'MAL'),
    //             checklist_conditionsWagon: i.checklist_conditionsW.filter(j => j.status == 'MAL'),
    //             checklist_verifyLocomotive: i.checklist_verifyL.filter(j => j.status == 'MAL'),
    //             checklist_verifyWagon: i.checklist_verifyW.filter(j => j.status == 'MAL'),
    //             tag: (i.tag).toLowerCase(),
    //             date: i.createdAt,
    //             operator: i.name
    //         }
    //     })
    //     const score = {
    //         trips: data.score.operation_Id,
    //         timeIda: data.score.timeIda,
    //         timeRetorno: data.score.timeRetorno,
    //         weight: data.score.weight,
    //         periodo: data.score.periodo
    //     }
    //     const graphic = data.graphic.map(i => {
    //         const NOCHE = i.NOCHE ? i.NOCHE * 8 : 0
    //         const DIA = i.DIA ? i.DIA * 8 : 0
    //         let x = ''
    //         if (period == 'D') {
    //             x = `${i.date}`
    //         } else if (period == 'S') {
    //             const dia = parseInt(i.date.split('/')[0])
    //             x = `${i.day} - ${dia}`
    //         }
    //         else if (period == 'M') {
    //             const dia = parseInt(i.date.split('/')[0])
    //             x = `${dia}`
    //         }
    //         return {
    //             NOCHE: NOCHE,
    //             DIA: DIA,
    //             day: i.day,
    //             date: i.date,
    //             x: x
    //         }
    //     })
    //     const locomotives = data.locomProduction.map(i => {
    //         const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
    //         const weightDia = i.DIA ? i.DIA * 8 : 0
    //         const weightNoche = i.NOCHE ? i.NOCHE * 8 : 0
    //         const turn = {
    //             DIA: { value: weightDia, percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `D=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `N=${weightNoche}` }
    //         }
    //         const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
    //         const weightAlb = i.alabandita ? i.alabandita * 8 : 0
    //         const weightCarb = i.carbonato ? i.carbonato * 8 : 0
    //         const weightDesm = i.desmonte ? i.desmonte * 8 : 0
    //         const weightMineral = weightPol + weightAlb + weightCarb
    //         const material = {
    //             MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `M=${weightMineral}` },
    //             // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
    //             // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
    //             // CARB: { value: weightCarb, perecnt: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
    //             DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#996633', colorText: colorTextWhite, msg: `D=${weightDesm}`}
    //         }
    //         // const weightG1 = i.G1 ? i.G1 * 8 : 0
    //         // const weightG2 = i.G2 ? i.G2 * 8 : 0
    //         // const weightG3 = i.G3 ? i.G3 * 8 : 0
    //         // const weightG4 = i.G4 ? i.G4 * 8 : 0
    //         // const gibas = {
    //         //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
    //         //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
    //         //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
    //         //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
    //         // }
    //         let totalTime = 0
    //         if (period == 'D') {
    //             totalTime = 24
    //         } else if (period == 'S') {
    //             totalTime = 168
    //         }
    //         else if (period == 'M') {
    //             totalTime = 720
    //         }
    //         const timeInoperation = i.timeInoperation ? i.timeInoperation : 0
    //         const timeOperation = totalTime - timeInoperation
    //         const disponibilidad = {
    //             UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', colorText: colorTextBlack, msg: `Op=${(timeOperation * 100 / totalTime).toFixed(1)} %` },
    //             NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', colorText: colorTextBlack, msg: `Inop=${(timeInoperation * 100 / totalTime).toFixed(1)} %` },
    //             MANT: { value: 0, percent: 0, color: '#F35959', colorText: colorTextWhite, msg: `Mt=0` }
    //         }
    //         return {
    //             turn,
    //             material,
    //             disponibilidad,
    //             totalWeight,
    //             meanTime: i.meanTime,
    //             tag: (i.tag).toLowerCase()
    //         }
    //     })
    //     const piques = data.pique.map(i => {
    //         const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
    //         const stock = {
    //             STOCK: { value: 0, percent: 0, color: '#5AF35F' }
    //         }
    //         const weightDia = i.DIA ? i.DIA * 8: 0
    //         const weightNoche = i.NOCHE ? i.NOCHE * 8: 0
    //         const turn = {
    //             DIA: { value: weightDia , percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `D=${weightDia}` },
    //             NOCHE: { value: weightNoche , percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `N=${weightNoche}` }
    //         }
    //         const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
    //         const weightAlb = i.alabandita ? i.alabandita * 8 : 0
    //         const weightCarb = i.carbonato ? i.carbonato * 8 : 0
    //         const weightDesm = i.desmonte ? i.desmonte * 8 : 0
    //         const weightMineral = weightPol + weightAlb + weightCarb
    //         const material = {
    //             MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `M=${weightMineral}` },
    //             // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
    //             // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
    //             // CARB: { value: weightCarb, percent: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
    //             DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#996633', colorText: colorTextWhite, msg: `D=${weightDesm}` }
    //         }
    //         // const weightG1 = i.G1 ? i.G1 * 8 : 0
    //         // const weightG2 = i.G2 ? i.G2 * 8 : 0
    //         // const weightG3 = i.G3 ? i.G3 * 8 : 0
    //         // const weightG4 = i.G4 ? i.G4 * 8 : 0
    //         // const gibas = {
    //         //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
    //         //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
    //         //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
    //         //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
    //         // }
    //         return {
    //             stock,
    //             turn,
    //             material,
    //             pique: (i.pique).toLowerCase(),
    //             totalWeight
    //         }
    //     })
    //     const dataTurn = data.turn.totalValidWagons
    //     let turn = {
    //         DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
    //         NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
    //     }
    //     if (dataTurn) {
    //         const DIA = data.turn.totalValidWagons.DIA ? data.turn.totalValidWagons.DIA * 8 : 0
    //         const NOCHE = data.turn.totalValidWagons.NOCHE ? data.turn.totalValidWagons.NOCHE * 8 : 0
    //         const TOTAL = DIA + NOCHE
    //         turn = {
    //             DIA: { value: DIA, percent: DIA * 100 / TOTAL, color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
    //             NOCHE: { value: NOCHE, percent: NOCHE * 100 / TOTAL, color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
    //         }
    //     }

    //     const total = data.total
    //     const trips = data.trips

    //     const wagon = {
    //         events,
    //         graphic,
    //         locomotives,
    //         piques,
    //         score,
    //         total,
    //         trips,
    //         turn
    //     }
    //     for (let i in USERS) {
    //         USERS[i].emit('wagon-M', { wagon })
    //     }
    // }, 603400)

    // setInterval(async () => {
    //     try {
    //         const response = await axios.get(`${process.env.FLASK_URL}/trip`)
    //         const data = response.data.data
    //         const trips = data.map(i => {
    //             return {
    //                 date: i.date,
    //                 createdAt: i.createdAt,
    //                 turno: i.turno.toLowerCase(),
    //                 operador: i.name,
    //                 locomotora: i.tag.toLowerCase(),
    //                 mining: i.mining,
    //                 pique: i.pique.toLowerCase(),
    //                 vagones: i.totalValidWagons,
    //                 tonelaje: i.totalValidWagons * 8,
    //                 mineral: (i.polimetalico + i.carbonato + i.alabandita) * 8,
    //                 desmonte: i.desmonte * 8,
    //                 tiempoIda: i.timeIda,
    //                 tiempoRetorno: i.timeRetorno,
    //                 inicio: i.start,
    //                 fin: i.end

    //             }
    //         })
    //         // console.log(trips)
    //         const columns = [
    //             { title: 'Fecha', field: 'date', fn: null, und: '' },
    //             { title: 'Turno', field: 'turno', fn: null, und: '' },
    //             { title: 'Operador', field: 'operador', fn: null, und: '' },
    //             { title: 'Locomotora', field: 'locomotora', fn: 'reducirCadena', und: '' },
    //             { title: 'Mina', field: 'mining', fn: null, und: '' },
    //             { title: 'Pique', field: 'pique', fn: null, und: '' },
    //             { title: 'Vagones', field: 'vagones', fn: null, und: 'vag' },
    //             { title: 'Tonelaje', field: 'tonelaje', fn: null, und: 'TM' },
    //             { title: 'Mineral', field: 'mineral', fn: null, und: 'TM' },
    //             { title: 'Desmonte', field: 'desmonte', fn: null, und: 'TM' },
    //             { title: 'Tiempo Giba a Pique', field: 'tiempoIda', fn: 'toFixed', und: 'min' },
    //             { title: 'Tiempo Pique a Giba', field: 'tiempoRetorno', fn:'toFixed', und: 'min' },
    //             { title: 'Inicio carga', field: 'inicio', fn: 'formatFecha', und: '' },
    //             { title: 'Fin descarga', field: 'fin', fn: 'formatFecha', und: '' },
    //         ]
    //         for (let i in USERS) {
    //             USERS[i].emit('trip', { trips, columns })
    //         }
    //     } catch (error) {
            
    //     }
    // }, 331023)

    // setInterval(async () => {
    //     const response = await axios.get(`${process.env.FLASK_URL}/update`)
        
    // }, 600000)


    //////////////////////////////////////////////////////


    // // DIA

    // setInterval(async () => {

    //     const timestamp = new Date().getTime()

    //     const period = 'D'  
    //     const value = timestamp                         

    //     const response = await axios.get(`${process.env.FLASK_URL}/truck?period=${period}&value=${value}`)

    //     const colorDia = '#F3BD5A'
    //     const colorNoche = '#598CF3'

    //     const colorTextWhite = '#FFFFFF'
    //     const colorTextBlack = '#000000'

    //     const data = response.data.data

    //     const events = data.events.map(i => {
    //         return {
    //             driver: i.name,
    //             tag: i.tag,
    //             events: i.events,
    //             createdAt: i.createdAt,
    //         }
    //     })

    //     const score = {
    //         trips: data.score.operationTruck_Id,
    //         timeIda: data.score.timeIda,
    //         timeRetorno: data.score.timeRetorno,
    //         weight: data.score.weightTotal,
    //         periodo: data.score.periodo
    //     }

    //     const graphic = data.graphic.map(i => {
    //         const NOCHE = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         // const NOCHE = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;
    //         const DIA = i.DIA ? parseInt(i.DIA) : 0;
    //         // const DIA = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         let x = '';
        
    //         if (period == 'D') {
    //             x = `${i.date}`;
    //         } else if (period == 'S') {
    //             const dia = parseInt(i.date.split('/')[0]);
    //             x = `${i.day} - ${dia}`;
    //         } else if (period == 'M') {
    //             const dia = parseInt(i.date.split('/')[0]);
    //             x = `${dia}`;
    //         }
        
    //         return {
    //             NOCHE: NOCHE,
    //             DIA: DIA,
    //             day: i.day,
    //             date: i.date,
    //             x: x
    //         };
    //     });

    //     const trucks = data.truckProduction.map(i => {
    //         // const totalWeight = i.totalWeight ? parseInt(i.totalWeight) : 0;
    //         const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;

    //         // const weightDia = i.DIA ? parseInt(i.DIA) : 0;
    //         const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         // const weightNoche = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

    //         const turn = {
    //             DIA: { value: weightDia, percent: parseFloat(( weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             // DIA: { value: parseInt(weightDia), percent: parseInt( weightDia * 100 / totalWeight), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: parseFloat(( weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` },
    //             // NOCHE: { value: parseInt(weightNoche), percent: parseInt( weightNoche * 100 / totalWeight), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
    //         }

    //         // const weightMineral = i.mineral ? parseInt(i.mineral) : 0;
    //         const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

    //         // const weightDesmonte = i.desmonte ? parseInt(i.desmonte) : 0;
    //         const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

    //         const material = {
    //             MINERAL: { value: weightMineral, percent: parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
    //             DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', colorText: colorTextBlack, msg: `Des=${weightDesmonte}` }
    //         }

    //         let totalTime = 0
    //         if (period == 'D') {
    //             totalTime = 24
    //         } else if (period == 'S') {
    //             totalTime = 168
    //         }
    //         else if (period == 'M') {
    //             totalTime = 720
    //         }
    //         const timeInoperation = i.timeInoperation ? i.timeInoperation : 0
    //         const timeOperation = totalTime - timeInoperation
    //         const disponibilidad = {
    //             UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', colorText: colorTextBlack, msg: `Op=${(timeOperation * 100 / totalTime).toFixed(1)} %` },
    //             NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', colorText: colorTextBlack, msg: `Inop=${(timeInoperation * 100 / totalTime).toFixed(1)} %` },
    //             MANT: { value: 0, percent: 0, color: '#F35959', colorText: colorTextWhite, msg: `Mt=0` }
    //         }

    //         return {
    //             turn,
    //             material,
    //             disponibilidad,
    //             totalWeight,
    //             meanTime: i.meanTime,
    //             tag: i.tag
    //         }

    //     })

    //     const rutas = data.ruta.map(i => {
    //         // const totalWeight = i.totalWeight ? parseInt(i.totalWeight) : 0;
    //         const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;
    //         const stock = {
    //             STOCK: { value: 0, percent: 0, color: '#5AF35F' }
    //         }
    //         // const weightDia = i.DIA ? parseInt(i.DIA) : 0;
    //         const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         // const weightNoche = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

    //         const turn = {
    //             DIA: { value: weightDia, percent: parseFloat(( weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             // DIA: { value: parseInt(weightDia), percent: parseInt( weightDia * 100 / totalWeight), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: parseFloat(( weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` },
    //             // NOCHE: { value: parseInt(weightNoche), percent: parseInt( weightNoche * 100 / totalWeight), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
    //         }
            
    //         // const weightMineral = i.mineral ? parseInt(i.mineral) : 0;
    //         const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

    //         // const weightDesmonte = i.desmonte ? parseInt(i.desmonte) : 0;
    //         const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

    //         const material = {
    //             MINERAL: { value: weightMineral, percent:   parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
    //             DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', colorText: colorTextBlack, msg: `Des=${weightDesmonte}` }
    //         }

    //         return {
    //             stock,
    //             turn,
    //             material,
    //             ruta: (i.ruta).toUpperCase(),
    //             totalWeight
    //         }

    //     })


    //     const dataTurn = data.turn.weightTotal
    //     let turn = {
    //         DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
    //         NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
    //     }

    //     if (dataTurn){
    //         // const DIA = data.turn.weightTotal.DIA ? data.turn.weightTotal.DIA : 0
    //         const DIA = data.turn.weightTotal.DIA ? parseFloat((data.turn.weightTotal.DIA).toFixed(1)) : 0;

    //         // const NOCHE = data.turn.weightTotal.NOCHE ? data.turn.weightTotal.NOCHE : 0
    //         const NOCHE = data.turn.weightTotal.NOCHE ? parseFloat((data.turn.weightTotal.NOCHE).toFixed(1)) : 0;

    //         const TOTAL = DIA + NOCHE
    //         turn = {
    //             DIA: { value: DIA, percent: parseFloat((DIA * 100 / TOTAL).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
    //             NOCHE: { value: NOCHE, percent: parseFloat((NOCHE * 100 / TOTAL).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
    //         }
    //     }

    //     const total = data.total

    //     const trips = data.trips.map(i => {
    //         return {
    //             tag: i.tag,
    //             name: i.name,
    //             ruta: i.ruta,
    //             weight: i.weightTotal,
    //             createdAt: i.createdAt,
    //         }
    //     })

    //     const truck = {
    //         events,
    //         graphic,
    //         trucks,
    //         rutas,
    //         score,
    //         total,
    //         trips,
    //         turn
    //     }

    //     for (let i in USERS) {
    //         USERS[i].emit('truck-D', { truck })
    //         console.log('emit truck-D')
    //     }


    // }, 2000)

    // // SEMANA

    // setInterval(async () => {

    //     const weekNumber = getWeekNumber()
    //     const period = 'S'
    //     const value = weekNumber

    //     const response = await axios.get(`${process.env.FLASK_URL}/truck?period=${period}&value=${value}`)

        
    //     const colorDia = '#F3BD5A'
    //     const colorNoche = '#598CF3'
    //     const colorTextWhite = '#FFFFFF'
    //     const colorTextBlack = '#000000'

    //     const data = response.data.data


    //     const events = data.events.map(i => {
    //         return {
    //             driver: i.name,
    //             tag: i.tag,
    //             events: i.events,
    //             createdAt: i.createdAt,
    //         }
    //     })

    //     const score = {
    //         trips: data.score.operationTruck_Id,
    //         timeIda: data.score.timeIda,
    //         timeRetorno: data.score.timeRetorno,
    //         weight: data.score.weightTotal,
    //         periodo: data.score.periodo
    //     }

    //     const graphic = data.graphic.map(i => {
    //         const NOCHE = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         // const NOCHE = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;
    //         const DIA = i.DIA ? parseInt(i.DIA) : 0;
    //         // const DIA = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         let x = '';
        
    //         if (period == 'D') {
    //             x = `${i.date}`;
    //         } else if (period == 'S') {
    //             const dia = parseInt(i.date.split('/')[0]);
    //             x = `${i.day} - ${dia}`;
    //         } else if (period == 'M') {
    //             const dia = parseInt(i.date.split('/')[0]);
    //             x = `${dia}`;
    //         }
        
    //         return {
    //             NOCHE: NOCHE,
    //             DIA: DIA,
    //             day: i.day,
    //             date: i.date,
    //             x: x
    //         };
    //     });

    //     const trucks = data.truckProduction.map(i => {
    //         // const totalWeight = i.totalWeight ? parseInt(i.totalWeight) : 0;
    //         const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;

    //         // const weightDia = i.DIA ? parseInt(i.DIA) : 0;
    //         const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         // const weightNoche = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

    //         const turn = {
    //             DIA: { value: weightDia, percent: parseFloat(( weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             // DIA: { value: parseInt(weightDia), percent: parseInt( weightDia * 100 / totalWeight), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: parseFloat(( weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` },
    //             // NOCHE: { value: parseInt(weightNoche), percent: parseInt( weightNoche * 100 / totalWeight), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
    //         }

    //         // const weightMineral = i.mineral ? parseInt(i.mineral) : 0;
    //         const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

    //         // const weightDesmonte = i.desmonte ? parseInt(i.desmonte) : 0;
    //         const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

    //         const material = {
    //             MINERAL: { value: weightMineral, percent: parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
    //             DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', colorText: colorTextBlack, msg: `Des=${weightDesmonte}` }
    //         }

    //         let totalTime = 0
    //         if (period == 'D') {
    //             totalTime = 24
    //         } else if (period == 'S') {
    //             totalTime = 168
    //         }
    //         else if (period == 'M') {
    //             totalTime = 720
    //         }
    //         const timeInoperation = i.timeInoperation ? i.timeInoperation : 0
    //         const timeOperation = totalTime - timeInoperation
    //         const disponibilidad = {
    //             UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', colorText: colorTextBlack, msg: `Op=${(timeOperation * 100 / totalTime).toFixed(1)} %` },
    //             NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', colorText: colorTextBlack, msg: `Inop=${(timeInoperation * 100 / totalTime).toFixed(1)} %` },
    //             MANT: { value: 0, percent: 0, color: '#F35959', colorText: colorTextWhite, msg: `Mt=0` }
    //         }

    //         return {
    //             turn,
    //             material,
    //             disponibilidad,
    //             totalWeight,
    //             meanTime: i.meanTime,
    //             tag: i.tag
    //         }

    //     })

    //     const rutas = data.ruta.map(i => {
    //         // const totalWeight = i.totalWeight ? parseInt(i.totalWeight) : 0;
    //         const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;
    //         const stock = {
    //             STOCK: { value: 0, percent: 0, color: '#5AF35F' }
    //         }
    //         // const weightDia = i.DIA ? parseInt(i.DIA) : 0;
    //         const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         // const weightNoche = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

    //         const turn = {
    //             DIA: { value: weightDia, percent: parseFloat(( weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             // DIA: { value: parseInt(weightDia), percent: parseInt( weightDia * 100 / totalWeight), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: parseFloat(( weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` },
    //             // NOCHE: { value: parseInt(weightNoche), percent: parseInt( weightNoche * 100 / totalWeight), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
    //         }
            
    //         // const weightMineral = i.mineral ? parseInt(i.mineral) : 0;
    //         const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

    //         // const weightDesmonte = i.desmonte ? parseInt(i.desmonte) : 0;
    //         const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

    //         const material = {
    //             MINERAL: { value: weightMineral, percent:   parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
    //             DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', colorText: colorTextBlack, msg: `Des=${weightDesmonte}` }
    //         }

    //         return {
    //             stock,
    //             turn,
    //             material,
    //             ruta: (i.ruta).toUpperCase(),
    //             totalWeight
    //         }

    //     })


    //     const dataTurn = data.turn.weightTotal
    //     let turn = {
    //         DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
    //         NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
    //     }

    //     if (dataTurn){
    //         // const DIA = data.turn.weightTotal.DIA ? data.turn.weightTotal.DIA : 0
    //         const DIA = data.turn.weightTotal.DIA ? parseFloat((data.turn.weightTotal.DIA).toFixed(1)) : 0;

    //         // const NOCHE = data.turn.weightTotal.NOCHE ? data.turn.weightTotal.NOCHE : 0
    //         const NOCHE = data.turn.weightTotal.NOCHE ? parseFloat((data.turn.weightTotal.NOCHE).toFixed(1)) : 0;

    //         const TOTAL = DIA + NOCHE
    //         turn = {
    //             DIA: { value: DIA, percent: parseFloat((DIA * 100 / TOTAL).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
    //             NOCHE: { value: NOCHE, percent: parseFloat((NOCHE * 100 / TOTAL).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
    //         }
    //     }

    //     const total = data.total

    //     const trips = data.trips.map(i => {
    //         return {
    //             tag: i.tag,
    //             name: i.name,
    //             ruta: i.ruta,
    //             weight: i.weightTotal,
    //             createdAt: i.createdAt,
    //         }
    //     })

    //     const truck = {
    //         events,
    //         graphic,
    //         trucks,
    //         rutas,
    //         score,
    //         total,
    //         trips,
    //         turn
    //     }

    //     for (let i in USERS) {
    //         USERS[i].emit('truck-S', { truck })
    //         console.log('emit truck-S')
    //     }

    // }, 2000)

    // // MES

    // setInterval(async () => {

    //     const numberMonth = new Date().getMonth() + 1
    //     const period = 'M'
    //     const value = numberMonth

    //     const response = await axios.get(`${process.env.FLASK_URL}/truck?period=${period}&value=${value}`)

    //     const colorDia = '#F3BD5A'
    //     const colorNoche = '#598CF3'
    //     const colorTextWhite = '#FFFFFF'
    //     const colorTextBlack = '#000000'

    //     const data = response.data.data


    //     const events = data.events.map(i => {
    //         return {
    //             driver: i.name,
    //             tag: i.tag,
    //             events: i.events,
    //             createdAt: i.createdAt,
    //         }
    //     })

    //     const score = {
    //         trips: data.score.operationTruck_Id,
    //         timeIda: data.score.timeIda,
    //         timeRetorno: data.score.timeRetorno,
    //         weight: data.score.weightTotal,
    //         periodo: data.score.periodo
    //     }

    //     const graphic = data.graphic.map(i => {
    //         const NOCHE = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         // const NOCHE = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;
    //         const DIA = i.DIA ? parseInt(i.DIA) : 0;
    //         // const DIA = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         let x = '';
        
    //         if (period == 'D') {
    //             x = `${i.date}`;
    //         } else if (period == 'S') {
    //             const dia = parseInt(i.date.split('/')[0]);
    //             x = `${i.day} - ${dia}`;
    //         } else if (period == 'M') {
    //             const dia = parseInt(i.date.split('/')[0]);
    //             x = `${dia}`;
    //         }
        
    //         return {
    //             NOCHE: NOCHE,
    //             DIA: DIA,
    //             day: i.day,
    //             date: i.date,
    //             x: x
    //         };
    //     });

    //     const trucks = data.truckProduction.map(i => {
    //         // const totalWeight = i.totalWeight ? parseInt(i.totalWeight) : 0;
    //         const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;

    //         // const weightDia = i.DIA ? parseInt(i.DIA) : 0;
    //         const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         // const weightNoche = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

    //         const turn = {
    //             DIA: { value: weightDia, percent: parseFloat(( weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             // DIA: { value: parseInt(weightDia), percent: parseInt( weightDia * 100 / totalWeight), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: parseFloat(( weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` },
    //             // NOCHE: { value: parseInt(weightNoche), percent: parseInt( weightNoche * 100 / totalWeight), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
    //         }

    //         // const weightMineral = i.mineral ? parseInt(i.mineral) : 0;
    //         const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

    //         // const weightDesmonte = i.desmonte ? parseInt(i.desmonte) : 0;
    //         const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

    //         const material = {
    //             MINERAL: { value: weightMineral, percent: parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
    //             DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', colorText: colorTextBlack, msg: `Des=${weightDesmonte}` }
    //         }

    //         let totalTime = 0
    //         if (period == 'D') {
    //             totalTime = 24
    //         } else if (period == 'S') {
    //             totalTime = 168
    //         }
    //         else if (period == 'M') {
    //             totalTime = 720
    //         }
    //         const timeInoperation = i.timeInoperation ? i.timeInoperation : 0
    //         const timeOperation = totalTime - timeInoperation
    //         const disponibilidad = {
    //             UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', colorText: colorTextBlack, msg: `Op=${(timeOperation * 100 / totalTime).toFixed(1)} %` },
    //             NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', colorText: colorTextBlack, msg: `Inop=${(timeInoperation * 100 / totalTime).toFixed(1)} %` },
    //             MANT: { value: 0, percent: 0, color: '#F35959', colorText: colorTextWhite, msg: `Mt=0` }
    //         }

    //         return {
    //             turn,
    //             material,
    //             disponibilidad,
    //             totalWeight,
    //             meanTime: i.meanTime,
    //             tag: i.tag
    //         }

    //     })

    //     const rutas = data.ruta.map(i => {
    //         // const totalWeight = i.totalWeight ? parseInt(i.totalWeight) : 0;
    //         const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;
    //         const stock = {
    //             STOCK: { value: 0, percent: 0, color: '#5AF35F' }
    //         }
    //         // const weightDia = i.DIA ? parseInt(i.DIA) : 0;
    //         const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

    //         // const weightNoche = i.NOCHE ? parseInt(i.NOCHE) : 0;
    //         const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

    //         const turn = {
    //             DIA: { value: weightDia, percent: parseFloat(( weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             // DIA: { value: parseInt(weightDia), percent: parseInt( weightDia * 100 / totalWeight), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
    //             NOCHE: { value: weightNoche, percent: parseFloat(( weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` },
    //             // NOCHE: { value: parseInt(weightNoche), percent: parseInt( weightNoche * 100 / totalWeight), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
    //         }
            
    //         // const weightMineral = i.mineral ? parseInt(i.mineral) : 0;
    //         const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

    //         // const weightDesmonte = i.desmonte ? parseInt(i.desmonte) : 0;
    //         const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

    //         const material = {
    //             MINERAL: { value: weightMineral, percent:   parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
    //             DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', colorText: colorTextBlack, msg: `Des=${weightDesmonte}` }
    //         }

    //         return {
    //             stock,
    //             turn,
    //             material,
    //             ruta: (i.ruta).toUpperCase(),
    //             totalWeight
    //         }

    //     })


    //     const dataTurn = data.turn.weightTotal
    //     let turn = {
    //         DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
    //         NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
    //     }

    //     if (dataTurn){
    //         // const DIA = data.turn.weightTotal.DIA ? data.turn.weightTotal.DIA : 0
    //         const DIA = data.turn.weightTotal.DIA ? parseFloat((data.turn.weightTotal.DIA).toFixed(1)) : 0;

    //         // const NOCHE = data.turn.weightTotal.NOCHE ? data.turn.weightTotal.NOCHE : 0
    //         const NOCHE = data.turn.weightTotal.NOCHE ? parseFloat((data.turn.weightTotal.NOCHE).toFixed(1)) : 0;

    //         const TOTAL = DIA + NOCHE
    //         turn = {
    //             DIA: { value: DIA, percent: parseFloat((DIA * 100 / TOTAL).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
    //             NOCHE: { value: NOCHE, percent: parseFloat((NOCHE * 100 / TOTAL).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
    //         }
    //     }

    //     const total = data.total

    //     const trips = data.trips.map(i => {
    //         return {
    //             tag: i.tag,
    //             name: i.name,
    //             ruta: i.ruta,
    //             weight: i.weightTotal,
    //             createdAt: i.createdAt,
    //         }
    //     })

    //     const truck = {
    //         events,
    //         graphic,
    //         trucks,
    //         rutas,
    //         score,
    //         total,
    //         trips,
    //         turn
    //     }

    //     for (let i in USERS) {
    //         USERS[i].emit('truck-M', { truck })
    //         console.log('emit truck-M')
    //     }                                                                                      

    // }, 2000)

    // setInterval(async () => {

    //     try {
    //                 const response = await axios.get(`${process.env.FLASK_URL}/tripTruck`)
    //                 const data = response.data
            
    //                 const trips = data.map((i) => ({
    //                     date: i.date,
    //                     createdAt: i.createdAt,
    //                     turno: i.turno,
    //                     driver: i.name,
    //                     tag: i.tag,
    //                     mining: i.mining,
    //                     ruta: i.ruta,
    //                     tonelaje: i.weightTotal,
    //                     mineral: i.mineral,
    //                     desmonte: i.desmonte,
    //                     tiempoIda: i.timeIda,
    //                     tiempoRetorno: i.timeRetorno,
    //                     inicio: i.start,
    //                     fin: i.end
    //                 }))
            
    //                 // console.log(trips)
            
    //                 const columns = [
    //                     { title: 'Fecha', field: 'date', fn: null, und: '' },
    //                     { title: 'Turno', field: 'turno', fn: null, und: '' },
    //                     { title: 'Conductor', field: 'driver', fn: null, und: '' },
    //                     { title: 'Camion', field: 'tag', fn: null, und: '' },
    //                     { title: 'Mina', field: 'mining', fn: null, und: '' },
    //                     { title: 'Ruta', field: 'ruta', fn: null, und: '' },
    //                     { title: 'Tonelaje', field: 'tonelaje', fn: null, und: 'TM' },
    //                     { title: 'Mineral', field: 'mineral', fn: null, und: 'TM' },
    //                     { title: 'Desmonte', field: 'desmonte', fn: null, und: 'TM' },
    //                     { title: 'Tiempo Ida', field: 'tiempoIda', fn: 'toFixed', und: 'min' },
    //                     { title: 'Tiempo Retorno', field: 'tiempoRetorno', fn:'toFixed', und: 'min' },
    //                     { title: 'Inicio carga', field: 'inicio', fn: 'formatFecha', und: '' },
    //                     { title: 'Fin descarga', field: 'fin', fn: 'formatFecha', und: '' },
    //                 ]
            
    //                 for (let i in USERS) {
    //                     USERS[i].emit('tripTruck', { trips, columns })
    //                     console.log('emit tripTruck')
    //                     // console.log(trips)
    //                 }
            
    //     } catch (error) {
            
    //     }


    // }, 2000)
    // }, 4000)


}

module.exports = {
    connect,
    socket
}

// PARA LLAMAR AL SOCKET DESDE DONDE SEA DEL BACKEND

/*
    const socket = require($route of socket.js$).socket
    const {socket} = require($route of socket.js$)
    socket.io.emit('data', data)
*/