

import Model from "./../models/country.model";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {indexService} from "../services/model.services";
import {sendSuccess} from "../response";

export const index = (req: Request, res: Response, next: NextFunction) => {
  return indexService(Model)
      .then((results:any) => sendSuccess(res, results, "success"))
      .catch(next);
};
