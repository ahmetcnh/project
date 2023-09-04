const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")


 const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
 },{collection:"users", timestamps: true})


 const user = mongoose.model("users", userShema)

module.exports = user