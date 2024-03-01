import { Router } from 'express'

const router = Router()

import * as dataCtrl from '../controllers/data.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', dataCtrl.getData)
// OLD VERSION
router.get('/analytics', dataCtrl.getDataAnalytics)
// NEW VERSION - DASHBOARD - CAMBIAR
router.get('/analytics2', dataCtrl.getDataAnalytics2)

export default router