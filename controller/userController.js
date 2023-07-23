const Services = require("../services/userservices");
const SuperAdminServices = require("../services/SuperAdminService");
const adminServices=require("../services/adminservices");

class Controller {
    async user_RegistrationController(req, res) {
        const Credential = req.body;
        const result = await Services.User_registration(Credential);
        res.status(200).json({
            result: result
        });
        console.log("user registration Successfully");
    }
    async user_loginController(req, res) {
        const Credential = req.body;
        const result = await Services.user_login(Credential);
        res.json(result);
        console.log("user is successfully login !!");
        
    }
    async OTP_verification_service(req, res) {
        const Credential = req.body;
        const result = await Services.OTP_verification_service(Credential);
        res.json(result);
        console.log("Email verified");
    }
    async SuperAdmin_loginController(req, res) {
        const Credential = req.body;
        const result = await SuperAdminServices.SuperAdmin_login(Credential);
        res.json(result);
        console.log("Super admin is successfully login !!")
    }
    async admin_addition(req, res) {
        const Credential = req.body;
        const result = await SuperAdminServices.admin_addition(Credential);
        res.json(result);
        console.log("admin is successfully created!");
    }
    async update_password(req, res) {
        const Credential = req.body;
        const result = await adminServices.update_password(Credential);
        res.json(result);
        console.log("Password is changed..!!");
    }
};


module.exports = new Controller;
