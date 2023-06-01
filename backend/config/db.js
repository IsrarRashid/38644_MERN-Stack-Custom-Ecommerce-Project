import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`database connected on host ${conn.connection.host}`.bgMagenta);
  } catch (error) {
    console.log("error in connection");
  }
};

export default dbConnection;
