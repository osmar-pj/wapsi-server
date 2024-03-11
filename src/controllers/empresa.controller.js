import Empresa from '../models/Empresa'

export const getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find()
        res.status(200).json(empresas)
    } catch (error) {
        console.error(error)
    }
}

export const createEmpresa = async (req, res) => {
    try {
        const { name, ruc, address } = req.body
        const newEmpresa = new Empresa({
            name,
            ruc,
            address
        })
        const saveEmpresa = await newEmpresa.save()
        res.status(200).json({status: true, saveEmpresa})
    } catch (error) {
        console.error(error)
    }
}

export const getEmpresaById = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.empresaId)
        res.status(200).json(empresa)
    } catch (error) {
        console.error(error)
    }
}

export const updateEmpresaById = async (req, res) => {
    try {
        const empresaUpdateddata = req.body
        const updatedEmpresa = await Empresa.findByIdAndUpdate(
            req.params.empresaId,
            empresaUpdateddata,
            {
                new: true
            }
        )
        res.status(200).json(updatedEmpresa)
    } catch (error) {
        console.error(error)
    }
}

export const deleteEmpresaById = async (req, res) => {
    try {
        const { empresaId } = req.params
        await Empresa.findByIdAndDelete(empresaId)
        res.status(200).json({status: true, message: 'Empresa deleted successfully'})
    } catch (error) {
        console.error(error)
    }
}