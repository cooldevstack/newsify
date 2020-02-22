const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    usageCount: {
        type: Number,
        required: false,
        default:0
    }
}, { timestamps: true })

module.exports = mongoose.model("Tags", tagsSchema)