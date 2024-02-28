import { Router } from 'express'

const router = Router()

import * as advertiserCtrl from '../controllers/advertise.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', advertiserCtrl.getAdvertise)
router.post('/', advertiserCtrl.createAdvertise)

export default router