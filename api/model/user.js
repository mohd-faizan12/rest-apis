const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    MailId: String,
    password: String,
    IsVerified:{
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('User', userSchema);


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