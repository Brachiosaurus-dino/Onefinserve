import mongoose from "mongoose";
import { connectDB } from "../db/mongo_db.js";

const { conn2 } = await connectDB()

const signUpSchema = new mongoose.Schema({
    panNumber: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_num: {
        type: Number,
        required: true
    },
    setPasswordss: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)
const SignUp = conn2.model('SignUp', signUpSchema, 'register')

export default SignUp