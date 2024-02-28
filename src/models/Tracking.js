const mongoose = require('mongoose')

const Schema = mongoose.Schema
const dataSchema = new Schema({
    // depende de model Controller
    serie: String,
    mining: String,
    level: String,
    ubication: String,
    category: String,
    name: String,
    devices: {},
    timestamp: Number,
    createdAt: Date,
    datetimeServer: Date
}, {
    versionKey: false
})

module.exports = mongoose.model('Tracking', dataSchema)