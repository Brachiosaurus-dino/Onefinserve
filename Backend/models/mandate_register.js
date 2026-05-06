
import { connectDB } from '../db/mongo_db.js'
import mongoose from 'mongoose'

const { conn1 } = await connectDB()

const mandateSchema = new mongoose.Schema({

    id: { type: Number, default: 0 },

    client_name: { type: String, required: true, default: "" },

    client_code: { type: String, required: true, default: "" },

    amount: { type: Number, required: true, default: 0 },

    account_no: { type: String, default: 0 },

    mandate_type: { type: String, default: "E" },

    ac_type: { type: String, default: "SAVING" },

    ifsc_code: { type: String, required: true, default: "PHSBANK123" },

    micr_code: { type: String, required: true, default: "12123434" },

    start_date: { type: String, required: true, default: "00:00:00" },

    end_date: { type: String, required: true, default: "00:00:00" },

    mandate_id: { type: Number, default: "123456789" },

    status: { type: String, enum: ["success", "failed"], default: "success", },

},
    {
        timestamps: true
    }
)

const Mandate = conn1.model('Mandate', mandateSchema, 'mandate_registration')

export default Mandate