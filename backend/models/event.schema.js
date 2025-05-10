import mongoose, {model, Schema} from 'mongoose'

const eventSchema = new Schema({
    title : {type : String , required : true},
    description : {type : String , required : true},
    date : {type : String , required : true},
    time : {type : String , required : true},
    location : {type : String , required : true},
    totalSeats : {type : Number , required : true},
    bookedSeats : {type : [Number] , required : true},
    createdBy : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    // createdBy : {type : String , required : true},
}, {timestamps : true})

export const Event = model("Event", eventSchema);