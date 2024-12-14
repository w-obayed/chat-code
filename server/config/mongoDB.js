import mongoose from "mongoose";

// create mongodb connections
const mongoDBconnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_STRING);
    console.log(`mongodb connection successful`.bgMagenta.black);
  } catch (error) {
    console.log(`${error.message}`.bgRed.black);
  }
};

// export default
export default mongoDBconnect;
