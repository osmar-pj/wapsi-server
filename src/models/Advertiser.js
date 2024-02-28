const mongoose = require('mongoose')
const Schema = mongoose.Schema
const advertiserSchema = new Schema({
    description: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Advertiser', advertiserSchema)