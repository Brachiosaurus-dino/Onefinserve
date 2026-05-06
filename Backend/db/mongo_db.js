import mongoose from "mongoose";

let conn1;
let conn2;

const connectDB = async () => {
  try {
    // First database
    conn1 = await mongoose.connect("mongodb://localhost:27017/database_oneFinServe");
    console.log(`MongoDB Connected: ${conn1.connection.name}`);
    

    // Second database
    conn2 = mongoose.createConnection("mongodb://localhost:27017/database_register_onefinserv");
    conn2.once("open", () => {
      console.log(`MongoDB Connected: ${conn2.name || "second DB"}`);
    });

    return { conn1, conn2 };
  } catch (error) {
    console.error("Internal Error 500", error);
    process.exit(1);
  }
};

export { connectDB };