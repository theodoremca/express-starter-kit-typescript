import twilio from "twilio";
import {devMode} from "../app";


const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER} = process.env;
// console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN , TWILIO_PHONE_NUMBER)


export const twilioSmsService = (to:string, message:string) => {
  // console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);
  return new Promise(((resolve: (result:boolean) => void, reject) => {
    if (!TWILIO_ACCOUNT_SID||!TWILIO_AUTH_TOKEN||!TWILIO_PHONE_NUMBER) {
      console.log("could not resolve credentails");
      resolve(true);
      return;
    }
    if (devMode) return resolve(true);
    if (devMode) console.log("=======⚠️⚠️⚠️Dev mode is on you won't receive twilio Services ⚠️⚠️⚠️========");

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    return client.messages
        .create({
          to,
          from: TWILIO_PHONE_NUMBER,
          body: message,
        })
        .then(()=>resolve(true)).catch((e:string) => reject( new Error("twilio error :" + e)));
  }));
};
