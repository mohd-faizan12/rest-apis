const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true

    },
    token:{
        type: String,
        require: true
    }

  
});

module.exports = mongoose.model("userToken", tokenSchema);
