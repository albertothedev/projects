import nodemailer from "nodemailer";

export const sendEmail = (data: Contact) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ACCOUNT,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: `${data.name}`,
      to: process.env.NEXT_PUBLIC_EMAIL_ACCOUNT,
      subject: `${data.subject}`,
      html: `
    <p>${data.message}</p>
    <span>${data.email}</span>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("NODEMAILER ERROR: ", error);
        reject();
      } else {
        console.log("Email sent: " + info.response);
        resolve("Email sent");
      }
    });
  });
