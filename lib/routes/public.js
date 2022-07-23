"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const app_1 = require("../app");
exports.default = (app) => {
    app.post(app_1.versionPrefix + "/users" + "/otpLogin", user_controller_1.otpLogin);
    app.post(app_1.versionPrefix + "/users" + "/verifyOTP", user_controller_1.verifyOTP);
    app.post(app_1.versionPrefix + "/users" + "/update", user_controller_1.updateUser);
    app.post(app_1.versionPrefix + "/users" + "/show", user_controller_1.getUser);
};
//# sourceMappingURL=public.js.map