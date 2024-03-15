import BigData from "../models/BigData"
import Instrument from "../models/Instrument"
import mqttClient from "../mqttClient"

export const getBigData = async (req, res) => {
    try {
        const { serie, name, start, end } = req.query
        const data = await BigData.find({}).sort({_id: -1}).limit(10)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
}

export const postBigData = async (req, res) => {
    try {
        const { instrumentId } = req.params
        const instrument = await Instrument.findById(instrumentId).populate('controllerId')
        const instrumentUpdated = await Instrument.findByIdAndUpdate(instrumentId, { value: req.body.value }, { new: true })
        const newData = new BigData({ controllerId: instrumentUpdated.controllerId, instrumentId, name: instrumentUpdated.name, value: req.body.value })
        console.log(newData)
        // const dataSaved = await newData.save()
        // mqttClient.sendMessage(`gunjop/control/${instrument.controllerId.serie}`, JSON.stringify(req.body.value ? 'on' : 'off'))
        res.status(200).json({status: true, dataSaved})
    } catch (error) {
        console.error(error)
    }
}