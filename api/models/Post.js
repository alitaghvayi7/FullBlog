const mongoose = require('mongoose');

const PostScheme = new mongoose.Schema({
    username : {
        required:true,
        type:String
    },
    title : {
        type:String,
        min:5,
        max:30,
        required:true
    },
    describtion : {
        type:String,
        min:5,
        required:true
    },
    image : {
        type:String,
        default : ""
    },
    category : {
        type : Array,
        default : []
    }
},{timestamps:true});

module.exports = mongoose.model("Post",PostScheme);