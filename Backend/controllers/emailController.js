const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          //princekumarsingh9875@gmail.com
          // Your email
          pass: process.env.EMAIL_PASS, // App Password (not normal password)
        },
      });

      const mailOptions = {
        from: `"Plus Point Support" <${process.env.EMAIL_USER}>`, //process.env.EMAIL_USER,
        to: email,
        subject: "Thank You for Contacting Us!",
        text: "We appreciate your message and will get back to you soon.",
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({success:true, message:` "Email sent successfully! to" ${email} ` });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ message: "Email sending failed", error: error.message });
    }
  } catch (error) {
    console.log("nor sending email", error);
  }
};

module.exports = sendEmail;
