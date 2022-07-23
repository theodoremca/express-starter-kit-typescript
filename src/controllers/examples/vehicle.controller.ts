//
//
// import Model from "./../models/vehicle.model";
// import {NextFunction, Request, Response} from "express-serve-static-core";
// import {createService, destroyService, indexService, showService, updateService} from "../services/model.services";
// import {sendSuccess} from "../response";
//
//
// export const index = (req: Request, res: Response, next: NextFunction) => {
//   return indexService(Model)
//       .then((results:any) => sendSuccess(res, results, "success"))
//       .catch(next);
// };
//
// export const update = (req: Request, res: Response, next: NextFunction) => {
//   return updateService(Model, req.body.id, req.body)
//       .then((results:any) => sendSuccess(res, results, "success"))
//       .catch(next);
// };
// export const create = (req: Request, res: Response, next: NextFunction) => {
//   return createService(Model, req.body)
//       .then((results:any) => sendSuccess(res, results, "success"))
//       .catch(next);
// };
//
// export const show = (req: Request, res: Response, next: NextFunction) => {
//   return showService(Model, req.body.id)
//       .then((results:any) => sendSuccess(res, results, "success"))
//       .catch(next);
// };
//
//
// export const destroy = (req: Request, res: Response, next: NextFunction) => {
//   return destroyService(Model, req.body.id)
//       .then((results:any) => sendSuccess(res, results, "success"))
//       .catch(next);
// };
//
