const bcrypt = require("bcrypt");
const authschema = require("../api/model/user");
const response = require("../Exception-handeling/response");
const user_auth = require("../api/model/user");
const jwt = require("jsonwebtoken");
const Jwtkey = require("../utilities/jwtutilis");
const EmailServices = require("./emailServices");
const { loggers } = require("winston");



class AuthServices1 {
    // async SuperAdmin_registration() {

    //     SuperAdminUsername = "mendiratta552@gmail.com"
    //     SuperAdminPassword = "qwertyuiop"

    // }


    async SuperAdmin_login(Credential) {
        try {

            if (Credential.SuperAdminPAssword == process.env.SuperAdminPAssword && Credential.SuperAdminUsername ==  process.env.SuperAdminUsername ) {


                const token = jwt.sign( Jwtkey.Jwt_Key, {
                    algorithm: "HS256",
                    expiresIn: 24 * 60 * 60,
                });
                console.log("token", token);
                return { message: "Token is generated", token: token };
            }
            else if (Credential.SuperAdminPAssword !== process.env.SuperAdminPAssword) {
                console.log("password not correct");
                return response.sendError("password not correct");
            }
        } catch (err) {
            console.log("login ", err);
            return response.sendError("Enter valid  login password", err);
        }
    }
}
module.exports = new AuthServices1();
