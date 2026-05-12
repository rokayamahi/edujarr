const mongoose = require('mongoose');

const {Schema} = require('mongoose');

const bannerSchema = new Schema({
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true, versionKey: false});
module.exports = mongoose.model('Banner', bannerSchema);