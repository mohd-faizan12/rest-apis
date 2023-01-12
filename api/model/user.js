const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    FirstName:String,
    LastName:String,
    username:{
     type:String,
     require:true,
     unique:true
    },
    password: String,
    otp:String,
    IsVerified:{
        type: Boolean,
        default: false 
    },
    ContactNumber:Number,
    purpose:String
});

module.exports = mongoose.model('user1', userSchema);


// const { Schema, model } = require("mongoose");
// const userSchema = new Schema({
//     username: {
//         type: String,

//         require: true
//     },
//     password: {
//         type: String
    
//     }

 


// })
// module.exports = model("user_auth", userSchema);