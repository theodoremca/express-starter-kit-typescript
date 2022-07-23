import {
  authUserService,
  createNewOTP,
  createOrGetUserPhoneAuth, loginService, signUpService,
  updateAuthUserService,
  verifyOTPService,
} from "../services/user.services";
import {NextFunction, Request, Response} from "express-serve-static-core";
import User from "../models/user.model";
import {twilioSmsService} from "../services/notification.service";
import {indexService} from "../services/model.services";
import {sendSuccess} from "../response";


export const index = (req: Request, res: Response, next: NextFunction) => {
  return indexService(User)
      .then((results:any) => sendSuccess(res, results, "success"))
      .catch(next);
};
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  return updateAuthUserService(req.user.id, req.body)
      .then((results:any) => sendSuccess(res, results, "success"))
      .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.body.id)
      .then((results:any) => sendSuccess(res, results, "success"))
      .catch(next);
};

export const getAuthUser = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  authUserService(req.user.id).then((results:any) => sendSuccess(res, results, "success"));
};


export const otpLogin = (req: Request, res: Response, next: NextFunction) => {
  return createNewOTP({phone: req.body.phone, expirationInMinutes: 5})
      .then((result) => twilioSmsService(
          result.phone,
          result.otpMessage ?? result.otp)
          .then((results:any) => sendSuccess(res, {hashCode: result.hashCode, smsService: results}, "success"))
          .catch(next)
      ).catch(next);
};

export const verifyOTP = (req: Request, res: Response, next: NextFunction) => {
  return verifyOTPService({...req.body}).then((phone) => {
    return createOrGetUserPhoneAuth(phone)
        .then((results:any) => sendSuccess(res, results, "success"))
        .catch(next);
  }).catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  return loginService( req.body.email, req.body.password).then((results:any) => sendSuccess(res, results, "success"))
      .catch(next);
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  return signUpService(req.body.email, req.body.password)
      .then((results:any) => sendSuccess(res, results, "success"))
      .catch(next);
};


