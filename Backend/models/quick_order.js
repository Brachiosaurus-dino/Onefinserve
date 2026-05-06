import mongoose from "mongoose";
import { connectDB } from "../db/mongo_db.js";

const { conn1 } = await connectDB()

const quickorderSchema = new mongoose.Schema({

    id:{type:Number,required:true,default:0},

    pan_num: { type: String, required: true, default: "" },

    amc_name: { type: String, required: true, default: "" },

    scheme_name: { type: String, default: "" },

    scheme_code_isin: { type: String, required: true, default: "" },

    order_amount: { type: String, required: true, default: "" },

    account_no: { type: String, required: true, default: "123" },

    email: { type: String, required: true, default: "" },

    mobile_no: { type: String, required: true, default: "" },

    payment_mode: { type: String, required: true, default: "" }

})

const QuickOrder = conn1.model("QuickOrder",quickorderSchema,"Quick_Order")

export default QuickOrder    
