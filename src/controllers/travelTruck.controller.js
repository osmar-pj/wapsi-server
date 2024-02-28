import axios from 'axios'

// export const getTravelTruck = async (req, res) => {
//     try {
//         const response = await axios.get(process.env.FLASK_URL)
//         const totalTrips = response.data.trips

//         const tripsProduction = totalTrips.filter(i => i.place == 'echadero').length
//         const totalWeight = tripsProduction * 35
//         const countTags = [...new Set(totalTrips.map(i => i.tag))]
//         const totalTrucks = countTags.length
//         const timeProduction = totalTrips.filter(i => i.area != 'comedor').reduce((acc, i) => acc + i.time, 0) / 60
//         const timeNotProduction = totalTrips.filter(i => i.area == 'comedor').reduce((acc, i) => acc + i.time, 0) / 60

//         const totalWeek = {
//             trips: tripsProduction,
//             totalWeight: totalWeight,
//             trucks: totalTrucks,
//             timeProduction: timeProduction,
//             timeNotProduction: timeNotProduction
//         }

//         const stat = response.data.stat.map(i => {
//             return {
//                 date: i.date,
//                 DIA: i.DIA * 35,
//                 NOCHE: i.NOCHE * 35,
//                 day: i.day
//             }
//         })

//         const trucks = response.data.trucks
//         const today = response.data.today

//         res.status(200).json({ totalWeek, stat, trucks, today,
//             totalTrips: totalTrips.reverse().slice(0, 10) })
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }


export const getTravelTruck = async (req, res) => {
    try {
        console.log(req.query)

        const period = req.query.period
        const value = req.query.value
        const ruta = req.query.ruta

        const response = await axios.get(`${process.env.FLASK_URL}/truck?period=${period}&value=${value}&ruta=${ruta}`)

        const colorDia = '#F3BD5A'
        const colorNoche = '#598CF3'
        const colorTextWhite = '#FFFFFF'
        const colorTextBlack = '#000000'

        const data = response.data.data


        const events = data.events.map(i => {
            return {
                driver: i.name,
                tag: i.tag,
                events: i.events,
                createdAt: i.createdAt,
            }
        })

        const score = {
            trips: data.score.operationTruck_Id,
            timeIda: data.score.timeIda,
            timeRetorno: data.score.timeRetorno,
            weight: data.score.weightTotal,
            periodo: data.score.periodo
        }

        const graphic = (period === 'S' ? data.graphic.slice(0, 7) : data.graphic).map(i => {

            const NOCHE = i.NOCHE ? parseInt(i.NOCHE) : 0;
            const DIA = i.DIA ? parseInt(i.DIA) : 0;

            let x = '';

            if (period == 'D') {
                x = `${i.date}`
            } else if (period == 'S') {
                const dia = parseInt(i.date.split('/')[0]);
                x = `${i.day} - ${dia}`
            } else if (period == 'M') {
                const dia = parseInt(i.date.split('/')[0]);
                x = `${dia}`
            }

            return {
                NOCHE: NOCHE,
                DIA: DIA,
                day: i.day,
                date: i.date,
                x: x
            }

        })
        // .filter(obj => obj.DIA !== undefined || obj.NOCHE !== undefined);

        console.log(graphic)

        const trucks = data.truckProduction.map(i => {
            const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;

            const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

            const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

            const turn = {
                DIA: { value: weightDia, percent: parseFloat((weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, msg: `Dia/ ${weightDia}` },

                NOCHE: { value: weightNoche, percent: parseFloat((weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, msg: `Noc/ ${weightNoche}` }
            }

            const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

            const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

            const material = {
                MINERAL: { value: weightMineral, percent: parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', msg: `Min/ ${weightMineral}` },

                DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', msg: `Des/ ${weightDesmonte}` }
            }

            let totalTime = 0
            if (period == 'D') {
                totalTime = 24
            } else if (period == 'S') {
                totalTime = 168
            }
            else if (period == 'M') {
                totalTime = 720
            }
            const timeInoperation = i.timeInoperation ? i.timeInoperation : 0
            const timeOperation = totalTime - timeInoperation
            const disponibilidad = {
                UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', msg: `Op/ ${(timeOperation * 100 / totalTime).toFixed(1)}%` },
                NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', msg: `Inop/ ${(timeInoperation * 100 / totalTime).toFixed(1)}%` },
            }

            return {
                turn,
                material,
                disponibilidad,
                totalWeight,
                meanTime: i.meanTime,
                tag: i.tag
            }

        })

        const rutas = data.ruta.map(i => {
            const totalWeight = i.totalWeight ? parseFloat((i.totalWeight).toFixed(1)) : 0;
            const stock = {
                STOCK: { value: 0, percent: 0, color: '#5AF35F' }
            }
            const weightDia = i.DIA ? parseFloat((i.DIA).toFixed(1)) : 0;

            const weightNoche = i.NOCHE ? parseFloat((i.NOCHE).toFixed(1)) : 0;

            const turn = {
                DIA: { value: weightDia, percent: parseFloat((weightDia * 100 / totalWeight).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
                NOCHE: { value: weightNoche, percent: parseFloat((weightNoche * 100 / totalWeight).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` },
            }

            const weightMineral = i.mineral ? parseFloat((i.mineral).toFixed(1)) : 0;

            const weightDesmonte = i.desmonte ? parseFloat((i.desmonte).toFixed(1)) : 0;

            const material = {
                MINERAL: { value: weightMineral, percent: parseFloat((weightMineral * 100 / totalWeight).toFixed(1)), color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
                DESMONTE: { value: weightDesmonte, percent: parseFloat((weightDesmonte * 100 / totalWeight).toFixed(1)), color: '#ff6d7a', colorText: colorTextBlack, msg: `Des=${weightDesmonte}` }
            }

            return {
                stock,
                turn,
                material,
                ruta: (i.ruta).toUpperCase(),
                totalWeight
            }

        })


        const dataTurn = data.turn.weightTotal
        let turn = {
            DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
            NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
        }

        if (dataTurn) {
            const DIA = data.turn.weightTotal.DIA ? parseFloat((data.turn.weightTotal.DIA).toFixed(1)) : 0;

            const NOCHE = data.turn.weightTotal.NOCHE ? parseFloat((data.turn.weightTotal.NOCHE).toFixed(1)) : 0;

            const TOTAL = DIA + NOCHE
            turn = {
                DIA: { value: DIA, percent: parseFloat((DIA * 100 / TOTAL).toFixed(1)), color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
                NOCHE: { value: NOCHE, percent: parseFloat((NOCHE * 100 / TOTAL).toFixed(1)), color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
            }
        }

        const total = data.total

        const trips = data.trips.map(i => {
            return {
                tag: i.tag,
                name: i.name,
                ruta: i.ruta,
                weight: i.weightTotal,
                createdAt: i.createdAt,
            }
        })

        const truck = {
            events,
            graphic,
            trucks,
            rutas,
            score,
            total,
            trips,
            turn
        }

        res.status(200).json({ truck })


    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}