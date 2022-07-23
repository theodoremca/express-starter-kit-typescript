"use strict";
// import {Schema, Document, model} from "mongoose";
//
//
// export interface VehicleDocument extends Document {
//   name: string;
//   plate_number:string;
//   images:string[];
//   year:number;
//   color:string;
//   isAmbulance:boolean;
//   uid:string;
//   createdAt: Date;
//   updatedAt: Date;
// }
//
// const schema = new Schema({
//   name: String,
//   plate_number: {type: String, required: true},
//   images: Array,
//   year: Number,
//   color: String,
//   uid: {type: String, required: true},
//   isAmbulance: Boolean,
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
// const Model = model<VehicleDocument>("Vehicle", schema);
//
// export default Model;
//# sourceMappingURL=vehicle.model.js.map