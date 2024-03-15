const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NotificationSchema = new Schema({
    instrumentId: {
        type: Schema.Types.ObjectId,
        ref: 'Instrument'
    },
    title: String,
    message: String,
    value: Number,
    category: String,
    color: String,
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Notification', NotificationSchema)