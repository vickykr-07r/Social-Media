import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const sendmail=async(to,otp)=>{ 
     await transporter.sendMail({
      from: process.env.EMAIL,
      to:to,
      subject: "Reset Password",
      html: `<p>your otp for password reset is <b>${otp}</b>.It expires in 5 minutes.... </p>`
    })}

    export default sendmail;