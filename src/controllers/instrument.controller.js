import Instrument from '../models/Instrument'

export const getInstruments = async (req, res) => {
    try {
        const instruments = await Instrument.find()
        res.status(200).json(instruments)
    } catch (error) {
        console.error(error)
    }
}

export const getInstrument = async (req, res) => {
    try {
        const instrument = await Instrument.findById(req.params.id)
        res.status(200).json(instrument)
    } catch (error) {
        console.error(error)
    }
}

export const createInstrument = async (req, res) => {
    try {
        const { controllerId, name, description, measure, type, signal, mode, serie  } = req.body
        const newInstrument = new Instrument({ controllerId, 
            name: name.toUpperCase(),
            description, measure, type, signal, mode,
            serie: serie.toUpperCase()
        })
        const instrumentSaved = await newInstrument.save()
        res.status(201).json({status: true, instrumentSaved})
    } catch (error) {
        console.error(error)
    }
}

export const updateInstrument = async (req, res) => {
    try {
        const updatedInstrument = await Instrument.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.status(200).json(updatedInstrument)
    } catch (error) {
        console.error(error)
    }
}

export const deleteInstrument = async (req, res) => {
    try {
        await Instrument.findByIdAndDelete(req.params.id)
        res.status(204).json()
    } catch (error) {
        console.error(error)
    }
}