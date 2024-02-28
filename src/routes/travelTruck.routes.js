import { Router } from 'express'

const router = Router()

import * as travelTruckCtrl from '../controllers/travelTruck.controller'

import * as travelDashboardCtrl from '../controllers/travelDashTruck.controller'

import { authJwt, verifySignup } from '../middlewares'

router.get('/', travelTruckCtrl.getTravelTruck)
router.get('/dash', travelDashboardCtrl.getTravelTruck)
// router.post('/', travelTruckCtrl.createController)
// router.get('/:id', travelTruckCtrl.getController)
// router.put('/:id', travelTruckCtrl.updateController)
// router.delete('/:id', travelTruckCtrl.deleteController)

export default router