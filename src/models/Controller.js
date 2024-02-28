const mongoose = require('mongoose')
const Schema = mongoose.Schema
const controllerSchema = new Schema({
    serie: String,
    mining: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    level: String,
    ubication: String,
    top: Number,
    left: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    devices: []
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Controller', controllerSchema)