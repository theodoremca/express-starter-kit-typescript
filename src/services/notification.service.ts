import twilio from "twilio";
import {devMode} from "../app";


const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER} = process.env;
// console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN , TWILIO_PHONE_NUMBER)

const client = (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) : undefined;
export const twilioSmsService = (to:string, message:string) => {
  return new Promise(((resolve: (result:boolean) => void, reject) => {
    if (devMode) return resolve(false);
    if (!client) return resolve(false);
    return client.messages
        .create({
          to,
          from: TWILIO_PHONE_NUMBER,
          body: message,
        })
        .then(()=>resolve(true)).catch((e:string) => reject( new Error("twilio error :" + e)));
  }));
};
