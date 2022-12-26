import fbAdmin, {ServiceAccount} from "firebase-admin";
import serviceAccount from "./serviceAccount.json";
const hasServiceAccount = (serviceAccount as ServiceAccount).projectId?.length;
if (!hasServiceAccount) {
  console.log("=======⚠️⚠️⚠️====Update serviceAccount.json to use firebase Services==⚠️⚠️====");
}
export const admin = hasServiceAccount? fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(serviceAccount as ServiceAccount),
}):fbAdmin.initializeApp();
