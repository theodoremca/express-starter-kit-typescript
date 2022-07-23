"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = exports.destroyService = exports.createService = exports.showService = exports.indexService = void 0;
const indexService = (Model) => {
    return new Promise((resolve, reject) => {
        // let builder = null;
        Model.find()
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.indexService = indexService;
const showService = (Model, id) => {
    return new Promise((resolve, reject) => {
        Model.findById(id)
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.showService = showService;
const createService = (Model, data) => {
    return new Promise((resolve, reject) => {
        const model = new Model(data);
        model
            .save()
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.createService = createService;
const destroyService = (Model, id) => {
    return new Promise((resolve, reject) => {
        Model.findByIdAndDelete(id)
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.destroyService = destroyService;
const updateService = (Model, id, data) => {
    return new Promise((resolve, reject) => {
        Model.findByIdAndUpdate(id, data, { new: true })
            .then((response) => resolve(response))
            .catch((error) => {
            reject(error);
        });
    });
};
exports.updateService = updateService;
//# sourceMappingURL=model.services.js.map