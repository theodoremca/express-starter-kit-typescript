"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = exports.verifyOTP = exports.otpLogin = exports.getAuthUser = exports.getUser = exports.updateUser = exports.index = void 0;
const user_services_1 = require("../services/user.services");
const user_model_1 = __importDefault(require("../models/user.model"));
const notification_service_1 = require("../services/notification.service");
const model_services_1 = require("../services/model.services");
const response_1 = require("../response");
const index = (req, res, next) => {
    return (0, model_services_1.indexService)(user_model_1.default)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.index = index;
const updateUser = (req, res, next) => {
    // @ts-ignore
    return (0, user_services_1.updateAuthUserService)(req.user.id, req.body)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.updateUser = updateUser;
const getUser = (req, res, next) => {
    user_model_1.default.findById(req.body.id)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.getUser = getUser;
const getAuthUser = (req, res, next) => {
    // @ts-ignore
    (0, user_services_1.authUserService)(req.user.id).then((results) => (0, response_1.sendSuccess)(res, results, "success"));
};
exports.getAuthUser = getAuthUser;
const otpLogin = (req, res, next) => {
    return (0, user_services_1.createNewOTP)({ phone: req.body.phone, expirationInMinutes: 5 })
        .then((result) => {
        var _a;
        return (0, notification_service_1.twilioSmsService)(result.phone, (_a = result.otpMessage) !== null && _a !== void 0 ? _a : result.otp)
            .then((results) => (0, response_1.sendSuccess)(res, { hashCode: result.hashCode, smsService: results }, "success"))
            .catch(next);
    }).catch(next);
};
exports.otpLogin = otpLogin;
const verifyOTP = (req, res, next) => {
    return (0, user_services_1.verifyOTPService)(Object.assign({}, req.body)).then((phone) => {
        return (0, user_services_1.createOrGetUserPhoneAuth)(phone)
            .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
            .catch(next);
    }).catch(next);
};
exports.verifyOTP = verifyOTP;
const login = (req, res, next) => {
    return (0, user_services_1.loginService)(req.body.email, req.body.password).then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.login = login;
const signUp = (req, res, next) => {
    return (0, user_services_1.signUpService)(req.body.email, req.body.password)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.signUp = signUp;
//# sourceMappingURL=user.controller.js.map