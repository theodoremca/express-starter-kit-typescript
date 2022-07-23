import mongoose, {Schema, Document} from "mongoose";


export interface MessageDocument extends Document {
    image:string;
    to:string;
    from:string;
    message:string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  image: String,
  to: String,
  from: String,
  message: String,
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


const Model = mongoose.model<MessageDocument>("Message", schema);

export default Model;
