"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToFbStorage = void 0;
const firebaseAdmin_config_1 = require("../config/firebaseAdmin.config");
const uuid_1 = require("uuid");
const defaultStorage = firebaseAdmin_config_1.admin.storage();
const { FB_STORAGE_BASE_PATH } = process.env;
const bucket = defaultStorage.bucket(FB_STORAGE_BASE_PATH);
// console.log({FIREBASE_STORAGE_BASE_PATH})
const uploadImageToFbStorage = async (file, name) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error("No image file"));
        }
        bucket.upload(file.path.toString(), {
            public: true,
            destination: `/uploads/${name}s/${name}.png`,
            metadata: {
                firebaseStorageDownloadTokens: (0, uuid_1.v4)(),
            },
        })
            .then((result) => resolve(result[0].metadata.mediaLink))
            .catch((error) => reject(error.message));
    });
};
exports.uploadImageToFbStorage = uploadImageToFbStorage;
//# sourceMappingURL=google.js.map