import { Router } from 'express'

const router = Router()

import * as controllerCtrl from '../controllers/controller.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', controllerCtrl.getControllers)
router.post('/', controllerCtrl.createController)
router.get('/:id', controllerCtrl.getController)
router.put('/:id', controllerCtrl.updateController)
router.delete('/:id', controllerCtrl.deleteController)

export default router