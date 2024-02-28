const mongoose = require('mongoose')
const Schema = mongoose.Schema
const utilidadController = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Utilidad', utilidadController)