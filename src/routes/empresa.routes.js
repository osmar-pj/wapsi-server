import multer from 'multer'
import { Router } from 'express'

const router = Router()
// const uploads = multer({ dest: __dirname + 'uploads/' })

import * as usersCtrl from '../controllers/empresa.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', usersCtrl.getEmpresas)
router.post('/', usersCtrl.createEmpresa)
router.get('/:empresaId', usersCtrl.getEmpresaById)
router.put('/:empresaId', usersCtrl.updateEmpresaById)
router.delete('/:empresaId', usersCtrl.deleteEmpresaById)

export default router