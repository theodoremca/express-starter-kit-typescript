"use strict";
// import {Schema, Document, model} from "mongoose";
//
//
// export interface DriverDocument extends Document {
//   uid: string;
//   govId:string;
//   govIdStatus:boolean;
//   license:string;
//   licenseStatus:string;
//   vehicle:string;
//   isAvailable:boolean;
//   isOnline:boolean;
//   location:string;
//   plate_number:string;
//   createdAt: Date;
//   updatedAt: Date;
// }
//
// const schema = new Schema({
//   uid: String,
//   govId: String,
//   govIdStatus: Boolean,
//   license: String,
//   licenseStatus: String,
//   vehicle: String,
//   isAvailable: Boolean,
//   isOnline: Boolean,
//   location: String,
//   plate_number: String,
// }, {timestamps: true});
//
// schema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
//
// const Model = model<DriverDocument>("Driver", schema);
//
// export default Model;
//# sourceMappingURL=driver.model.js.map