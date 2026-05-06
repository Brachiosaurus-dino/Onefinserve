import { connectDB } from "../db/mongo_db.js";
import mongoose from "mongoose";

const {conn1} = await connectDB()

const topupSchmea = new mongoose.Schema({

        pan_no:{type:String,required:true, default:""},

        account_no:{type:Number ,required:true,default:0},

        email:{type:String,required:true,default:""},

        mobile_num:{type:Number,required:true,default:0},

        scheme_name_:{type:String,required:true,default:""},

        scheme_code_isin:{type:String,required:true,default:""},

        folio_num:{type:String,required:true,default:""},

        order_amount:{type:Number,required:true,default:0},

        payment_mode:{type:String,required:true,default:""},



})

const Top_Up_Invest = conn1.model('Top_Up_Invest',topupSchmea,"Top_Up_Investment")

export default Top_Up_Invest