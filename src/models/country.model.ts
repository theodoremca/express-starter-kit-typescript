import mongoose, {Schema, Document} from "mongoose";


export interface CountryDocument extends Document {
  name: string;
  code: number;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  name: String,
  code: Number,
},
{timestamps: true}
);


/**
 *  Here we are creating and setting an id property and
 removing _id, __v, and the password hash which we do not need
 to send back to the client.
 */
schema.set("toJSON", {
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


const Model = mongoose.model<CountryDocument>("Country", schema);

export default Model;
