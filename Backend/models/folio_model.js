import { connectDB } from "../db/mongo_db.js"
import mongoose from 'mongoose'

const {conn1} = await connectDB()

const folioSchema = new mongoose.Schema({

    Name: { type: String, default: "" },

    Pan_No: { type: String, default: "" },

    Units: { type: Number, default: 0 },

    Value: { type: String, default: 0 },

    Folio_No: { type: String, default: "" },

    Scheme_name: { type: String, default: "" },

    Product_Code: { type: String, default: "" },

    Scheme_Code:{type:String , default:""},

    COSTVALUE: { type: String, default: "" },

    ISIN_No: { type: String, default: "" },

    NAV: { type: String, default: 0 },
})

const FolioExtra = conn1.model('FolioExtra', folioSchema, 'Aum_Plus_Kfinkart_data')

export default FolioExtra