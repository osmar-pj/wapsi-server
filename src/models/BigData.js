import { Schema, model } from 'mongoose'

const data = new Schema({
    // depende de model Controller
    controllerId: {
        type: Schema.Types.ObjectId,
        ref: 'Controller'
    },
    instrumentId: {
        type: Schema.Types.ObjectId,
        ref: 'Instrument'
    },
    name: String,
    value: Number
}, {
    timestamps: true,
    versionKey: false
})

export default model('BigData', data)