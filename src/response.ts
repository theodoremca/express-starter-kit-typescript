/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response} from "express-serve-static-core";

interface Result {
    status: boolean,
    message: string,
    data?:any
}

export const sendSuccess = function(res:Response, data:any, message:any) {
  const result:Result = {
    status: true,
    data: data,
    message: message,
  };
  return res.status(200).json(result);
};
export const sendError =
 function(res:Response, error:any, errorMessage:string, status=404) {
   const result:Result = {
     status: false,
     message: error,
   };
   if (errorMessage.length) {
     result.data = errorMessage;
   }
   return res.status(status).json(result);
 };
