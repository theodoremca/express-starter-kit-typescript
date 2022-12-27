
import {Express} from "express";
import {getAuthUser, getUser, login, otpLogin, signUp, updateUser, verifyOTP} from "../controllers/user.controller";
import * as role from "../controllers/role.controller";
import * as country from "../controllers/country.controller";


import {versionPrefix} from "../app";


export default (app: Express) => {
  app.get(versionPrefix +"/country" + "/all", country.index);
  app.get(versionPrefix +"/users" + "/auth", getAuthUser);

  app.post(versionPrefix +"/users" + "/login", login);
  app.post(versionPrefix +"/users" + "/register", signUp);
  app.post(versionPrefix +"/users" + "/otpLogin", otpLogin);
  app.post(versionPrefix +"/users" + "/verifyOTP", verifyOTP);
  app.post(versionPrefix +"/users" + "/update", updateUser);
  app.post(versionPrefix +"/users" + "/show", getUser);

  app.post(versionPrefix +"/role" + "/create", role.create);
  app.post(versionPrefix +"/role" + "/update", role.update);
  app.post(versionPrefix +"/role" + "/show", role.show);
  app.post(versionPrefix +"/role" + "/all", role.index);
  app.post(versionPrefix +"/role" + "/destroy", role.destroy);
};
