import { Router } from 'express'

const router = Router()

import * as relationCtrl from '../controllers/relation.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', relationCtrl.getRelation)
router.post('/', relationCtrl.createRelation)
router.put('/:id', relationCtrl.updateRelation)
router.delete('/:id', relationCtrl.deleteRelation)

export default router