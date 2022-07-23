import {createHmac} from "crypto";
import {generate} from "otp-generator";
import User, {UserDocument} from "../models/user.model";
import {config} from "dotenv";
import {generateAccessToken} from "../middleware/auth";


config();

const {CRYPTO_KEY} = process.env;

export const loginService = (email:string, password:string) =>{
  return new Promise((resolve: (result: (UserDocument & { _id: UserDocument["_id"] }) | null) => void, reject) => {
    User.findOne({email}).then((response) => {
      if (response?.email) console.log({response});
      if (!(response?.email)) return reject(new Error("User doesn't exist"));
      response.validatePassword(password).then((isValid:boolean)=>{
        if (isValid) {
          const token = generateAccessToken(response);
          // @ts-ignore
          return resolve({...response?.toJSON(), token});
        } else {
          return reject(new Error( "Invalid Username/Password!"));
        }
      }).catch((error) => reject(error));
    }).catch((error) => reject(error));
  });
};


export const signUpService = (email:string, password:string) =>{
  return new Promise((resolve: (result: (UserDocument & { _id: UserDocument["_id"] }) | null) => void, reject) => {
    const user:UserDocument = new User({
      email,
      password,
    });
    user.encryptPassword(password).then(( hash:string) => {
      user.password = hash;
      user.save()
          .then((response) => {
            const token = generateAccessToken(response);
            // @ts-ignore
            return resolve({...response?.toJSON(), token,
            });
          })
          .catch((error) => {
            return reject(error);
          });
    });
  });
};

export const createOrGetUserPhoneAuth = (phone: string) => {
  return new Promise((resolve: (result: (UserDocument & { _id: UserDocument["_id"] }) | null) => void, reject) => {
    User.findOne({phone})
        .then((response) => {
          if (response?.phone) console.log({response});
          if (response?.phone) {
            const token = generateAccessToken(response);
            // @ts-ignore
            return resolve({...response?.toJSON(), token,
            });
          }
          const user = new User({phone});
          return user
              .save()
              .then((response) => {
                const token = generateAccessToken(response);
                // @ts-ignore
                return resolve({...response?.toJSON(), token,
                });
              })
              .catch((error) => {
                return reject(error);
              });
        })
        .catch((error) => {
          reject(error);
        });
  });
};

interface NewOTPParams {
  phone: string;
  expirationInMinutes?: number|undefined;
}

export interface CreateOTPResult {
    otp: string;
    hashCode: string;
    phone: string;
    otpMessage?: string;
}

// eslint-disable-next-line require-jsdoc
class Options {
  // eslint-disable-next-line require-jsdoc
  constructor(
      digits:boolean|undefined,
      lowerCaseAlphabets:boolean|undefined,
      upperCaseAlphabets:boolean|undefined,
      specialChars:boolean|undefined,
  ) {
    this.digits = digits;
    this.lowerCaseAlphabets = lowerCaseAlphabets;
    this.upperCaseAlphabets = upperCaseAlphabets;
    this.specialChars = specialChars;
  }
  digits?: boolean;
  lowerCaseAlphabets?: boolean;
  upperCaseAlphabets?: boolean;
  specialChars?: boolean;
}

export const createNewOTP = (params: NewOTPParams) => {
  return new Promise((resolve: (result: CreateOTPResult) => void, reject) => {
    // Generate a 4 digit numeric OTP
    const options = new Options(true, false, false, false);
    try {
      const otp = generate(4, options);
      const phone: string = params.phone;
      const ttl = (params.expirationInMinutes??3) * 60 * 1000; // 5 Minutes in miliseconds
      const expires = Date.now() + ttl; // timestamp to 5 minutes in the future
      const data = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
      const hash = createHmac(
          "sha256",
          CRYPTO_KEY??"secret_key"
      ).update(data).digest("hex"); // creating SHA256 hash of the data
      const hashCode = `${hash}.${expires}`; // Hash.expires, format to send to the user
      // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
      // sendSMS(phone, `Your OTP is ${otp}. it will expire in 5 minutes`);
      const otpMessage = `Dear Customer, ${otp} is the One Time Password ( OTP ) for your login. it will expire in ${params.expirationInMinutes} minutes`;
      console.log({otp});

      resolve({otp, hashCode, phone, otpMessage});
    } catch (err) {
      reject(err);
    }
  });
};


export const verifyOTPService = (params:CreateOTPResult) => {
  // Separate Hash value and expires from the hash returned from the user
  return new Promise((resolve:(result: string) => void, reject) => {
    const [hashValue, expires] = params.hashCode.split(".");

    // Check if expiry time has passed
    const now = Date.now();
    if (now > parseInt(expires)) reject( new Error("OTP Expired"));
    const data = `${params.phone}.${params.otp}.${expires}`;
    const newCalculatedHash = createHmac("sha256", CRYPTO_KEY??"secret_key")
        .update(data)
        .digest("hex");
    if (newCalculatedHash === hashValue) {
      resolve(params.phone);
    }
    reject( new Error("Invalid OTP"));
  });
};


export const authUserService = (id: string) => {
  return new Promise((resolve: (result: UserDocument & {_id: any}) => void, reject) => {
    User.findById(id)
        .then((response) => {
          if (response?.phone) console.log({response});
          if (response) return resolve(response);
          return reject(new Error("No Record"));
        })
        .catch((error) => {
          reject(error);
        });
  });
};


export const updateAuthUserService = (id:string, data:any) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, data, {new: true})
        .then((response) =>
          resolve(response)
        )
        .catch((error:any) => {
          reject(error);
        });
  });
};
