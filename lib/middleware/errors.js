"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (typeof err === "string") {
        // custom application error
        return res.status(400).json({ status: false, message: err });
    }
    if (err.name === "ValidationError") {
        // mongoose validation error
        return res.status(400).json({ status: false, message: err.message });
    }
    if (err.name === "UnauthorizedError") {
        // jwt authentication error
        return res.status(401).json({
            status: false,
            message: "Token not valid",
        });
    }
    // default to 500 server error
    return res.status(500).json({
        status: false,
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errors.js.map