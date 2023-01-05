const bcrypt = require('bcrypt');
const authschema = require("../api/model/user");
const response = require("../Exception-handeling/response");
const user_auth = require('../api/model/user');
const jwt = require("jsonwebtoken");
const Jwtkey = require("../utilities/jwtutilis");
const EmailServices=require("../services /emailServices")



class AuthServices {
    async User_registration(Credential) {
        console.log("Credential",Credential)
        try {
            Credential.password = bcrypt.hashSync(Credential.password, bcrypt.genSaltSync());
            
            // const result = await authschema.create(Credential);

            console.log("Registration is successfully",Credential.username);

          
      
            var val = Math.floor(1000 + Math.random() * 9000);
        
            EmailServices.sendTestMail(val,Credential);
            return response.sendSuccess("user Registration is successfully Done !!");

        } catch (err) {

            console.log("Registration is not done let's try again later", err)
            return response.sendError("Registration is not done let's try again later", err);



        }
    }

    async user_login(Credential) {
        try {


            const data = await user_auth.findOne({ username: Credential.username });
            console.log("dataaaaa", data);
            if (bcrypt.compareSync(Credential.password, data.password)) {
                const payload = {
                    username: data.username
                }
                console.log("payload", payload)

                const token = jwt.sign(payload, Jwtkey.Jwt_Key, {
                    algorithm: "HS256",
                    expiresIn: 24 * 60 * 60,
                })
                console.log("token", token)
                return { message: "Token is generated", token: token };

            } else if (!data) {
                console.log("User is not found")
                return response.sendSuccess("User is not found");
            }
        } catch (err) {
            console.log("login ", err)
            return response.sendError("Enter valid  login password", err);
        }
    }

}
module.exports = new AuthServices();