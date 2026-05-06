// import QuickOrder from "../models/quick_order.js";

// const Quick_Cont = async (req, res) => {

//     try {
//         const { pan_num, amc_name, scheme_name, scheme_code_isin, order_amount, account_no
//             , email, mobile_no, payment_mode
//         } = req.body

//         const lastquick = await QuickOrder.findOne().sort({ id: -1 });
//         const nextId = lastquick ? lastquick.id + 1 : 1;

//         let newQuickOrder = new QuickOrder({
//             id: nextId,
//             pan_num,
//             amc_name,
//             scheme_name,
//             scheme_code_isin,
//             order_amount,
//             account_no,
//             email,
//             mobile_no,
//             payment_mode

//         })

//         await newQuickOrder.save()

//         return res.status(200).json({ success: true, message: "Data saved successfully" })



//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: `There is Internal Server Error in mandate Register ${err}`
//         })
//     }
// }

// export default Quick_Cont