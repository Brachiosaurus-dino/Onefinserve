// import FolioData from '../models/folio_data.js';

// const Foliodatas = async (req, res) => {
//     try {
//         let { pan } = req.body;

//         console.log("PAN received:", pan);

//         const panClean = pan
//             .trim()
//             .replace(/\s+/g, "")   // removes all spaces
//             .toUpperCase();

//         const result = await FolioData.find({
//             Pan_no: {
//                 $regex: new RegExp(`^${panClean}$`, "i")
//             }
//         });

//         console.log("RESULT:", result);

//         res.json(result);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// };

// export default Foliodatas;

// import FolioData from '../models/folio_data.js';

// const Foliodatas = async (req, res) => {
//     try {
//         let { pan } = req.body;

//         console.log("\n========== FOLIO DATA QUERY ==========");
//         console.log("1️⃣ Raw PAN received:", pan);
//         console.log("   Raw value:", JSON.stringify(pan));

//         // ✅ FIX: Remove quotes if they exist
//         if (typeof pan === 'string' && pan.includes('"')) {
//             pan = pan.replace(/"/g, '');
//             console.log("🔧 Removed quotes from PAN, now:", pan);
//         }

//         console.log("   Type:", typeof pan);
//         console.log("   Length:", pan?.length);

//         const panClean = pan
//             .trim()
//             .replace(/\s+/g, "")
//             .toUpperCase();

//         console.log("2️⃣ PAN after cleaning:", panClean);

//         // The actual query
//         console.log("3️⃣ Running regex query for Pan_no: ^${panClean}$");
//         const result = await FolioData.find({
//             Pan_no: {
//                 $regex: new RegExp(`^${panClean}$`, "i")
//             }
//         });

//         console.log("4️⃣ Query result count:", result.length);

//         if (result.length > 0) {
//             console.log("✅ FOUND MATCHES!");
//             console.log("   First result:", {
//                 Name: result[0].Name,
//                 Pan_no: result[0].Pan_no,
//                 Folio_No: result[0].Folio_No
//             });
//         } else {
//             console.log("⚠️ NO MATCHES FOUND");
//         }

//         console.log("5️⃣ Sending response:", {
//             count: result.length,
//             isArray: Array.isArray(result)
//         });
//         console.log("=========================================\n");

//         res.json(result);

//     } catch (error) {
//         console.error("❌ ERROR in Foliodatas:", error.message);
//         res.status(500).json({
//             message: error.message,
//             error: error.toString()
//         });
//     }
// };

// export default Foliodatas;

import FolioData from '../models/folio_data.js';

const Foliodatas = async (req, res) => {
    try {
        console.log("\n========== FOLIO DATA ENDPOINT ==========");
        console.log("1️⃣ Entire req.body:", req.body);

        let { pan } = req.body;  // ✅ Changed from panNum to pan

        console.log("2️⃣ PAN received:", pan);

        // Check if pan is undefined
        if (!pan || typeof pan !== 'string') {
            console.log("❌ PAN is invalid:", pan);
            return res.status(400).json({
                message: "PAN is required and must be a string",
                received: pan
            });
        }

        // Remove quotes if present
        if (pan.includes('"')) {
            pan = pan.replace(/"/g, '');
        }

        // Clean the PAN
        const panClean = pan
            .trim()
            .replace(/\s+/g, "")
            .toUpperCase();

        console.log("PAN after cleaning:", panClean);

        // Query database - match schema field name 'pan' (lowercase)
        const result = await FolioData.find({
            pan: {  // ✅ Match your schema field name
                $regex: new RegExp(`^${panClean}$`, "i")
            }
        });

        console.log(`4️⃣ Found ${result.length} records for PAN: ${panClean}`);

        if (result.length > 0) {
            console.log("✅ Records found:", result);
        } else {
            console.log("⚠️ No records found");
        }

        console.log("=========================================\n");

        // Return all folio data
        res.json(result);

    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

export default Foliodatas;