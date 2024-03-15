import { Schema, model } from 'mongoose'

const alarm = new Schema({
    instrumentId: {
        type: Schema.Types.ObjectId,
        ref: 'Instrument'
    },
    lower_limit: {
        type: Number,
        required: true
    },
    upper_limit: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Alarm', alarm)