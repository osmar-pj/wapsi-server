import Relation from '../models/Relation.js'
import Controller from '../models/Controller.js'
import Instrument from '../models/Instrument.js'

export const getRelation = async (req, res) => {
    try {
        const relations = await Relation.find().populate('sensors').populate('actuators')
        const sensors = await Instrument.find({type: 'sensor'})
        const actuators = await Instrument.find({type: 'actuator'})
        return res.status(200).json({relations, sensors, actuators})
    } catch (error) {
        console.error(error)
    }
}

export const createRelation = async (req, res) => {
    try {
        const { sensors, actuators } = req.body
        const newRelation = new Relation({ sensors, actuators })
        await newRelation.save()
        res.status(201).json(newRelation)
    } catch (error) {
        console.error(error)
    }
}

export const updateRelation = async (req, res) => {
    try {
        const updatedRelation = await Relation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.status(200).json(updatedRelation)
    } catch (error) {
        console.error(error)
    }
}

export const deleteRelation = async (req, res) => {
    try {
        await Relation.findByIdAndDelete(req.params.id)
        res.status(204).json()
    }
    catch (error) {
        console.error(error)
    }
}