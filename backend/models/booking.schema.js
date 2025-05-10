import {model, Schema} from 'mongoose'

const bookingSchema = new Schema({
    user : {type : String , required : true},
    event : {type : String , required : true},
    seats : {type : String , required : true},
}, {timestamps : true})

export const Booking = model("Booking", bookingSchema);