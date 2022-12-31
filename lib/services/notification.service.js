"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioSmsService = void 0;
const twilio_1 = __importDefault(require("twilio"));
const app_1 = require("../app");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
// console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN , TWILIO_PHONE_NUMBER)
const twilioSmsService = (to, message) => {
    // console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);
    return new Promise(((resolve, reject) => {
        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
            console.log("could not resolve credentails");
            resolve(true);
            return;
        }
        if (app_1.devMode)
            return resolve(true);
        if (app_1.devMode)
            console.log("=======⚠️⚠️⚠️Dev mode is on you won't receive twilio Services ⚠️⚠️⚠️========");
        const client = (0, twilio_1.default)(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        return client.messages
            .create({
            to,
            from: TWILIO_PHONE_NUMBER,
            body: message,
        })
            .then(() => resolve(true)).catch((e) => reject(new Error("twilio error :" + e)));
    }));
};
exports.twilioSmsService = twilioSmsService;
//# sourceMappingURL=notification.service.js.map