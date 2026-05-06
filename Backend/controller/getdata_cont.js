import Register from "../models/client_registration_model.js"


const GetdataMandate = async (req, res) => {
    try {
        const { pan } = req.body
        console.log(pan)

        if (!pan) {
            res.status(400).json({ message: "Please provide the PAN number" });
        }

        const normalizePan = pan.trim().toUpperCase().replace(/\s+/g, '').replace(/[^\w]/g, '');


        const user = await Register.findOne({ firstApplicantPanNo: new RegExp("^" + normalizePan + "$", "i") });
        console.log(user)
        // const user = await Register.findOne({ firstApplicantPanNo:pan})
        if (!user) {
            return res.status(406).json({ message: 'The user not found' })
        }
        res.json({
            success: true,
            name:user.phFirstName,
            panNUM: user.firstApplicantPanNo,
            ifscCode: user.ifsc_code_1,
            micrNo: user.micrNoMfd,
            nameper: user.chequeName,
            accNo: user.bankAccNoMfd,
            email:user.email,
            mob_num:user.indian_mobile_no,
            adress:user.address_1,
            ddob:user.firstApplicantDOB,
        })
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }



}

export default GetdataMandate