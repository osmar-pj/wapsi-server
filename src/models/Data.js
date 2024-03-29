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
    // createdAt: Date,
    datetimeServer: Date
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Data', dataSchema)