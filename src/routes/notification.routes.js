import { Router } from 'express'

const router = Router()

import * as notificationCtrl from '../controllers/notification.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', notificationCtrl.getNotificaciones)
router.post('/', notificationCtrl.createNotificacion)
router.get('/:id', notificationCtrl.getNotificacion)
router.put('/:id', notificationCtrl.updateNotificacion)
router.delete('/:id', notificationCtrl.deleteNotificacion)

export default router