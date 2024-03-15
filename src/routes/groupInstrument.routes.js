import { Router } from 'express'

const router = Router()

import * as groupInstrumentController from '../controllers/groupInstrument.controller'

router.get('/', groupInstrumentController.getGroupInstrument)
router.post('/', groupInstrumentController.createGroupInstrument)
router.put('/:id', groupInstrumentController.updateGroupInstrument)
router.delete('/:id', groupInstrumentController.deleteGroupInstrument)

export default router