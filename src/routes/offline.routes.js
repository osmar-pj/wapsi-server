import express from 'express'

import { postDataRaspberry } from '../controllers/data.offline.controller.js'

const router = express.Router()

router.post('/', postDataRaspberry)

export default router