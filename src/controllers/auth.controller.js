import User from '../models/User'
import Role from '../models/Role'
import Utilidad from '../models/Utilidad'

import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { name, lastname, dni, empresa, roles } = req.body

        const newUser = new User({
            name,
            lastname,
            dni,
            empresa,
            password: await User.encryptPassword(dni),
            roles
        })

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: 'user' })
            newUser.roles = [role._id]
        }

        const savedUser = await newUser.save()

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: 86400*30*12 // 24 horas por 30 dias por 12 meses
        })

        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const signin = async (req, res) => {
    try {
        console.log(req.body)
        const userFound = await User.findOne({ dni: req.body.code }).populate(
            'roles'
        )

        if (!userFound) return res.json({ message: 'No existe el usuario', status: false })

        const matchPassword = await User.comparePassword(
            req.body.code,
            userFound.password
        )

        // // user is not valid
        // if (!userFound.valid) {
        //     return res.status(401).json({ token: null, message: 'Usuario sin permiso de ingreso', status: false })
        // }
        
        if (!matchPassword)
            return res.status(401).json({ token: null, message: 'Invalid account or password', status: false })

        const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
            expiresIn: 86400*30*12 // 12 meses
        })

        // Save Utlidad
        const newUtilidad = new Utilidad({
            userId: userFound._id
        })
        await newUtilidad.save()
        
        res.json({
            user: userFound.name,
            userId: userFound._id.toString(),
            empresa: userFound.empresa,
            token,
            area: userFound.area,
            status: true,
            roles: userFound.roles
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}