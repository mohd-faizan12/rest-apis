const bcrypt = require("bcrypt");
const authschema = require("../api/model/user");
const response = require("../Exception-handeling/response");
const user_auth = require("../api/model/user");
const jwt = require("jsonwebtoken");
const Jwtkey = require("../utilities/jwtutilis");
const EmailServices = require("./emailServices");
const { loggers } = require("winston");
const message = require("../config/message.json");

class AdminServices {
   
    async user_login(Credential) {
        try {
            const data = await user_auth.findOne({ username: Credential.username });
            console.log("dataaaaa", data);
            if (!data) {
                //console.log("User is not found");
                return response.sendError(message["107"]);
            } 
            else if (bcrypt.compareSync(Credential.password, data.password)) {
                const payload = {
                    username: data.username,
                };
                console.log("payload", payload);

                const token = jwt.sign(payload, Jwtkey.Jwt_Key, {
                    algorithm: "HS256",
                    expiresIn: 24 * 60 * 60,
                });
                console.log("token", token);
                return { message: "Token is generated", token: token };
            } else if (!bcrypt.compareSync(Credential.password, data.password)) {
                //console.log("password not correct");
                return response.sendError(message["109"]);
            }
        } catch (err) {
            console.log("login ", err);
            return response.sendError(message["110"], err);
        }
    }
}


module.exports = new AdminServices();
