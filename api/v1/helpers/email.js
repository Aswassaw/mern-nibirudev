const nodemailer = require("nodemailer");

const sendEmail = (dataEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "aswassawexe2@gmail.com",
      pass: "aswassawexe2##asw1",
    },
  });

  return transporter
    .sendMail(dataEmail)
    .then((info) => console.log(info))
    .catch((err) => console.error(err));
};

module.exports = { sendEmail };
