// import mongoose, {Schema, Document} from "mongoose";
//
//
// export interface WalletDocument extends Document {
//   uid:string;
//   amount:number;
//   createdAt: Date;
//   updatedAt: Date;
// }
//
// const schema = new Schema({
//   uid: {type: String, required: true},
//   amount: Number,
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
// const Model = mongoose.model<WalletDocument>("Wallet", schema);
//
// export default Model;
