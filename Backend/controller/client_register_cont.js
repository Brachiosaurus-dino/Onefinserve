import Register from "../models/client_registration_model.js"
import { ClientRegisterValidate } from "../middelware/client_register_middelware.js"
import Kyc from '../models/kyc_model.js'

const Clinet_cont = async (req, res) => {

    try {
        const { firstApplicantPanNo, tax_status, holdingNature,
            firstApplicantOccupation, phFirstName, phMiddleName, phLastName, firstApplicantDOB,
            firstApplicantGendar, address_1, address_2,
            city, state, pincode, country, email, indian_mobile_no, nominee_1_name,
            nominee_1_relationship, nominee_per_1, nomineeIdentifyNo1,
            nomineeDOB1, nomineeEmail1, nomineeMobile1, bankAccTypeMfd, ifsc_code_1, micrNoMfd,
            bankName, chequeName, bankAccNoMfd, defaultBankMfd, } = req.body

        const result = ClientRegisterValidate.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({ errors: result.error.format() })
        }

        const validatedData = result.data; // This is now fully typed

        console.log("Validated data:", validatedData);


        let newRegister = new Register({
            firstApplicantPanNo, tax_status, holdingNature,
            firstApplicantOccupation, phFirstName, phMiddleName, phLastName, firstApplicantDOB,
            firstApplicantGendar, address_1, address_2,
            city, state, pincode, country, email, indian_mobile_no, nominee_1_name,
            nominee_1_relationship, nominee_per_1,
            //  nomineeIdentifyType1,
            nomineeIdentifyNo1,
            nomineeDOB1, nomineeEmail1, nomineeMobile1, bankAccTypeMfd, ifsc_code_1, micrNoMfd,
            bankName, chequeName, bankAccNoMfd, defaultBankMfd,
        })

        await newRegister.save()

        return res.status(200).json({ success: true, message: "Your Data Successfully stored", user: newRegister })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: `There is Internal Server Error ${err}` })
    }

}

export const GetClient_data = async (req, res) => {
    try {
        const { pan } = req.body;
        console.log("📥 Raw PAN input:", JSON.stringify(pan))

        if (!pan) {
            return res.status(400).json({ message: "Please provide the PAN number" });
        }

        // Aggressively clean the input
        const normalizedPan = pan
            .trim()
            .toUpperCase()
            .replace(/\s+/g, '') // Remove all spaces
            .replace(/[^\w]/g, ''); // Remove special characters

        console.log("🔍 Normalized PAN:", JSON.stringify(normalizedPan))

        // Use regex with case-insensitive search - this ALWAYS works
        const user = await Kyc.findOne({
            pan_no: new RegExp("^" + normalizedPan + "$", "i")
        });

        console.log("✅ MongoDB result:", user);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.json({
            success: true,
            pan: user.pan_no,
            full_name: user.full_name,
            mobile_no: user.mobile_no
        });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
};




// export const DeepDebugClient_data = async (req, res) => {
//     try {
//         const { pan } = req.body;
//         const normalizedPan = pan.trim().toUpperCase();

//         console.log("🔍 Input:", JSON.stringify(normalizedPan));

//         // 1. Check if collection exists and has data
//         const count = await Kyc.countDocuments();
//         console.log("📊 Total documents in Kyc collection:", count);

//         // 2. Get ALL documents and log them
//         const allDocs = await Kyc.find({}).lean();
//         console.log("📋 All documents:", JSON.stringify(allDocs, null, 2));

//         // 3. Try finding by the specific pan_no
//         const exactMatch = await Kyc.findOne({ pan_no: normalizedPan }).lean();
//         console.log("🎯 Exact findOne result:", exactMatch);

//         // 4. Try finding with $eq operator explicitly
//         const eqMatch = await Kyc.findOne({ pan_no: { $eq: normalizedPan } }).lean();
//         console.log("🎯 Using $eq operator:", eqMatch);

//         // 5. Check MongoDB schema/indexes
//         const collection = Kyc.collection;
//         const indexes = await collection.getIndexes();
//         console.log("📑 Indexes on collection:", indexes);

//         // 6. Try case-insensitive regex
//         const regexMatch = await Kyc.findOne({ pan_no: /MQTPS2513P/i }).lean();
//         console.log("🎯 Using regex (case-insensitive):", regexMatch);

//         // 7. Check the actual pan_no field for EVERY document
//         const panList = await Kyc.find({}, { pan_no: 1, _id: 0 }).lean();
//         console.log("🔎 All pan_no values in DB:", panList);

//         // 8. Check if there's a duplicate collection or database issue
//         const dbName = Kyc.db.name;
//         const collectionName = Kyc.collection.name;
//         console.log(`📦 Database: ${dbName}, Collection: ${collectionName}`);

//         res.json({
//             input: normalizedPan,
//             totalDocs: count,
//             allDocuments: allDocs,
//             exactMatch: exactMatch ? "FOUND" : "NOT FOUND",
//             regexMatch: regexMatch ? "FOUND" : "NOT FOUND",
//             database: dbName,
//             collection: collectionName,
//             panValues: panList
//         });

//     } catch (err) {
//         console.error("❌ Error:", err.message);
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// };

export default Clinet_cont