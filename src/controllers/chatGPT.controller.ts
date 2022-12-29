import {NextFunction, Request, Response} from "express-serve-static-core";
import {sendSuccess} from "../response";

import fs, {ReadStream} from "fs";
import pdf from "pdf-parse";
import {chatService} from "../services/openAPIservice";

export const index = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files && !req.files!["cv"]) {
    res.status(400);
    res.end();
  }
  const cv: ReadStream = req.files!["cv"] as unknown as ReadStream;
  const cvPath: string = cv.path as string;
  const cvBuffer = fs.readFileSync(cvPath);
  const {position, beforePosition} = req.body;
  pdf(cvBuffer)
      .then((data) => data.text)
      .then((cvText) =>
        chatService(
            `${beforePosition ?? "Write me a cover letter."} ${
          position ? "For the position of " + position : ""
            }  below is my cv \n ${cvText ?? ""}`
        )
      )
      .then((result) => result.choices[0].text)
      .then((coverLetter) => sendSuccess(res, {coverLetter}, "successfull"))
      .catch(next);
};
