const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require("../config/envConfig");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

class EmailService {
  static sendEmail(to, subject, htmlContent) {
    transporter.sendMail(
      {
        from: emailUser,
        to: to,
        subject: subject,
        html: htmlContent,
      },
      (err, info) => {
        if (err) {
          console.error(`Email failed: ${err.message}`);
        } else {
          console.log(`Email sent successfully: ${info.response}`);
        }
      }
    );
  }
}

module.exports = EmailService;
