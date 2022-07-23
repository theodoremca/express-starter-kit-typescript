import {ReadStream} from "fs";

import {admin} from "../config/firebaseAdmin.config";
import {v4} from "uuid";
const defaultStorage = admin.storage();

const {FB_STORAGE_BASE_PATH} = process.env;
const bucket = defaultStorage.bucket(FB_STORAGE_BASE_PATH);
// console.log({FIREBASE_STORAGE_BASE_PATH})

export const uploadImageToFbStorage = async (file:ReadStream, name:string ) => {
  return new Promise( (resolve, reject) => {
    if (!file) {
      return reject(new Error("No image file"));
    }

    bucket.upload(file.path.toString(), {
      public: true,
      destination: `/uploads/${name}s/${name}.png`,
      metadata: {
        firebaseStorageDownloadTokens: v4(),
      },
    })
        .then((result)=>resolve(result[0].metadata.mediaLink))
        .catch((error)=>reject(error.message));
  });
};

