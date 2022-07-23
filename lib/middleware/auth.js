"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const user_services_1 = require("../services/user.services");
(0, dotenv_1.config)();
const authenticateToken = (req, res, next) => {
    var _a;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(200).send({
            message: "Unauthorized Request",
            status: false,
            data: null,
        });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        // @ts-ignore
        if ((_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.id) {
            // @ts-ignore
            return (0, user_services_1.authUserService)(user.data.id).then((user) => {
                req.user = user;
                next();
            }).catch(() => res.status(403).send({
                message: "Unknown user",
                status: false,
                data: null,
            }));
        }
        return res.status(403).send({
            message: "Invalid user",
            status: false,
            data: null,
        });
    }
    catch (e) {
        const message = "Unauthorized user";
        return res.status(403).send({
            message,
            status: false,
            data: null,
        });
    }
};
exports.authenticateToken = authenticateToken;
const generateAccessToken = (ref) => jsonwebtoken_1.default.sign({ data: ref }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
    audience: "zeus",
    subject: "udun",
});
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=auth.js.map