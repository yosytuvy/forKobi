import { connect } from "mongoose";
import "dotenv/config";

const URL = process.env.MONGODB_URI;

const connectionToDb = async () => {
  try {
    await connect(URL as string);
    return "connected to mongoDB";
  } catch (error) {
    return Promise.reject(`An error accrued while connecting to DB  ${error}`);
  }
};

export default connectionToDb;
