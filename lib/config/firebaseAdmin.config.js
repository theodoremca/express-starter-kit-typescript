"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount_json_1 = __importDefault(require("./serviceAccount.json"));
const hasServiceAccount = (_a = serviceAccount_json_1.default.projectId) === null || _a === void 0 ? void 0 : _a.length;
if (!hasServiceAccount) {
    console.log("=======⚠️⚠️⚠️====Update serviceAccount.json to use firebase Services==⚠️⚠️====");
}
exports.admin = hasServiceAccount ? firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount_json_1.default),
}) : firebase_admin_1.default.initializeApp();
//# sourceMappingURL=firebaseAdmin.config.js.map