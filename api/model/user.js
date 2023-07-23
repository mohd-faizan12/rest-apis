const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    MobileNumber: Number,
    MailId: String,
    password: String,
    IsVeried:Boolean
});

module.exports = mongoose.model('User', userSchema);
