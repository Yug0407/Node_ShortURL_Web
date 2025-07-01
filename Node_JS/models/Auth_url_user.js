const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type : String ,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    }
},{timestamps : true})

const shortURL_user = mongoose.model("user", userSchema);
module.exports = shortURL_user ;