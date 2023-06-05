const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "anhthai.dev@gmail.com",
      pass: "xlwvuryrjpetsdbd",
    },
  });

  const mailOptions = {
    from: "Express Shop <admin@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
