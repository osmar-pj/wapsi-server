import {Schema, model} from 'mongoose'

const relation = new Schema({
    sensors: {
        type: [Schema.Types.ObjectId],
        ref: 'Instrument'
    },
    actuators: {
        type: [Schema.Types.ObjectId],
        ref: 'Instrument'
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Relation', relation)