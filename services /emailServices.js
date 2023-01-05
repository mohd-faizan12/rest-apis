const { renderFile } = require('ejs')
const path = require('path')
const mailer = require('nodemailer');
const { createModulerLogger } = require('../utilities/logger');
const { error } = require('console');
const logger = createModulerLogger('emailservices');
const Credential = require('./userservices')


//---------------------------------------------------email- services---------------------------------------------------------------------------------------
const transport = mailer.createTransport({
    auth: {
        user: "mendiratta552@gmail.com",
        pass: "nerjyyzmujfoalxv"
    },
    host: "smtp.gmail.com",
    port: 465
});
class EmailServices {

//    static async sendTestMail(val,Credential) {
    static async sendTestMail(val) {
    
        try {

            let Credential
            const data = await renderFile(path.join(__dirname, '../Tem/test.html'), {val,Credential})
            logger.info("sendTestMail 22", "email is successfully match")
            console.log("gggggggggg",Credential,val);
            AuthServices.user_registration(val,Credential);
            console.log("hhhhhhhhhh",Credential,val);

            transport.sendMail({
                //to: "vishal.mendiratta@uniblok.io",
                to: Credential.username,
                from: 'mendiratta552@gmail.com',
                subject: "User verification OTP",
                html: data
            }, function (err, data) {
                console.log(error)
                logger.info("sendtestmail 31", error)
            });
        } catch (err) {
            logger.error("sendtestmail 31", error)

        }
    }
}
module.exports = EmailServices;
