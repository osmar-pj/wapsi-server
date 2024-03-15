import { Schema, model } from 'mongoose'

const data = new Schema({
    // depende de model Controller
    serie: String, // controller
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

export default model('Data', data)