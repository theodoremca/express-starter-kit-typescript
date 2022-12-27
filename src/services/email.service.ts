import {TransportOptions, createTransport} from "nodemailer";


interface MailOptions {
    from: string,
    to: string,
    subject: string,
    text: string
  }

export const nodeMailService = (mailOptions: MailOptions) => {
  const options: TransportOptions | any = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  };

  const transporter = createTransport(options);
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
        reject( new Error("Error " + err));
      } else {
        console.log("Email sent successfully");
        resolve("Email sent successfully");
      }
    });
  });
};

