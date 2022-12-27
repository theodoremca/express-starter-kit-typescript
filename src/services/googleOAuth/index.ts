/* eslint-disable camelcase */
import {google} from "googleapis";
import {credentials} from "./cred";


const redirect_url = "https://developers.google.com/oauthplayground";
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/userinfo.email",
];

const {client_secret, client_id} = credentials.web;
// const redirect_url = `${config.baseUrl}add-google-calendar`;

export const oAuthUrlGen = () => {
  return new Promise((resolve, reject) => {
    try {
      const oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_url,
      );
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent",
      });
      // console.log("Authorize this app by visiting this url:", authUrl);
      return resolve(authUrl);
    } catch (error:any) {
      reject(error?.message);
    }
  });
};

export const getOAUthToken = () => {
  return new Promise( async (resolve, reject) => {
    try {
      const data = req.body;
      const code = data.code;
      const id = data.userId;
      // console.log(id, code);
      const oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_url,
      );
      oAuth2Client.on("tokens", async (token) => {
        const tokenInfo = await oAuth2Client.getTokenInfo(token.access_token);
        const email = tokenInfo.email;
        const sub = tokenInfo.sub;
        if (token.refresh_token) {
          Object.assign(data, {
            timestamp: Date.now(),
            token: token.refresh_token,
            email: email,
            sub: sub,
            type: "google",
          });
        }
        resolve.send(data);
      });
      const getToken = await oAuth2Client
          .getToken(code)
          .catch((error)=> reject(error.message));
      // .catch(error=>console.log(error));
      oAuth2Client.setCredentials(getToken);
    } catch (error) {
      reject(error.message);
    }
  });
};


// const getGoogleEvents = async (req, res) => {
//   console.log("\n\n\n\n\n\ Called google Events");
//   try {
//     const allEvents = [];
//     const data = req.body;
//     const id = data.userId;
//     console.log({id});
//     // if (userTokens.empty) return res.status(404)
//     //    .send("Token with the given ID not found");
//     const tokens = await firestore.collection("users")
//         .doc(id).collection("tokens").where("type", "==", "google");
//     const userTokens = await tokens.get();
//     if (userTokens.empty) return res.status(200).send({allEvents});
//     const tokenLength = userTokens.size;
//     let loopCount = 0;
//     await userTokens.forEach(async (doc) => {
//       const oAuth2Client = new google.auth.OAuth2(
//           client_id,
//           client_secret,
//           redirect_url(req, "google"),
//       );
//       const token = await doc.data().token;
//       const sub = await doc.data().sub;
//       // console.log(type)
//       const formattedToken = {
//         refresh_token: token,
//         // access_token: token,
//       };
//       try {
//         oAuth2Client.setCredentials(formattedToken);
//       } catch (error) {
//         console.log({cred: error});
//       }
//       await listEvents(oAuth2Client, google, tokens, sub).then((events) => {
//         if (events.length) allEvents.push(...events);
//         loopCount++;
//         // if (loopCount === tokenLength)console.log({googleEvents:allEvents});
//         // eslint-disable-next-line max-len
//         if (loopCount === tokenLength) res.status(200).send({googleEvents: allEvents});
//       // }).catch(() => {});
//       }).catch((err) => console.log("The API returned an error: " + err));
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send(error.message);
//   }
// };
