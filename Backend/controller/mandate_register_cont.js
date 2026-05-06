// import Mandate from "../models/mandate_register.js";

// const Mandate_Cont = async (req, res) => {

//     try {
//         const { client_name, client_code, amount, mandate_type, account_no, ac_type, ifsc_code
//             , micr_code, start_date, end_date, mandate_id, status
//         } = req.body
//         const lastmandate = await Mandate.findOne().sort({ id: -1 });
//         const nextId = lastmandate ? lastmandate.id + 1 : 1;
//         let newmandate = new Mandate({
//             id:nextId,
//             client_name,
//             client_code,
//             amount,
//             mandate_type,
//             account_no,
//             ac_type,
//             ifsc_code,
//             micr_code,
//             start_date,
//             end_date,
//             mandate_id,
//             status: status || 'success'

//         })

//         await newmandate.save()

//         return res.status(200).json({ success: true, message: "Mandate Registration completed" })



//     }
//     catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: `There is Internal Server Error in mandate Register ${err}`
//         })
//     }

// }

// export default Mandate_Cont