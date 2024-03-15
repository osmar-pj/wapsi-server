import Alarm from '../models/Alarm'

export const getAlarms = async (req, res) => {
    try {
        const alarms = await Alarm.find()
        res.status(200).json(alarms)
    } catch (error) {
        console.error(error)
    }
}

export const getAlarm = async (req, res) => {
    try {
        const alarm = await Alarm.findById(req.params.id)
        res.status(200).json(alarm)
    } catch (error) {
        console.error(error)
    }
}

export const createAlarm = async (req, res) => {
    try {
        const { instrumentId, lower_limit, upper_limit, message, color, alert  } = req.body
        const newAlarm = new Alarm({ instrumentId, lower_limit, upper_limit, message, color, alert })
        const alarmSaved = await newAlarm.save()
        res.status(201).json({status: true, alarmSaved})
    } catch (error) {
        console.error(error)
    }
}

export const updateAlarm = async (req, res) => {
    try {
        const updatedAlarm = await Alarm.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.status(200).json(updatedAlarm)
    } catch (error) {
        console.error(error)
    }
}

export const deleteAlarm = async (req, res) => {
    try {
        await Alarm.findByIdAndDelete(req.params.id)
        res.status(204).json()
    } catch (error) {
        console.error(error)
    }
}