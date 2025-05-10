import {model, Schema} from 'mongoose'

const userSchema = new Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    password : {type : String , required : false},
    confirmPassword : {type : String , required : false},
    role : {type : String , required : true},
}, {timestamps : true})

export const User = model("User", userSchema);