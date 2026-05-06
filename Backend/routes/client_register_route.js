import Clinet_cont from '../controller/client_register_cont.js'
import express from 'express'
import Mandate_Cont from '../controller/mandate_register_cont.js'
import Quick_Cont from '../controller/quick_order_cont.js'
import Top_cont from '../controller/top_up_cont.js'
import { MandateValidation, MandateMiddelware } from '../middelware/mandate_middelware.js'
import { Quickvalidation, QuickMiddelware } from '../middelware/quick_order_middelware.js'
import { GetClient_data } from '../controller/client_register_cont.js'
import Foliodatas from '../controller/folio_cont.js'
import FolioController from '../controller/folio_data_cont.js'
const router = express.Router()

router.post('/formdata', Clinet_cont)
router.post('/mandate', MandateValidation, MandateMiddelware, Mandate_Cont)
router.post('/quick_order', Quickvalidation, QuickMiddelware, Quick_Cont)
router.post('/folioData',Foliodatas)
router.post('/topup', Top_cont)
router.post('/getdata', GetClient_data);
router.post('/foliodatass',FolioController)



export default router