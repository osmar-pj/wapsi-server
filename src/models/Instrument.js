import { Schema, model } from 'mongoose'

const instrument = new Schema({
    controllerId: {
        type: Schema.Types.ObjectId,
        ref: 'Controller'
    },
    tag: String,
    description: String,
    name: String,
    serie: String,
    img: String,
    a: Number,
    b: Number,
    value: {
        type: Number,
        default: 0
    },
    measure: String,
    type: String,
    signal: String,
    mode: String,
    alarm: {
        type: Object,
        default: {}
    }
},
{
    timestamps: true,
    versionKey: false
})

export default model('Instrument', instrument)