import { Router } from 'express'
import { validateSchema } from '../../common/middleware/joi.js'
import { userController } from './controller.js'
import { userValidation } from './validation.js'

const router = Router()

router.post(
  '/sign-up',
  validateSchema(userValidation.createUser),
  userController.createUser
)

router.post(
  '/login',
  validateSchema(userValidation.login),
  userController.login
)

export default router
