import User from '../models/User'
import Role from '../models/Role'
import Empresa from '../models/Empresa'

export const getUsers = async (req, res) => {
    try {
        // check hedaer token
        const users = await User.find().populate('roles')
        console.log(users)
        // filtrar password de users
        const usersFiltered = users.map(user => {
            const { password, ...userFiltered } = user._doc
            return userFiltered
        })
        // filtrar el user de name con role admin
        const usersFiltered2 = usersFiltered.filter(user => {
            const { roles } = user
            const role = roles.find(role => role.name === 'admin')
            if (role) return false
            return true
        })
        const roles = await Role.find()
        // remove items from array moderator and admin values
        const rolesFiltered = roles.filter(role => {
            if (role.name === 'admin') return false
            return true
        })
        const empresas = await Empresa.find()
        res.json({usersFiltered2, rolesFiltered, empresas})
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
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

        const savedUser = await newUser.save()
        res.status(200).json({status: true, savedUser})
    } catch (error) {
        console.error(error)
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('roles')
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

export const updateUserById = async (req, res) => {
    try {
        const userUpdateddata = req.body
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            userUpdateddata,
            {
                new: true
            }
        )
        res.status(200).json({status: true, updatedUser})
    } catch (error) {
        console.error(error)
    }
}

export const deleteUserById = async (req, res) => {
    try {
        // delete user biy Id
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({status: true, message: 'User deleted successfully'})
    } catch (error) {
        
    }
}