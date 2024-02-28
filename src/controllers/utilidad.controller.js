import Utilidad from '../models/Utilidad';

export const getUtilidades = async (req, res) => {
    try {
        const utilidades = await Utilidad.find()
        res.status(200).json(utilidades)
    } catch (error) {
        console.error(error)
    }
}

export const getUtilidad = async (req, res) => {
    try {
        const utilidad = await Utilidad.findById(req.params.id)
        res.status(200).json(utilidad)
    } catch (error) {
        console.error(error)
    }
}

export const createUtilidad = async (req, res) => {
    try {
        const { userId } = req.body
        const newUtilidad = new Utilidad({
            userId
        })
        const utilidadSaved = await newUtilidad.save()
        res.status(201).json(utilidadSaved)
    } catch (error) {
        console.error(error)
    }
}