
import {Express} from "express";
import {getAuthUser, getUser, login, otpLogin, signUp, updateUser, verifyOTP} from "../controllers/user.controller";
import * as role from "../controllers/role.controller";
import * as notification from "../controllers/notification.controller";
import * as paymentHistory from "../controllers/paymentHistory.controller";
import * as message from "../controllers/message.controller";
import * as country from "../controllers/country.controller";


import {versionPrefix} from "../app";


export default (app: Express) => {
  app.get(versionPrefix +"/country" + "/all", country.index);
  app.get(versionPrefix +"/users" + "/auth", getAuthUser);

  app.post(versionPrefix +"/users" + "/login", login);
  app.post(versionPrefix +"/users" + "/signUp", signUp);
  app.post(versionPrefix +"/users" + "/otpLogin", otpLogin);
  app.post(versionPrefix +"/users" + "/verifyOTP", verifyOTP);
  app.post(versionPrefix +"/users" + "/update", updateUser);
  app.post(versionPrefix +"/users" + "/show", getUser);

  app.post(versionPrefix +"/role" + "/create", role.create);
  app.post(versionPrefix +"/role" + "/update", role.update);
  app.post(versionPrefix +"/role" + "/show", role.show);
  app.post(versionPrefix +"/role" + "/all", role.index);
  app.post(versionPrefix +"/role" + "/destroy", role.destroy);


  app.post(versionPrefix +"/notification" + "/creat", notification.create);
  app.post(versionPrefix +"/notification" + "/update", notification.update);
  app.post(versionPrefix +"/notification" + "/show", notification.show);
  app.post(versionPrefix +"/notification" + "/all", notification.index);
  app.post(versionPrefix +"/notification" + "/destroy", notification.destroy);

  app.post(versionPrefix +"/paymentHistory" + "/create", paymentHistory.create);
  app.post(versionPrefix +"/paymentHistory" + "/update", paymentHistory.update);
  app.post(versionPrefix +"/paymentHistory" + "/show", paymentHistory.show);
  app.post(versionPrefix +"/paymentHistory" + "/all", paymentHistory.index);
  app.post(versionPrefix +"/paymentHistory" + "/destroy", paymentHistory.destroy);


  app.post(versionPrefix +"/message" + "/create", message.create);
  app.post(versionPrefix +"/message" + "/update", message.update);
  app.post(versionPrefix +"/message" + "/show", message.show);
  app.post(versionPrefix +"/message" + "/all", message.index);
  app.post(versionPrefix +"/message" + "/destroy", message.destroy);

  app.post(versionPrefix +"/message" + "/create", message.create);
};
