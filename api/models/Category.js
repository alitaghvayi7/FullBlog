const mongoose = require('mongoose');

const CategoryScheme = new mongoose.Schema({
    name : {
        required:true,
        type:String,
        min:3,
        max:20
    }
},{timestamps:true});

module.exports = mongoose.model("Category",CategoryScheme);