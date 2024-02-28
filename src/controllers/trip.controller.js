import axios from 'axios'

export const getTripsWagon = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.FLASK_URL}/tripWagon`)
        const data = response.data.data
        const trips = data.map(i => {
            return {
                date: i.date,
                createdAt: i.createdAt,
                turno: i.turno.toLowerCase(),
                operador: i.name,
                locomotora: i.tag.toLowerCase(),
                mining: i.mining,
                ruta: i.pique.toLowerCase(),
                vagones: i.totalValidWagons,
                tonelaje: i.totalValidWagons * 8,
                mineral: (i.polimetalico + i.carbonato + i.alabandita) * 8,
                desmonte: i.desmonte * 8,
                tiempoIda: i.timeIda,
                tiempoRetorno: i.timeRetorno,
                inicio: i.start,
                fin: i.end
            }
        })
        const columns = [
            { title: 'Fecha', field: 'date', fn: null, und: '' },
            { title: 'Turno', field: 'turno', fn: null, und: '' },
            { title: 'Operador', field: 'operador', fn: null, und: '' },
            { title: 'Locomotora', field: 'locomotora', fn: 'reducirCadena', und: '' },
            { title: 'Mina', field: 'mining', fn: null, und: '' },
            { title: 'Pique', field: 'ruta', fn: null, und: '' },
            { title: 'Vagones', field: 'vagones', fn: null, und: 'vag' },
            { title: 'Tonelaje', field: 'tonelaje', fn: null, und: 'TM' },
            { title: 'Mineral', field: 'mineral', fn: null, und: 'TM' },
            { title: 'Desmonte', field: 'desmonte', fn: null, und: 'TM' },
            { title: 'Tiempo Giba a Pique', field: 'tiempoIda', fn: 'toFixed', und: 'min' },
            { title: 'Tiempo Pique a Giba', field: 'tiempoRetorno', fn:'toFixed', und: 'min' },
            { title: 'Inicio carga', field: 'inicio', fn: 'formatFecha', und: '' },
            { title: 'Fin descarga', field: 'fin', fn: 'formatFecha', und: '' },
        ]
        
        res.status(200).json({ trips, columns })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// export const getTripsTruck = async (req, res) => {
//     try {
//         const response = await axios.get(`${process.env.FLASK_URL}/tripTruck`)
//         const data = response.data.data
//         const trips = data.map(i => {
//             return {
//                 date: i.date,
//                 turno: i.turno.toLowerCase(),
//                 camion: i.tag,
//                 mining: 'Yumpag',
//                 ubication: i.ubication.toLowerCase(),
//                 tonelaje: i.weight,
//                 time: i.time / 60,
//                 inicio: i.min * 1000,
//                 fin: i.max * 1000
//             }
//         })
//         const columns = [
//             { title: 'Fecha', field: 'date', fn: null, und: '' },
//             { title: 'Turno', field: 'turno', fn: null, und: '' },
//             { title: 'Camion', field: 'camion', fn: null, und: '' },
//             { title: 'Mina', field: 'mining', fn: null, und: '' },
//             { title: 'Ubication', field: 'ubication', fn: null, und: '' },
//             { title: 'Tonelaje', field: 'tonelaje', fn: null, und: 'TM' },
//             { title: 'Tiempo', field: 'time', fn: 'toFixed', und: 'h' },
//             { title: 'Inicio descarga', field: 'inicio', fn: 'formatFecha', und: '' },
//             { title: 'Fin descarga', field: 'fin', fn: 'formatFecha', und: '' },
//         ]
        
//         res.status(200).json({ data, trips, columns })
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

export const getTripsTruck = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.FLASK_URL}/tripTruck`)
        
        const data = response.data

        const trips = data.map((i) => ({
            date: i.date,
            createdAt: i.createdAt,
            turno: i.turno,
            operador: i.name,
            tag: i.tag,
            mining: i.mining,
            ruta: i.ruta,
            tonelaje: i.weightTotal,
            mineral: i.mineral,
            desmonte: i.desmonte,
            tiempoIda: i.timeIda,
            tiempoRetorno: i.timeRetorno,
            inicio: i.start,
            fin: i.end
        }))

        const columns = [
            { title: 'Fecha', field: 'date', fn: null, und: '' },
            { title: 'Turno', field: 'turno', fn: null, und: '' },
            { title: 'Conductor', field: 'operador', fn: null, und: '' },
            { title: 'Camion', field: 'tag', fn: null, und: '' },
            { title: 'Mina', field: 'mining', fn: null, und: '' },
            { title: 'Ruta', field: 'ruta', fn: null, und: '' },
            { title: 'Tonelaje', field: 'tonelaje', fn: null, und: 'TM' },
            { title: 'Mineral', field: 'mineral', fn: null, und: 'TM' },
            { title: 'Desmonte', field: 'desmonte', fn: null, und: 'TM' },
            { title: 'Tiempo Ida', field: 'tiempoIda', fn: 'toFixed', und: 'min' },
            { title: 'Tiempo Retorno', field: 'tiempoRetorno', fn:'toFixed', und: 'min' },
            { title: 'Inicio carga', field: 'inicio', fn: 'formatFecha', und: '' },
            { title: 'Fin descarga', field: 'fin', fn: 'formatFecha', und: '' },
        ]
        

        res.status(200).json({ trips, columns })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}