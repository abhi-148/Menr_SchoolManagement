const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Verify SMTP connection when server starts

transporter.verify((error, success) => {

  if (error) {

    console.error(
      "SMTP Connection Error:",
      error.message
    );

  } else {

    console.log(
      "SMTP Server Ready - Email Sending Enabled"
    );

  }

});


module.exports = transporter;