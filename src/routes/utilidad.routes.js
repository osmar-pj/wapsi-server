import { Router } from 'express'

const router = Router()

import * as utilidadCtrl from '../controllers/utilidad.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', utilidadCtrl.getUtilidades)
router.post('/', utilidadCtrl.createUtilidad)
router.post('/monitor/huaron', utilidadCtrl.getDataHuaron)
router.post('/save/huaron', utilidadCtrl.saveDataHuaron)
router.post('/notification/huaron', utilidadCtrl.saveNotificationHuaron)
// router.get('/:id', utilidadCtrl.getController)
// router.put('/:id', utilidadCtrl.updateController)
// router.delete('/:id', utilidadCtrl.deleteController)

export default router