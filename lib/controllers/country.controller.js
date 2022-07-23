"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const country_model_1 = __importDefault(require("./../models/country.model"));
const model_services_1 = require("../services/model.services");
const response_1 = require("../response");
const index = (req, res, next) => {
    return (0, model_services_1.indexService)(country_model_1.default)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.index = index;
//# sourceMappingURL=country.controller.js.map