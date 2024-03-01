import Data from '../models/Data'
import Tracking from '../models/Tracking'

export const getData= async (req, res) => {
    try {
        const { serie, name, start, end } = req.query
        const data = await Data.find({ 
            serie,
            name,
            createdAt: { $gte: new Date(parseInt(start)), $lte: new Date(parseInt(end)) } 
        })
        // const data = await Tracking.find({}).sort({ datetimeServer: -1 }).limit(10)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
}

// OLD VERSION
export const getDataAnalytics = async (req, res) => {
    try {
        const { serie, name, start, end } = req.query
        // solicitar la nfo a python
        const response = await fetch(`${process.env.PY_URL}/analysis?serie=${serie}&name=${name}&start=${start}&end=${end}`)
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
}

// NEW VERSION - DASHBOARD - CAMBIAR
export const getDataAnalytics2 = async (req, res) => {
    try {

        const { serie, name, start, end, nro_month } = req.query

        const response = await fetch(`${process.env.PY_URL}/analysis?serie=${serie}&name=${name}&start=${start}&end=${end}&nro_month=${nro_month}`)
        const data = await response.json()
        res.status(200).json(data)
        
    } catch (error) {
        console.error(error)
    }

}

// week 1693112400000 1693717200000
// yesterday 1693717200000 1693803600000
// today 1693803600000 1693886400000