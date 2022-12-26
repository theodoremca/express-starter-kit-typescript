import mongoose, {Schema, Document} from "mongoose";


export interface NotificationDocument extends Document {
    type:number;
    title:string;
    message:string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  type: Number,
  title: String,
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


const Model = mongoose.model<NotificationDocument>("Notification", schema);

export default Model;
