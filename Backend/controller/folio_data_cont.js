import FolioExtra from '../models/folio_model.js'


const FolioController = async (req, res) => {
    try {
        const {PanNum} = req.body

        if (!PanNum) {
            res.status(400).json("Please provide PAN number")
        }
        const normalizePan = PanNum.trim().toUpperCase().replace(/\s+/g, '').replace(/[^\w]/g, '');


        const user = await FolioExtra.find({ Pan_No: new RegExp("^" + normalizePan + "$", "i") });
        console.log(user)

        res.json({
            success: true,
            data:user
        })
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
}

export default FolioController;