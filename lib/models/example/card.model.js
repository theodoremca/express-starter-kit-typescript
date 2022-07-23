"use strict";
// import mongoose, {Schema, Document} from "mongoose";
//
//
// export interface CardDocument extends Document {
//   uid:string;
//   number:number;
//   year:number;
//   month:number;
//   day:number;
//   cvc:number;
//   createdAt: Date;
//   updatedAt: Date;
// }
//
// const schema = new Schema({
//   uid: {type: String, required: true},
//   number: Number,
//   year: Number,
//   month: Number,
//   day: Number,
//   cvc: Number,
// },
// {timestamps: true}
// );
//
// schema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
//
// const Model = mongoose.model<CardDocument>("Card", schema);
//
// export default Model;
//# sourceMappingURL=card.model.js.map