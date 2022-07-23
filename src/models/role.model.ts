import mongoose, {Schema, Document} from "mongoose";


export interface RoleDocument extends Document {
  name: string;
  value:number;
  uid:string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  name: String,
  value: Number,
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

const Model = mongoose.model<RoleDocument>("Role", schema);

export default Model;
