import {NextFunction, Request, Response} from "express-serve-static-core";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) =>{
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({status: false, message: err});
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({status: false, message: err.message});
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json(

        {
          status: false,
          message: "Token not valid",
        }
    );
  }

  // default to 500 server error
  return res.status(500).json({
    status: false,
    message: err.message,

  });
};
