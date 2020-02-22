const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title:{
        type:String,
        require:true
    },
    usageCount:{
        type:Number,
        require:false,
        default:0
    },
}, {timestamps:true} );

module.exports = mongoose.model('Category', categorySchema)