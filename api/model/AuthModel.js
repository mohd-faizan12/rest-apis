const { Schema, model } = require("mongoose");
const SuperAdminSchema = new Schema({
    username: {
        type: String,

        require: true
    },
    password: {
        type: String,
        require: true


    }
 


})
module.exports = model("admin_auth", SuperAdminSchema);