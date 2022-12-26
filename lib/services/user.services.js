"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthUserService = exports.authUserService = exports.verifyOTPService = exports.createNewOTP = exports.createOrGetUserPhoneAuth = exports.signUpService = exports.loginService = void 0;
const crypto_1 = require("crypto");
const otp_generator_1 = require("otp-generator");
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = require("dotenv");
const auth_1 = require("../middleware/auth");
(0, dotenv_1.config)();
const { CRYPTO_KEY } = process.env;
const loginService = (email, password) => {
    return new Promise((resolve, reject) => {
        user_model_1.default.findOne({ email }).then((response) => {
            if (response === null || response === void 0 ? void 0 : response.email)
                console.log({ response });
            if (!(response === null || response === void 0 ? void 0 : response.email))
                return reject(new Error("User doesn't exist"));
            response.validatePassword(password).then((isValid) => {
                if (isValid) {
                    const token = (0, auth_1.generateAccessToken)(response);
                    // @ts-ignore
                    return resolve(Object.assign(Object.assign({}, response === null || response === void 0 ? void 0 : response.toJSON()), { token }));
                }
                else {
                    return reject(new Error("Invalid Username/Password!"));
                }
            }).catch((error) => reject(error));
        }).catch((error) => reject(error));
    });
};
exports.loginService = loginService;
const signUpService = (email, password) => {
    return new Promise((resolve, reject) => {
        const user = new user_model_1.default({
            email,
            password,
        });
        user.encryptPassword(password).then((hash) => {
            user.password = hash;
            user.save()
                .then((response) => {
                const token = (0, auth_1.generateAccessToken)(response);
                // @ts-ignore
                return resolve(Object.assign(Object.assign({}, response === null || response === void 0 ? void 0 : response.toJSON()), { token }));
            })
                .catch((error) => {
                return reject(error);
            });
        });
    });
};
exports.signUpService = signUpService;
const createOrGetUserPhoneAuth = (phone) => {
    return new Promise((resolve, reject) => {
        user_model_1.default.findOne({ phone })
            .then((response) => {
            if (response === null || response === void 0 ? void 0 : response.phone)
                console.log({ response });
            if (response === null || response === void 0 ? void 0 : response.phone) {
                const token = (0, auth_1.generateAccessToken)(response);
                // @ts-ignore
                return resolve(Object.assign(Object.assign({}, response === null || response === void 0 ? void 0 : response.toJSON()), { token }));
            }
            const user = new user_model_1.default({ phone });
            return user
                .save()
                .then((response) => {
                const token = (0, auth_1.generateAccessToken)(response);
                // @ts-ignore
                return resolve(Object.assign(Object.assign({}, response === null || response === void 0 ? void 0 : response.toJSON()), { token }));
            })
                .catch((error) => {
                return reject(error);
            });
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.createOrGetUserPhoneAuth = createOrGetUserPhoneAuth;
// eslint-disable-next-line require-jsdoc
class Options {
    // eslint-disable-next-line require-jsdoc
    constructor(digits, lowerCaseAlphabets, upperCaseAlphabets, specialChars) {
        this.digits = digits;
        this.lowerCaseAlphabets = lowerCaseAlphabets;
        this.upperCaseAlphabets = upperCaseAlphabets;
        this.specialChars = specialChars;
    }
}
const createNewOTP = (params) => {
    return new Promise((resolve, reject) => {
        var _a;
        // Generate a 4 digit numeric OTP
        const options = new Options(true, false, false, false);
        try {
            const otp = (0, otp_generator_1.generate)(4, options);
            const phone = params.phone;
            const ttl = ((_a = params.expirationInMinutes) !== null && _a !== void 0 ? _a : 3) * 60 * 1000; // 5 Minutes in miliseconds
            const expires = Date.now() + ttl; // timestamp to 5 minutes in the future
            const data = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
            const hash = (0, crypto_1.createHmac)("sha256", CRYPTO_KEY !== null && CRYPTO_KEY !== void 0 ? CRYPTO_KEY : "secret_key").update(data).digest("hex"); // creating SHA256 hash of the data
            const hashCode = `${hash}.${expires}`; // Hash.expires, format to send to the user
            // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
            // sendSMS(phone, `Your OTP is ${otp}. it will expire in 5 minutes`);
            const otpMessage = `Dear Customer, ${otp} is the One Time Password ( OTP ) for your login. it will expire in ${params.expirationInMinutes} minutes`;
            console.log({ otp });
            resolve({ otp, hashCode, phone, otpMessage });
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.createNewOTP = createNewOTP;
const verifyOTPService = (params) => {
    // Separate Hash value and expires from the hash returned from the user
    return new Promise((resolve, reject) => {
        const [hashValue, expires] = params.hashCode.split(".");
        // Check if expiry time has passed
        const now = Date.now();
        if (now > parseInt(expires))
            reject(new Error("OTP Expired"));
        const data = `${params.phone}.${params.otp}.${expires}`;
        const newCalculatedHash = (0, crypto_1.createHmac)("sha256", CRYPTO_KEY !== null && CRYPTO_KEY !== void 0 ? CRYPTO_KEY : "secret_key")
            .update(data)
            .digest("hex");
        if (newCalculatedHash === hashValue) {
            resolve(params.phone);
        }
        reject(new Error("Invalid OTP"));
    });
};
exports.verifyOTPService = verifyOTPService;
const authUserService = (id) => {
    return new Promise((resolve, reject) => {
        user_model_1.default.findById(id)
            .then((response) => {
            if (response === null || response === void 0 ? void 0 : response.phone)
                console.log({ response });
            if (response)
                return resolve(response);
            return reject(new Error("No Record"));
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.authUserService = authUserService;
const updateAuthUserService = (id, data) => {
    return new Promise((resolve, reject) => {
        user_model_1.default.findByIdAndUpdate(id, data, { new: true })
            .then((response) => resolve(response))
            .catch((error) => {
            reject(error);
        });
    });
};
exports.updateAuthUserService = updateAuthUserService;
//# sourceMappingURL=user.services.js.map