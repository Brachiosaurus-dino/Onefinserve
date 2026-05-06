import GetdataMandate  from '../controller/getdata_cont.js'

import express from 'express'

const router = express.Router()

router.post('/getfromdata',GetdataMandate) 


export default router