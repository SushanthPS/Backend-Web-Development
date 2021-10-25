const nodemailer = require("nodemailer");
require("dotenv").config(); //to take user and pass from env file (only needs to be run once in any file)

//sending email logic
// create reusable transporter object using the default SMTP transport
module.exports = nodemailer.createTransport({
    host: process.env.NODE_ENV === "development" ? "smtp.mailtrap.io" : "", //making host dynamic for production
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
});
