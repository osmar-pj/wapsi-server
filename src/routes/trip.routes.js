import { Router } from 'express'

const router = Router()

import * as tripCtrl from '../controllers/trip.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/wagon', tripCtrl.getTripsWagon)
router.get('/truck', tripCtrl.getTripsTruck)
// router.post('/', tripCtrl.createController)
// router.get('/:id', tripCtrl.getController)
// router.put('/:id', tripCtrl.updateController)
// router.delete('/:id', tripCtrl.deleteController)

export default router