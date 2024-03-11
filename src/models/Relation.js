import {Schema, model} from 'mongoose'

const relation = new Schema({
    sensors: [],
    actuators: []
})

export default model('Relation', relation)