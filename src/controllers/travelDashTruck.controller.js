import axios from 'axios'

export const getTravelTruck = async (req, res) => {
    try {
        const period = req.query.period
        const value = req.query.value

        const response = await axios.get(`${process.env.FLASK_URL}/wagon?period=${period}&value=${value}`)

        

        const colorDia = '#F3BD5A'
        const colorNoche = '#598CF3'
        const colorTextWhite = '#FFFFFF'
        const colorTextBlack = '#000000'
        const data = response.data.data
        const events = data.events.map(i => {
            return {
                checklist_conditionLocomotive: i.checklist_conditionsL.filter(j => j.status == 'MAL'),
                checklist_conditionsWagon: i.checklist_conditionsW.filter(j => j.status == 'MAL'),
                checklist_verifyLocomotive: i.checklist_verifyL.filter(j => j.status == 'MAL'),
                checklist_verifyWagon: i.checklist_verifyW.filter(j => j.status == 'MAL'),
                tag: (i.tag).toLowerCase(),
                date: i.createdAt,
                operator: i.name
            }
        })
        const score = {
            trips: data.score.operation_Id,
            timeIda: data.score.timeIda,
            timeRetorno: data.score.timeRetorno,
            weight: data.score.weight,
            periodo: data.score.periodo
        }
        const graphic = data.graphic.map(i => {
            const NOCHE = i.NOCHE ? i.NOCHE * 8 : 0
            const DIA = i.DIA ? i.DIA * 8 : 0
            let x = ''
            if (period == 'D') {
                x = `${i.date}`
            } else if (period == 'S') {
                const dia = parseInt(i.date.split('/')[0])
                x = `${i.day} - ${dia}`
            }
            else if (period == 'M') {
                const dia = parseInt(i.date.split('/')[0])
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
        const locomotives = data.locomProduction.map(i => {
            const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
            const weightDia = i.DIA ? i.DIA * 8 : 0
            const weightNoche = i.NOCHE ? i.NOCHE * 8 : 0
            const turn = {
                DIA: { value: weightDia, percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
                NOCHE: { value: weightNoche, percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
            }
            const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
            const weightAlb = i.alabandita ? i.alabandita * 8 : 0
            const weightCarb = i.carbonato ? i.carbonato * 8 : 0
            const weightDesm = i.desmonte ? i.desmonte * 8 : 0
            const weightMineral = weightPol + weightAlb + weightCarb
            const material = {
                MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
                // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
                // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
                // CARB: { value: weightCarb, perecnt: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
                DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#ff6d7a', colorText: colorTextWhite, msg: `Des=${weightDesm}`}
            }
            // const weightG1 = i.G1 ? i.G1 * 8 : 0
            // const weightG2 = i.G2 ? i.G2 * 8 : 0
            // const weightG3 = i.G3 ? i.G3 * 8 : 0
            // const weightG4 = i.G4 ? i.G4 * 8 : 0
            // const gibas = {
            //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
            //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
            //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
            //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
            // }
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
                UTIL: { value: timeOperation, percent: timeOperation * 100 / totalTime, color: '#5AF35F', colorText: colorTextBlack, msg: `Op=${(timeOperation * 100 / totalTime).toFixed(1)} %` },
                NOT_UTIL: { value: timeInoperation, percent: timeInoperation * 100 / totalTime, color: '#F3E459', colorText: colorTextBlack, msg: `Inop=${(timeInoperation * 100 / totalTime).toFixed(1)} %` },
                MANT: { value: 0, percent: 0, color: '#F35959', colorText: colorTextWhite, msg: `Mt=0` }
            }
            return {
                turn,
                material,
                disponibilidad,
                totalWeight,
                meanTime: i.meanTime,
                tag: (i.tag).toLowerCase()
            }
        })
        const piques = data.pique.map(i => {
            const totalWeight = i.totalWeight ? i.totalWeight * 8 : 0
            const stock = {
                STOCK: { value: 0, percent: 0, color: '#5AF35F' }
            }
            const weightDia = i.DIA ? i.DIA * 8: 0
            const weightNoche = i.NOCHE ? i.NOCHE * 8: 0
            const turn = {
                DIA: { value: weightDia , percent: weightDia * 100 / totalWeight, color: colorDia, colorText: colorTextBlack, msg: `Dia=${weightDia}` },
                NOCHE: { value: weightNoche , percent: weightNoche * 100 / totalWeight, color: colorNoche, colorText: colorTextWhite, msg: `Noc=${weightNoche}` }
            }
            const weightPol = i.polimetalico ? i.polimetalico * 8 : 0
            const weightAlb = i.alabandita ? i.alabandita * 8 : 0
            const weightCarb = i.carbonato ? i.carbonato * 8 : 0
            const weightDesm = i.desmonte ? i.desmonte * 8 : 0
            const weightMineral = weightPol + weightAlb + weightCarb
            const material = {
                MINERAL: { value: weightMineral, percent: weightMineral * 100 / totalWeight, color: '#5993af', colorText: colorTextWhite, msg: `Min=${weightMineral}` },
                // POL: { value: weightPol, percent: weightPol * 100 / totalWeight, color: '#59AF65', colorText: colorTextBlack, msg: `P=${weightPol}` },
                // ALB: { value: weightAlb, percent: weightAlb * 100 / totalWeight, color: '#5993AF', colorText: colorTextWhite, msg: `A=${weightAlb}` },
                // CARB: { value: weightCarb, percent: weightCarb * 100 / totalWeight, color: '#FF6D7A', colorText: colorTextWhite, msg: `C=${weightCarb}` },
                DESM: { value: weightDesm, percent: weightDesm * 100 / totalWeight, color: '#ff6d7a', colorText: colorTextWhite, msg: `Des=${weightDesm}` }
            }
            // const weightG1 = i.G1 ? i.G1 * 8 : 0
            // const weightG2 = i.G2 ? i.G2 * 8 : 0
            // const weightG3 = i.G3 ? i.G3 * 8 : 0
            // const weightG4 = i.G4 ? i.G4 * 8 : 0
            // const gibas = {
            //     G1: { value: weightG1, percent: weightG1 * 100 / totalWeight, color: colorG1, colorText: colorTextWhite, msg: `G1=${weightG1}` },
            //     G2: { value: weightG2, percent: weightG2 * 100 / totalWeight, color: colorG2, colorText: colorTextWhite, msg: `G2=${weightG2}` },
            //     G3: { value: weightG3, percent: weightG3 * 100 / totalWeight, color: colorG3, colorText: colorTextBlack, msg: `G3=${weightG3}` },
            //     G4: { value: weightG4, percent: weightG4 * 100 / totalWeight, color: colorG4, colorText: colorTextWhite, msg: `G4=${weightG4}` }
            // }
            return {
                stock,
                turn,
                material,
                pique: (i.pique).toLowerCase(),
                totalWeight
            }
        })
        const dataTurn = data.turn.totalValidWagons
        let turn = {
            DIA: { value: 0, percent: 0, color: colorDia, colorText: colorTextBlack, msg: `D=0` },
            NOCHE: { value: 0, percent: 0, color: colorNoche, colorText: colorTextWhite, msg: `N=0` }
        }
        if (dataTurn) {
            const DIA = data.turn.totalValidWagons.DIA ? data.turn.totalValidWagons.DIA * 8 : 0
            const NOCHE = data.turn.totalValidWagons.NOCHE ? data.turn.totalValidWagons.NOCHE * 8 : 0
            const TOTAL = DIA + NOCHE
            turn = {
                DIA: { value: DIA, percent: DIA * 100 / TOTAL, color: colorDia, colorText: colorTextBlack, msg: `D=${DIA}` },
                NOCHE: { value: NOCHE, percent: NOCHE * 100 / TOTAL, color: colorNoche, colorText: colorTextWhite, msg: `N=${NOCHE}` }
            }
        }

        const total = data.total
        const trips = data.trips

        const wagon = {
            events,
            graphic,
            locomotives,
            piques,
            score,
            total,
            trips,
            turn
        }
        res.status(200).json({ wagon })
    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        })
    }
}