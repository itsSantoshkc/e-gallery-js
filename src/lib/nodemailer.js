import ForgetPassword from "@/emails/ForgetPassword";
import Otp from "@/emails/Otp";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";

export const sendEmail = async (emailInfo) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    if (emailInfo.type === "VERIFY") {
      const email = emailInfo.email;
      const splitEmail = email.split("@");
      const formattedEmail =
        splitEmail[0].slice(0, splitEmail[0].length / 2) +
        "*******" +
        splitEmail[1];

      const emailHtml = await render(
        <Otp
          receiver={formattedEmail}
          verificationToken={emailInfo.verificationCode}
        />
      );

      const mailOptions = {
        from: "egallery@gmail.com",
        to: emailInfo.email,
        subject: "Verify Log In",
        html: emailHtml,
      };
      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse;
    }
    if (emailInfo.type === "FORGET PASSWORD") {
      const email = emailInfo.email;
      const splitEmail = email.split("@");
      const formattedEmail =
        splitEmail[0].slice(0, splitEmail[0].length / 2) +
        "*******" +
        splitEmail[1];

      const emailHtml = await render(
        <ForgetPassword email={formattedEmail} hash={emailInfo.hash} />
      );

      const mailOptions = {
        from: "egallery@gmail.com",
        to: email,
        subject: "Forget Password",
        html: emailHtml,
      };
      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse;
    }
  } catch (error) {
    throw new Error(error);
  }
};
