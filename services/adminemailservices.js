const { renderFile } = require("ejs");
const path = require("path");
const mailer = require("nodemailer");
const { createModulerLogger } = require("../utilities/logger");
const { error } = require("console");
const logger = createModulerLogger("emailservices");
const AuthServices1 = require("./SuperAdminService");

//---------------------------------------------------email- services---------------------------------------------------------------------------------------
const transport = mailer.createTransport({
  auth: {
    user: "mendiratta552@gmail.com",
    pass: "nerjyyzmujfoalxv",
  },
  host: "smtp.gmail.com",
  port: 465,
});
console.log("hhhhhhhhhh");
class AdminEmailServices {
  static async sendResetMail(pass, results) {
    try {
      const data = await renderFile(path.join(__dirname, "../Tem/reset.html"), {
        pass,
        results,
      });
      logger.info("sendTestMail 22", "email is successfully match");
      console.log("hhhhhhhhhh", results, pass);

      transport.sendMail(
        {
          to: results,
          from: "mendiratta552@gmail.com",
          subject: "reset password",
          html: data,
        },
        // function (err, data) {
        //   console.log(error);
        //   logger.info("sendtestmail 31", error);
        // }
      );
    } catch (err) {
      logger.error("sendtestmail 31", error);
    }
  }
}
module.exports = AdminEmailServices;
