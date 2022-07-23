import jwt, {SignOptions, JwtPayload} from "jsonwebtoken";

import {NextFunction, Request, Response} from "express-serve-static-core";
import {config} from "dotenv";
import {authUserService} from "../services/user.services";


config();

export interface IGetUserAuthInfoRequest extends Request {
    user: string | JwtPayload;
}


export const authenticateToken = (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(200).send({
      message: "Unauthorized Request",
      status: false,
      data: null,
    });
  }
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET as string);
    // @ts-ignore
    if (user?.data?.id) {
      // @ts-ignore
      return authUserService(user.data.id).then((user)=>{
        req.user = user;
        next();
      }).catch(()=>res.status(403).send({
        message: "Unknown user",
        status: false,
        data: null,
      }));
    }
    return res.status(403).send({
      message: "Invalid user",
      status: false,
      data: null,
    });
  } catch (e: any) {
    const message = "Unauthorized user";
    return res.status(403).send({
      message,
      status: false,
      data: null,
    });
  }
};


export const generateAccessToken = (ref: any) =>
  jwt.sign({data: ref},
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "7d",
          audience: "zeus",
          subject: "udun",
        } as SignOptions);

