const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true,
        min:4,
        max:35
    },
    email : {
        type:String,
        required:true,
        unique:true,
        max:50
    }
    ,
    password : {
        type : String,
        required:true,
        min : 6,
        max:50
    },
    profilePicture : {
        type:String,
        default:""
    }
},{timestamps :true});

module.exports = mongoose.model("User",UserScheme);