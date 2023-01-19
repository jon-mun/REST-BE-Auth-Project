import mongoose from "mongoose";

mongoose.set("strictQuery", false);

async function mongoConnect() {
  try {
    if (process.env.MONGO_URI === null) {
      throw new Error("Mongo connection string is null!");
    }

    mongoose.connect(process.env.MONGO_URI as string);
  } catch (error: unknown) {
    console.log(getErrorMessage(error));
    process.exit(-1);
  }
}

export default mongoConnect;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
