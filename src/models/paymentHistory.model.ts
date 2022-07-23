import mongoose, {Document, Schema} from "mongoose";


export interface PaymentHistoryDocument extends Document {
    uid: string;
    status: boolean;
    type: number,
    price: number;
    trip: string;
    txId: string;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
  uid: {type: String, required: true},
  status: Boolean,
  type: Number,
  price: Number,
  trip: String,
  txId: String,
  amount: Number,
},
{timestamps: true}
);

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Model = mongoose.model<PaymentHistoryDocument>("PaymentHistory", schema);

export default Model;
