import unless from "express-unless";
import connectToDb from "./config/db.config";
import {authenticateToken,
} from "./middleware/auth";
import express from "express";
import routes from "./routes";

import {errorHandler} from "./middleware/errors";

import formData from "express-form-data";
import os from "os";
import {fileLinkOnBodyParser} from "./middleware/fileLinkOnBodyParser";

export const versionPrefix = "/api/v1";
export const devMode = true;
const app = express();

const {STAGING_DB, DEV_DB} = process.env;
if (!STAGING_DB || !DEV_DB) {
  console.log("=======⚠️⚠️⚠️ dev connection string not specified⚠️⚠️⚠️⚠️ ===========");
}
console.log({STAGING_DB, DEV_DB});

connectToDb(""+(DEV_DB|| "mongodb://localhost:27017")).then(()=>{
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  const options = {
    uploadDir: os.tmpdir(),
    autoClean: true,
  };
  // parse data with connect-multiparty.
  app.use(formData.parse(options));
  // delete from the request all empty files (size == 0)
  app.use(formData.format());
  // change the file objects to fs.ReadStream
  app.use(formData.stream());
  // union the body and the files
  app.use(formData.union());

  app.get("/", (req, res )=>{
    console.info("Get / hello success");
    res.send("Welcome Theodoremca Starter-kit");
  });
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // eslint-disablebrew tap heroku/brew && brew install heroku-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(unless(authenticateToken, {
    path: [
      {url: versionPrefix + "/users/login", methods: ["POST"]},
      {url: versionPrefix + "/users/register", methods: ["POST"]},
      {url: versionPrefix + "/users/otpLogin", methods: ["POST"]},
      {url: versionPrefix + "/users/verifyOTP", methods: ["POST"]},
      {url: versionPrefix + "/chatGPT/index", methods: ["POST"]},
    ],
  }));


  const status = "Ready to Go!";
  const port = process.env.PORT || 4000;
  const url = "http://localhost:"+port;


  console.log({status, url, vUrl: url+versionPrefix});
  // eslint-disablebrew tap heroku/brew && brew install heroku-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(unless(fileLinkOnBodyParser, {
    path: [
      {url: versionPrefix + "/chatGPT/index", methods: ["POST"]},
    ],
  }));
  // app.use(fileLinkOnBodyParser);
  routes(app);

  // // middleware for error responses
  app.use(errorHandler);

  // listen for requests
  app.listen(port);
});

export default app;
