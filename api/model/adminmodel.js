const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  gender:String,
  dob: String,
  ContactNumber: Number,
  address: String,
  password: String

});

module.exports = mongoose.model("admin", adminSchema);