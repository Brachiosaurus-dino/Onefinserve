import mongoose from "mongoose";
import { connectDB } from "../db/mongo_db.js";

const {conn1} = await connectDB()

const kyc_scheme = new mongoose.Schema({
    
    id: {
        type: Number,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true,
        trim: true
    },
    pan_no: {
        type: String,
        required: true,
        trim: true
    }

})

const Kyc = conn1.model("Kyc", kyc_scheme, "one_time_registration")

export default Kyc