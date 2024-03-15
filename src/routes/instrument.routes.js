import {Router} from 'express'

const router = Router()

import * as instrumentCtrl from '../controllers/instrument.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', instrumentCtrl.getInstruments)
router.get('/:id', instrumentCtrl.getInstrument)
router.post('/', instrumentCtrl.createInstrument)
router.put('/:id', instrumentCtrl.updateInstrument)
router.delete('/:id', instrumentCtrl.deleteInstrument)

export default router