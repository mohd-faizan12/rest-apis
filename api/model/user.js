const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
  otp: String,
  IsVerified: {
    type: Boolean,
    default: false,
  },
  ContactNumber: Number,
  purpose: String,
});

module.exports = mongoose.model("user1", userSchema);
