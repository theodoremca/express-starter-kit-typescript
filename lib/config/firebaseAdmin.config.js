"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// import fbAdmin, {ServiceAccount} from "firebase-admin";
// import serviceAccount from "./serviceAccount.json";
// export const admin = fbAdmin.initializeApp({
//   credential: fbAdmin.credential.cert(serviceAccount as ServiceAccount),
// });
exports.admin = firebase_admin_1.default.initializeApp();
//import fbAdmin, {ServiceAccount} from "firebase-admin";
//import serviceAccount from "./serviceAccount.json";
//
//export const admin = fbAdmin.initializeApp({
//    credential: fbAdmin.credential.cert(serviceAccount as ServiceAccount),
//});
//# sourceMappingURL=firebaseAdmin.config.js.map