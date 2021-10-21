const mongoose = require('mongoose')
const {Schema} = mongoose

//Creating a schema 
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}) 

const User = mongoose.model('user',UserSchema)  //Converting schema to model

module.exports = User