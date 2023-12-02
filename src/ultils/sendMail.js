const nodemailer = require("nodemailer");

const sendMail = async ({ email, html, subject }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_NAME, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Cuahangthoitrang" <no-relply@cuahangthoitrang.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });

  return info;
};

const sendMail1 = async ({ email, html, subject }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_NAME, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: email, // sender address
    to: "lh65466356@gmail.com", // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });

  return info;
};
module.exports = { sendMail, sendMail1 };
