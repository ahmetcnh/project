const { date, boolean } = require("joi")
const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")


 const meetingShema = new mongoose.Schema({
    dates:{
        type: new Date().getFullYear,
        required:true,
        trim:true
    },
    hour:{
        type:new Date().getHours,
        required:true,
        trim:true
    },
    isAvailable:{
        type:boolean,
        trim:true
    }
    
 },{collection:"meeting", timestamps: true})


 const meeting = mongoose.model("meeting", meetingShema)

module.exports = meeting