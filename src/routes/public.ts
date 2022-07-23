
import {Express} from "express";
import {getUser, otpLogin, updateUser, verifyOTP} from "../controllers/user.controller";
import {versionPrefix} from "../app";


export default (app: Express) => {
  app.post(versionPrefix +"/users" + "/otpLogin", otpLogin);
  app.post(versionPrefix +"/users" + "/verifyOTP", verifyOTP);
  app.post(versionPrefix +"/users" + "/update", updateUser);
  app.post(versionPrefix +"/users" + "/show", getUser);
};
