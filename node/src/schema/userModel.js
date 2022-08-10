const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone_no:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    role:[String]
}, {timestamps:true});
 let User = mongoose.model("user", userSchema);
module.exports =  User;