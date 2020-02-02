const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    usageCount: {
        type: Number,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Tags", tagsSchema)