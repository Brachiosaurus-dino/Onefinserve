import mongoose from "mongoose";

import { connectDB } from "../db/mongo_db.js";

const { conn1 } = await connectDB()

const regsiterSchema = new mongoose.Schema({

    // PERSONAL DEATILS.............

    id: { type: String, default: "123" },

    phFirstName: { type: String, required: true, trim: true, default: "" },

    phMiddleName: { type: String, trim: true, default: "" },

    phLastName: { type: String, required: true, trim: true, default: "" },

    firstApplicantDOB: { type: String, required: true, trim: true, default: "" },

    firstApplicantGendar: { type: String, enum: ["male", "female", "other"], required: true, default: "male" },

    firstApplicantOccupation: { type: String, required: true, default: "" },

    firstApplicantPanNo: { type: String, required: true, trim: true, uppercase: true, default: "" },

    tax_status: { type: String, default: "" },

    holdingNature: { type: String, default: "" },

    address_1: { type: String, required: true, trim: true, default: "" },

    address_2: { type: String, trim: true, default: "" },

    address_3: { type: String, trim: true, default: "" },

    city: { type: String, required: true, trim: true, default: "" },

    state: { type: String, required: true, trim: true, default: "" },

    pincode: { type: String, required: true, trim: true, default: "" },

    country: { type: String, required: true, trim: true, default: "" },

    email: { type: String, required: true, treim: true, default: "" },

    indian_mobile_no: { type: String, default: "" },


    // NOMINEE NAME 1 DETAILS...................

    nominee_1_name: { type: String, required: true, trim: true, default: "" },

    nominee_1_relationship: { type: String, required: true, default: "" },

    nominee_per_1: { type: String, default: "" },

    nomineeIdentifyType1: {
        type: String,
        enum: ['ADHAAR', 'DRIVING LICENSE', 'PAN', 'OCI/PASSPORT'], // enum still applies
        default: "PAN"
    },

    nomineeIdentifyNo1: { type: String, default: "" },

    nomineeCountry_1: { type: String, default: "India" },

    nomineeDOB1: { type: Date, required: true, default: null },

    nomineeEmail1: { type: String, default: "" },

    nomineeMobile1: { type: String, default: "" },

    // BANK DETAILS................

    bankAccTypeMfd: { type: String, enum: ["SAVING", "CURRENT"], required: true, default: "SAVING" },

    ifsc_code_1: { type: String, required: true, uppercase: true, default: "" },

    micrNoMfd: { type: String, required: true, default: "" },

    bankName: { type: String, required: true, trim: true, default: "" },

    chequeName: { type: String, required: true, trim: true, default: "" },

    bankAccNoMfd: { type: String, required: true, default: "" },

    defaultBankMfd: { type: Boolean, required: true, default: false },

    bankAccTypeMfd2: { type: String, default: "" },

    ifsc_code_2: { type: String, default: "" },

    micrNomfd2: { type: String, default: "" },

    bankName2: { type: String, default: "" },

    chequeName1: { type: String, default: "" },

    bankAccNoMfd2: { type: String, default: "" },

    defaultBankMfd2: { type: Boolean, default: false },

    // NOMINEE NAME 2 DETAILS ...............................

    nomineeName2: { type: String, default: "" },

    nomineeRelation2: { type: String, default: "" },

    nomineePer2: { type: Number, default: 0 },

    nomineeIdentifyType2: { type: String, default: "" },

    nomineeIdentifyNo2: { type: String, default: "" },

    nomineeDOB2: { type: String, default: "" },

    nomineeEmail2: { type: String, default: "" },

    nomineeMobile2: { type: String, default: "" },

    check_kyc_id: { type: String, default: "" },

    faltca_updated: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
)

const Register = conn1.model('Register', regsiterSchema, 'client_registration')

export default Register