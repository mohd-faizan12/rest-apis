const bcrypt = require('bcrypt');
const authschema = require("../api/model/user");
const response = require("../Exception-handeling/response");


class AuthServices {
    async User_registration(Credential) {
        try {
                Credential.password = bcrypt.hashSync(Credential.password, bcrypt.genSaltSync());
                const result = await authschema.create(Credential);
                console.log("Registration is successfully",result);

                return response.sendSuccess("user Registration is successfully Done !!");

            
        } catch (err) {

            console.log("Registration is not done let's try again later", err)
            return response.sendError("Registration is not done let's try again later", err);



    }
}
}
module.exports = new AuthServices();