import mongoose from "mongoose";
import validator from 'validator'

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'user must have a name']
    },
    role:{
        type:String,
        default:'jobSeeker'
        
    },
    email:{
        type:String,
        unique:true,
        validate:[validator.isEmail,'enter a valid email'],
        required:[true,"email required"]
    },
    password:{
        type:String,
        minlength:8,
        select:false,
        required:[true,"password required"]
    },
    profileDetails:String
})


const User=mongoose.model('User',UserSchema)

export default User