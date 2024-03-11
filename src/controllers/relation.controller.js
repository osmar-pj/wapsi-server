import Relation from '../models/Relation.js'
import Controller from '../models/Controller.js'
import Device from '../models/Device.js'

export const getRelation = async (req, res) => {
    try {
        const relations = await Relation.find()
        const controllers = await Controller.find()
        const devices = await Device.find()
        return res.status(200).json(controllers)
    } catch (error) {
        console.error(error)
    }
}
