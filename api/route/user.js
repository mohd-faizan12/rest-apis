const express = require('express');
const route = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

route.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {

            const user = new User({
                _id: new mongoose.Types.ObjectId,
                MobileNumber: req.body.MobileNumber,
                MailId: req.body.MailId,
                password: hash
            })

            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                })

                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
});

module.exports = route;