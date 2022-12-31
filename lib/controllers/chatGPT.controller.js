"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const response_1 = require("../response");
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const openAPIservice_1 = require("../services/openAPIservice");
const index = (req, res, next) => {
    if (!req.files && !req.files["cv"]) {
        res.status(400);
        res.end();
    }
    const cv = req.files["cv"];
    const cvPath = cv.path;
    const cvBuffer = fs_1.default.readFileSync(cvPath);
    const { position, beforePosition } = req.body;
    (0, pdf_parse_1.default)(cvBuffer)
        .then((data) => data.text)
        .then((cvText) => (0, openAPIservice_1.chatService)(`${beforePosition !== null && beforePosition !== void 0 ? beforePosition : "Write me a cover letter."} ${position ? "For the position of " + position : ""}  below is my cv \n ${cvText !== null && cvText !== void 0 ? cvText : ""}`))
        .then((result) => result.choices[0].text)
        .then((coverLetter) => (0, response_1.sendSuccess)(res, { coverLetter }, "successfull"))
        .catch(next);
};
exports.index = index;
//# sourceMappingURL=chatGPT.controller.js.map