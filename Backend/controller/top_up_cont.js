// import Top_Up_Invest from "../models/top_up_invest.js";

// const Top_cont = async (req, res) => {

//     try {
//         const { pan_no, account_no, email, mobile_num, scheme_name_, scheme_code_isin, folio_num,
//             order_amount, payment_mode
//         } = req.body

//         const lasttopup = await Top_Up_Invest.findOne().sort({ id: -1 });
//         const nextId = lasttopup ? lasttopup.id + 1 : 1;

//         let newtopUp = Top_Up_Invest({
//             id: nextId,
//             pan_no,
//             account_no,
//             email,
//             mobile_num,
//             scheme_name_,
//             scheme_code_isin,
//             folio_num,
//             order_amount,
//             payment_mode
//         })

//         await newtopUp.save()

//         return res.status(200).json({ success: true, message: "Data added successfully" })

//     }catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: `There is Internal Server Error in mandate Register ${err}`
//         })
//     }

// }

// export default Top_cont