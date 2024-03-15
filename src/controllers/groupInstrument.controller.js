import GroupInstrument from '../models/GroupInstrument'

export const getGroupInstrument = async(req, res) => {
    try {
        const data = await GroupInstrument.find({}).sort({_id: -1}).populate('groups')
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
}

export const createGroupInstrument = async (req, res) => {
    try {
        console.log(req.body)
        const newData = new GroupInstrument(req.body)
        const dataSaved = await newData.save()
        res.status(200).json({status: true, dataSaved})
    } catch (error) {
        console.error(error)
    }
}

export const updateGroupInstrument = async (req, res) => {
    try {
        const { id } = req.params
        const dataUpdated = await GroupInstrument.findByIdAndUpdate(id, req.body
        , { new: true })
        res.status(200).json({status: true, dataUpdated})
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteGroupInstrument = async (req, res) => {
    try {
        const { id } = req.params
        const data = await GroupInstrument.findByIdAndDelete(id)
        res.status(200).json({status: true, data})
    } catch (error) {
        console.error(error)
    }
}