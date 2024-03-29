import Notificacion from '../models/Notification';

export const getNotificaciones = async (req, res) => {
    try {
        const { serie } = req.query
        const notifications = await Notificacion.find({
            serie: serie
        }).limit(5).sort({_id: -1})
        //console.log(notifications)
        res.status(200).json(notifications)
    } catch (error) {
        console.error(error)
    }
}

export const getNotificacion = async (req, res) => {
    try {
        const notification = await Notificacion.findById(req.params.id)
        res.status(200).json(notification)
    } catch (error) {
        console.error(error)
    }
}

export const createNotificacion = async (req, res) => {
    try {
        const { description, name, value, msg  } = req.body
        const newNotificacion = new Notificacion({
            description,
            name,
            value,
            msg
        })
        const notificacionSaved = await newNotificacion.save()
        res.status(201).json(notificacionSaved)
    } catch (error) {
        console.error(error)
    }
}

export const updateNotificacion = async (req, res) => {
    try {
        const updatedNotificacion = await Notificacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.status(200).json(updatedNotificacion)
    } catch (error) {
        console.error(error)
    }
}

export const deleteNotificacion = async (req, res) => {
    try {
        await Notificacion.findByIdAndDelete(req.params.id)
        res.status(204).json()
    } catch (error) {
        console.error(error)
    }
}