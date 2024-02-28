import { Router } from 'express'

const router = Router()

import * as utilidadCtrl from '../controllers/utilidad.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', utilidadCtrl.getUtilidades)
router.post('/', utilidadCtrl.createUtilidad)
// router.get('/:id', utilidadCtrl.getController)
// router.put('/:id', utilidadCtrl.updateController)
// router.delete('/:id', utilidadCtrl.deleteController)

export default router