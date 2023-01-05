const express = require('express');
const route = express.Router();
const Controller = require("../../controller/userController");


route.post('/user_registration',Controller.user_RegistrationController);
route.post("/user_login", Controller.user_loginController);

module.exports=route;