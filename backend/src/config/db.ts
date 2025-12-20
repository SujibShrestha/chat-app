import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("DB connected sucessfully");
  } catch (error) {
    console.log("Error while connection to DB");
    process.exit(1);
  }
};

export default connectDB;
