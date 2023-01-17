const bcrypt = require("bcrypt");
const authschema = require("../api/model/user");
const response = require("../Exception-handeling/response");
const user_auth = require("../api/model/user");
const jwt = require("jsonwebtoken");
const Jwtkey = require("../utilities/jwtutilis");
const EmailServices = require("./emailServices");
const { loggers } = require("winston");
const message = require("../config/message.json")
//console.log(message["104"]);

class AuthServices {
    async User_registration(Credential) {
       // console.log("Credential", Credential);
        try {
            Credential.password = bcrypt.hashSync(
                Credential.password,
                bcrypt.genSaltSync()
            );
            

            //console.log("otp sent succesfully", Credential.username);
            let results = Credential.username;
            //console.log("resuktsssssssssssss", results);
            let val = Math.floor(1000 + Math.random() * 9000);
           // EmailServices.sendTestMail(val, results);
            val = bcrypt.hashSync(val.toString(), bcrypt.genSaltSync());
            const data = new authschema({
                FirstName: Credential.FirstName,
                LastName: Credential.LastName,
                otp: val,
                username: Credential.username,
                password: Credential.password,
                ContactNumber: Credential.ContactNumber,
                purpose: Credential.purpose,
            });
            await data.save();
            console.log("data", data);
            
            EmailServices.sendTestMail(val, results);

            return response.sendSuccess(message["101"]);
        } catch (err) {
            //console.log("Registration is not done let's try again later", err);
            return response.sendError(
                message["102"],
                err
            );
        }
    }

    async OTP_verification_service(bodypayload) {
        console.log("bodypayload", bodypayload);
        try {
            const data = await authschema.findOne({ username: bodypayload.username });
            //console.log("afffzzzan", data);
            if (data) {
                if (bcrypt.compareSync(bodypayload.otp, data.otp)) {
                    //console.log("your otp is successfully verified");
                    data.IsVerified = true;
                    await data.save();
                    return response.sendSuccess(message["103"]);
                } else {
                    //console.log("oops!! your otp is not verified");
                    return response.sendError(message["104"]);
                }
            } else {
                //console.log("username is not valid");
                return response.sendError(message["105"]);
            }
        } catch (err) {
            //console.log("otp_verify", err);
            return response.sendError(message["106"], err);
        }
    }

    async user_login(Credential) {
        try {
            const data = await user_auth.findOne({ username: Credential.username });
            console.log("dataaaaa", data);
            if (!data) {
                //console.log("User is not found");
                return response.sendError(message["107"]);
            } else if (data.IsVerified === false) {
                //console.log("please verify your account first");
                return response.sendError(message["108"]);
            } else if (bcrypt.compareSync(Credential.password, data.password)) {
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
module.exports = new AuthServices();
