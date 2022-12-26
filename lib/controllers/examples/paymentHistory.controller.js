"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.show = exports.create = exports.update = exports.index = void 0;
const paymentHistory_model_1 = __importDefault(require("../../models/example/paymentHistory.model"));
const model_services_1 = require("../../services/model.services");
const response_1 = require("../../response");
const index = (req, res, next) => {
    return (0, model_services_1.indexService)(paymentHistory_model_1.default)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.index = index;
const update = (req, res, next) => {
    return (0, model_services_1.updateService)(paymentHistory_model_1.default, req.body.id, req.body)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.update = update;
const create = (req, res, next) => {
    return (0, model_services_1.createService)(paymentHistory_model_1.default, req.body)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.create = create;
const show = (req, res, next) => {
    return (0, model_services_1.showService)(paymentHistory_model_1.default, req.body.id)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.show = show;
const destroy = (req, res, next) => {
    return (0, model_services_1.destroyService)(paymentHistory_model_1.default, req.body.id)
        .then((results) => (0, response_1.sendSuccess)(res, results, "success"))
        .catch(next);
};
exports.destroy = destroy;
//# sourceMappingURL=paymentHistory.controller.js.map