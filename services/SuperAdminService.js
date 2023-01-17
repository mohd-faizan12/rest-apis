const bcrypt = require("bcrypt");
const authtoken=require("../api/model/superadminmodel");
const adminSchema = require("../api/model/adminmodel")
const response = require("../Exception-handeling/response");
const AdminEmailServices = require("./adminemailservices");
const { loggers } = require("winston");
const crypto = require("crypto")
const message = require("../config/message.json")

require("dotenv").config();

class AuthServices1 {
    // {

    //     SuperAdminUsername = "mendiratta552@gmail.com"
    //     SuperAdminPassword = "qwertyuiop"

    // }


    async SuperAdmin_login(Credential) {
        try {
            
            if (Credential.SuperAdminPAssword == process.env.SuperAdminPAssword && Credential.SuperAdminUsername ==  process.env.SuperAdminUsername ) {


                const superadmintoken = crypto.createHash('md5').update(Credential.SuperAdminUsername).digest('hex');
                let user=new authtoken({
                    userName:Credential.SuperAdminUsername,
                    token: superadmintoken
                })
                await user.save();
                console.log(user);
                
                console.log("superadmintoken", superadmintoken);
                return { message: "Token is generated", superadmintoken: superadmintoken };
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


    async admin_addition(Credential) {
        let pass=Credential.password;

         try {
             Credential.password = bcrypt.hashSync(
                 Credential.password,
                 bcrypt.genSaltSync()
             );
             
 
             
            let results = Credential.Email;
            console.log("resuktsssssssssssss", results);
             const data = new adminSchema({
                 FirstName: Credential.FirstName,
                 LastName: Credential.LastName,
                 Email: Credential.Email,
                 gender:Credential.gender,
                 dob: Credential.dob,
                 ContactNumber: Credential.ContactNumber,
                 address: Credential.address,
                 password: Credential.password
             })
             await data.save();
             console.log("data", data);
             
             AdminEmailServices.sendResetMail(pass, results);
             return response.sendSuccess(message["201"]);
         } catch (err) {
             //console.log("Registration is not done let's try again later", err);
             return response.sendError(
                 message["102"],
                 err
             );
         }
     }

}
module.exports = new AuthServices1();
