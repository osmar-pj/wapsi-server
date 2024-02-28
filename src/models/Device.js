const mongoose = require('mongoose')
const Schema = mongoose.Schema
const deviceSchema = new Schema({
    serie: String,
    controllerId: {
        type: Schema.Types.ObjectId,
        ref: 'Controller'
    },
    device: {},
    active: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model('Device', deviceSchema)