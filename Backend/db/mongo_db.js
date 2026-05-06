import mongoose from "mongoose";

let conn1;

const connectDB = async () => {
  try {
    // 1. Replace 'YOUR_PASSWORD' with your actual password. 
    // 2. Replace 'your_database_name' with the actual DB name (e.g., 'test' or 'myApp').
    // If your password has special characters like @, use: encodeURIComponent('your@pass')
    const MONGO_URI = "mongodb+srv://manbirss9029_db_user:Akbardon007@cluster0.j6fvxhz.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=Cluster0";

    if (mongoose.connection.readyState >= 1) return;

    conn1 = await mongoose.connect(MONGO_URI);

    // Using .host or .db.databaseName is more reliable for logging
    console.log(`✅ MongoDB Connected: ${conn1.connection.host} / ${conn1.connection.db.databaseName}`);

    return { conn1 };
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);
    
    // Exit process with failure
    process.exit(1);
  }
};

export { connectDB };