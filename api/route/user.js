const express = require('express');
const route = express.Router();
const Controller = require("../../controller/userController");
const validation=require("../../controller/Middleware")

route.post('/user_registration', validation.NormaluserMiddleware_Auth,    Controller.user_RegistrationController);
route.post("/user_login", Controller.user_loginController);
route.post("/OTP_verification_service", Controller.OTP_verification_service);
route.post("/SuperAdmin_login", Controller.SuperAdmin_loginController);



module.exports = route;