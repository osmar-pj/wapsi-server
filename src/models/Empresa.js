const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empresaSchema = new Schema({
    name: String,
    ruc: Number,
    address: String,
    map: String,
    controllers: [{
        type: Schema.Types.ObjectId,
        ref: 'Controller'
    }]
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Empresa', empresaSchema)