import express from 'express';
// import Kyc from '../models/kyc_model.js'
// import { KycValidation, kycMiddelware } from '../middelware/kyc_check_middelware.js'

import { checkKycStatus } from '../controller/kycController.js';

const router = express.Router();
console.log(router);
// router.post('/check_kyc', KycValidation, kycMiddelware, async (req, res) => {
//     try {
//         const { full_name, mobile_no, pan_no } = req.body

//         let exsistingKyc = await Kyc.findOne({ mobile_no })
//         if (!exsistingKyc) {
//             exsistingKyc = await Kyc.findOne({ pan_no })
//         }
 
//         if (exsistingKyc) {
//             return res.status(400).json({ message: "KYC already exists", id: exsistingKyc.id })

//         }

//         const lastkey = await Kyc.findOne().sort({ id: -1 })

//         const nextId = lastkey ? lastkey.id + 1 : 1

//         const newKyc = new Kyc({
//             id: nextId,
//             full_name,
//             mobile_no,
//             pan_no
//         })

//         await newKyc.save()

//         res.status(200).json({ message: "KYC data submitted successfully" })
//     }

//     catch (err) {
//         console.log(err)
//         res.status(500).json({ message: "Server Error" })
//     }
// })

router.post('/check-kyc', checkKycStatus);

export default router