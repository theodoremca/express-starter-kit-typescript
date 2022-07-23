import fbAdmin from "firebase-admin";
// import fbAdmin, {ServiceAccount} from "firebase-admin";
// import serviceAccount from "./serviceAccount.json";

// export const admin = fbAdmin.initializeApp({
//   credential: fbAdmin.credential.cert(serviceAccount as ServiceAccount),
// });

export const admin = fbAdmin.initializeApp();
