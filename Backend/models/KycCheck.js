import mongoose from 'mongoose';

const kycCheckSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  mobile_no: { type: String, required: true },
  pan_no: { type: String, required: true },
  status: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('KycCheck', kycCheckSchema);