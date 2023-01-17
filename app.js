
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./api/route/user');
const bodyParser = require('body-parser');
const app = express();


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set('strictQuery', false);
// const mongodbconfig = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true

// }
// const url = `mongodb://${process.env.MONGODB_URI}`
// mongoose.connect(url, mongodbconfig).catch(err =>
//   console.log('Database  is not Connected', err))
mongoose.connect('mongodb+srv://faizan:faizan12@restfulapi.5frpfmo.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connection.on('error', error => {
//     console.log("connection failed");
// });

mongoose.connection.on('connected', connected => {
    console.log('Connected to db');
});


app.use('/apis', route);
app.get('', (req, res) => {
    console.log("app is run successfully ");
});

app.listen(8000, () => {
    console.log("Server is listening on port number 8000");
});

