import {Schema, Document, model, Model} from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  role: string;
  phone: string;
  password: string;
  country:string;
  displayName: string,
  email: string;
  address:string;
  profilePic:string;
  gender:string;
  status:boolean;
  bio:string;
  dob:string;
  createdAt: Date;
  updatedAt: Date;
  emailStatus:boolean;
  encryptPassword: (password: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
  findByUsername: (username: string) => Promise<UserDocument>;
}

const UserSchema = new Schema({
  role: {
    type: Number,
    default: 0,
  },
  phone: {
    type: String,
    // required: true,
  },
  email: String,
  country: String,
  address: String,
  gender: String,
  profilePic: String,
  displayName: String,
  bio: String,
  password: String,
  emailStatus: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  dob: String,
}, {timestamps: true});

/**
 *  Here we are creating and setting an id property and
    removing _id, __v, and the password hash which we do not need
    to send back to the client.
 */
UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

/**
 * 1. The userSchema.plugin(uniqueValidator) method won’t let duplicate email id to be stored in the database.
 * 2. The unique: true property in email schema does the internal optimization to enhance the performance.
 */
UserSchema.plugin(mongooseUniqueValidator, {message: "Email already in use."});

UserSchema.methods.encryptPassword = async function(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.findByUsername = function(username: string) {
  return this.findOne({username});
};


const User = model<UserDocument, UserModel>("User", UserSchema);

export default User;
