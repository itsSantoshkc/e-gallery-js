//@ts-ignore
import nodemailer from "nodemailer";

// type emailInfo = {
//   email: string;
//   type: "VERIFY" | "FORGET PASSWORD";
//   verificationCode: number;
// };

export const sendEmail = async (emailInfo) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
        //TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
      from: "egallery@gmail.com",
      to: emailInfo.email,
      subject:
        emailInfo.type === "VERIFY"
          ? "Verification Code"
          : "Forgetten Password",
      html: `<h1 style="background-color: black;" color:"white" width="600"  >Verification Code : ${emailInfo.verificationCode}</h1>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error);
  }
};
