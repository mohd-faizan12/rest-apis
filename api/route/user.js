const express = require('express');
const route = express.Router();
const Controller = require("../../controller/userController");


route.post('/',Controller.user_RegistrationController);
    

module.exports=route;