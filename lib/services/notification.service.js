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
const client = (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) ? (0, twilio_1.default)(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) : undefined;
const twilioSmsService = (to, message) => {
    return new Promise(((resolve, reject) => {
        if (app_1.devMode)
            return resolve(false);
        if (!client)
            return resolve(false);
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