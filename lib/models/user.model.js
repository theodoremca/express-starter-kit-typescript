"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const UserSchema = new mongoose_1.Schema({
    role: {
        type: Number,
        default: 0,
    },
    phone: {
        type: String,
        required: true,
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
}, { timestamps: true });
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
UserSchema.plugin(mongoose_unique_validator_1.default, { message: "Email already in use." });
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map