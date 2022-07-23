"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const role = __importStar(require("../controllers/role.controller"));
const notification = __importStar(require("../controllers/notification.controller"));
const paymentHistory = __importStar(require("../controllers/paymentHistory.controller"));
const message = __importStar(require("../controllers/message.controller"));
const country = __importStar(require("../controllers/country.controller"));
const app_1 = require("../app");
exports.default = (app) => {
    app.get(app_1.versionPrefix + "/country" + "/all", country.index);
    app.get(app_1.versionPrefix + "/users" + "/auth", user_controller_1.getAuthUser);
    app.post(app_1.versionPrefix + "/users" + "/otpLogin", user_controller_1.otpLogin);
    app.post(app_1.versionPrefix + "/users" + "/verifyOTP", user_controller_1.verifyOTP);
    app.post(app_1.versionPrefix + "/users" + "/update", user_controller_1.updateUser);
    app.post(app_1.versionPrefix + "/users" + "/show", user_controller_1.getUser);
    app.post(app_1.versionPrefix + "/role" + "/create", role.create);
    app.post(app_1.versionPrefix + "/role" + "/update", role.update);
    app.post(app_1.versionPrefix + "/role" + "/show", role.show);
    app.post(app_1.versionPrefix + "/role" + "/all", role.index);
    app.post(app_1.versionPrefix + "/role" + "/destroy", role.destroy);
    app.post(app_1.versionPrefix + "/notification" + "/creat", notification.create);
    app.post(app_1.versionPrefix + "/notification" + "/update", notification.update);
    app.post(app_1.versionPrefix + "/notification" + "/show", notification.show);
    app.post(app_1.versionPrefix + "/notification" + "/all", notification.index);
    app.post(app_1.versionPrefix + "/notification" + "/destroy", notification.destroy);
    app.post(app_1.versionPrefix + "/paymentHistory" + "/create", paymentHistory.create);
    app.post(app_1.versionPrefix + "/paymentHistory" + "/update", paymentHistory.update);
    app.post(app_1.versionPrefix + "/paymentHistory" + "/show", paymentHistory.show);
    app.post(app_1.versionPrefix + "/paymentHistory" + "/all", paymentHistory.index);
    app.post(app_1.versionPrefix + "/paymentHistory" + "/destroy", paymentHistory.destroy);
    app.post(app_1.versionPrefix + "/message" + "/create", message.create);
    app.post(app_1.versionPrefix + "/message" + "/update", message.update);
    app.post(app_1.versionPrefix + "/message" + "/show", message.show);
    app.post(app_1.versionPrefix + "/message" + "/all", message.index);
    app.post(app_1.versionPrefix + "/message" + "/destroy", message.destroy);
};
//# sourceMappingURL=index.js.map