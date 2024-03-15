import { Schema, model } from 'mongoose'

const groupInstrument = new Schema({
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Instrument'
    }],
    position: {},
    name: String,
    description: String,
    img: String,
    ubication: String,
    installation: String, // ext / int
},
{
    timestamps: true,
    versionKey: false
})

export default model('GroupInstrument', groupInstrument)