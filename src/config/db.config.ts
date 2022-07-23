import mongoose, {ConnectOptions} from "mongoose";

mongoose.Promise = global.Promise;
const connectToDb = (dbUrl:string) => mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions )
    .then(() => {
      console.info("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
      process.exit(1);
    });

export default connectToDb;
