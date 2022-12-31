"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMailService = void 0;
const nodemailer_1 = require("nodemailer");
const nodeMailService = (mailOptions) => {
    const options = {
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
    const transporter = (0, nodemailer_1.createTransport)(options);
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
                reject(new Error("Error " + err));
            }
            else {
                console.log("Email sent successfully");
                resolve("Email sent successfully");
            }
        });
    });
};
exports.nodeMailService = nodeMailService;
//# sourceMappingURL=email.service.js.map