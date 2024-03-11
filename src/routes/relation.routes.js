import { Router } from 'express'

const router = Router()

import * as relationCtrl from '../controllers/relation.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', relationCtrl.getRelation)

export default router