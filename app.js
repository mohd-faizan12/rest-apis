const express = require('express');
const mongoose = require('mongoose');
const route=require('./api/route/user');
const bodyParser=require('body-parser');
const app = express();

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://faizan:faizan12@restfulapi.5frpfmo.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error', error => {
    console.log("connection failed");
});

mongoose.connection.on('connected', connected => {
    console.log('Connected to db');
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/registration',route);
app.use((req, res, next) => {
    res.status(200).json({
        msg: "server has been started"
    });
});

module.exports=app;
