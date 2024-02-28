import { Router } from 'express'

const router = Router()

import * as travelWagonCtrl from '../controllers/travelWagon.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', travelWagonCtrl.getTravelWagon)
// router.post('/', travelTruckCtrl.createController)
// router.get('/:id', travelTruckCtrl.getController)
// router.put('/:id', travelTruckCtrl.updateController)
// router.delete('/:id', travelTruckCtrl.deleteController)

export default router