import express from "express";
import { connectDB } from "./db/mongo_db.js";
import Kycrouter from "./routes/kyc_route.js";
import cors from "cors";
import signup_router from "./routes/signup_login_route.js";
import client_register from "./routes/client_register_route.js";
import getData from "./routes/getsData_route.js";
import { updateNAV } from "./Jobs/nav_updater.js";
import cron from "node-cron";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://onefinserv.in"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    
    // The crucial header for the loopback error
    res.header("Access-Control-Allow-Private-Network", "true");

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/api", client_register);
app.use("/api", Kycrouter);
app.use("/api", signup_router);
app.use("/api", getData);

app.get("/", (req, res) => {
  res.json("Server Running Perfectly");
});

// START SERVER ONLY AFTER DB CONNECT
const startServer = async () => {
  try {
    await connectDB(); // ✅ IMPORTANT FIX

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // CRON AFTER DB IS READY
    cron.schedule("*/1 * * * *", async () => {
      console.log("Checking NAV updates...");
      try {
        await updateNAV(); // ✅ await FIX
      } catch (err) {
        console.error("NAV Update Error:", err.message);
      }
    });

  } catch (err) {
    console.error("Server startup failed:", err);
  }
};

startServer();