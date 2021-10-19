const { Users } = require("../../../../db");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const forgotPassword = async (req, res) => {
  const { mail } = req.body;
  const user = await Users.findOne({ where: { mail: mail } })
    if (!user) {
      return res.status(409).json({ err: "invalid email" }).redirect("/");
    }

    const token = jwt.sign({ mail }, "jwt-secret", { expiresIn: "10m" });
    const verificationLink = `https://adogtame.vercel.app/login/reset/${token}`;
    user.update({
      ...user,
      resetToken: token,
    }).then(() => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "adogtamehenry@gmail.com",
              pass: "henryft16"
            }
    })
    const mailOptions = {
      from: "adogtamehenry@gmail.com",
      to: mail,
      subject: 'Password reset',
      html: `To reset your password click in the following link and follow instructions <a href=${verificationLink}>Link </a>`
    }
    transporter.sendMail(mailOptions, (err, success) => {
      if(err){
        res.status(409).json({err: "ERROR SENDING EMAIL"})
      }
    })
  //todo: MAIL
  res.json({ message: "Check your email inbox", verificationLink });
})
}

module.exports = forgotPassword;
