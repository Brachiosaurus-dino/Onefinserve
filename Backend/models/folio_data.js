import { connectDB } from '../db/mongo_db.js'
import mongoose from 'mongoose'

const { conn1 } = await connectDB()

const folio_schema = new mongoose.Schema({

    pan: { type: String, default: "" },
    scheme_name: { type: String, default: "" },
    scheme_code: { type: String, default: 0 },
    folio_no: { type: String, default: "" },      // Changed from Folio_no


},
    { strict: false }
)

const FolioData = conn1.model('FolioData', folio_schema, 'folio_registration')

export default FolioData