const mongoose = require('mongoose');

const userVerification = new mongoose.Schema({
    userId: String,
    uiniqueString: String,
    createdAt: Date,
    expiresAt: Date
});

module.exports = mongoose.model('userVerification', userVerification);
