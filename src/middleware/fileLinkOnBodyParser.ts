import {NextFunction, Request, Response} from "express-serve-static-core";
import {uploadImageToFbStorage} from "../storage/google";


export const fileLinkOnBodyParser = (req: Request, res: Response, next: NextFunction) => {
  let uploadedLength = 0;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fileNames = Object.keys(req.files || {});
  if (fileNames.length === 0) next();

  fileNames.forEach(
      (name) => uploadImageToFbStorage(req.body[name], name)
          .then((url) => req.body[name] = url).then(() => {
            uploadedLength++;
            if (uploadedLength === fileNames.length) next();
          })
          .catch((err) => res.status(500).json({
            status: false,
            message: err.message,

          })));
};
