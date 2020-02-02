const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    relatedTags: [{
        type: Schema.Types.ObjectId,
        ref: "Tags",
        required: true
    }],
    relatedCategories: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: TextTrackCue,
    }],
    viewCounter: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("News", newsSchema);