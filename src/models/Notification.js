const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NotificationSchema = new Schema({
    description: String,
    value: Number,
    serie: String,
    name: String,
    msg: String,
    createdAt: Date
}, {
    versionKey: false
})
module.exports = mongoose.model('Notification', NotificationSchema)