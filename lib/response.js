"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = function (res, data, message) {
    const result = {
        status: true,
        data: data,
        message: message,
    };
    return res.status(200).json(result);
};
exports.sendSuccess = sendSuccess;
const sendError = function (res, error, errorMessage, status = 404) {
    const result = {
        status: false,
        message: error,
    };
    if (errorMessage.length) {
        result.data = errorMessage;
    }
    return res.status(status).json(result);
};
exports.sendError = sendError;
//# sourceMappingURL=response.js.map