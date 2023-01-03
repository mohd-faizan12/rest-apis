const Services = require("../services /userservices");

class Controller {
    async user_RegistrationController(req, res) {
        const Credential = req.body;
        const result = await Services.User_registration(Credential);
        res.status(200).json({
            result:result
        });
        console.log("user registration Successfully");
}
};
module.exports = new Controller;
