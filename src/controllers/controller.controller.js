import Controller from '../models/Controller'
import Empresa from '../models/Empresa'

export const getControllers = async (req, res) => {
    try {
        const { empresa } = req.query
        const empresas = await Empresa.find()
        if (!empresa) {
            const controllers = await Controller.find().populate('userId', 'name').populate('mining', 'name')
            return res.status(200).json({controllers, empresas})
        }
        if (empresa == 'GUNJOP') {
            const controllers = await Controller.find().populate('userId', 'name').populate('mining', 'name')
            res.status(200).json({
                controllers,
                empresas
            })
        } else {
            const controllers = await Controller.find().populate('userId', 'name').populate('mining', 'name')
            const conctrollersFiltered = controllers.filter(controller => controller.mining.name.toUpperCase() == req.query.empresa.toUpperCase())
            res.status(200).json({
                controllers: conctrollersFiltered,
                empresas
            })
        }
    } catch (error) {
        console.error(error)
    }
}

export const getController = async (req, res) => {
    try {
        const controller = await Controller.findById(req.params.id)
        res.status(200).json(controller)
    } catch (error) {
        console.error(error)
    }
}

export const createController = async (req, res) => {
    try {
        const { serie, mining, level, ubication, description, top, left, userId } = req.body
        const newController = new Controller({
            serie,
            mining,
            level,
            ubication,
            description,
            userId,
            top,
            left
        })
        const controllerSaved = await newController.save()
        res.status(201).json(controllerSaved)
    } catch (error) {
        console.error(error)
    }
}

export const updateController = async (req, res) => {
    try {
        const updatedController = await Controller.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.status(200).json(updatedController)
    } catch (error) {
        console.error(error)
    }
}

export const deleteController = async (req, res) => {
    try {
        await Controller.findByIdAndDelete(req.params.id)
        res.status(204).json()
    } catch (error) {
        console.error(error)
    }
}
