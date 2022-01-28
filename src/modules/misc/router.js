import { Router } from 'express'
import { validateSchema } from '../../common/middleware/joi.js'
import { miscController } from './controller.js'
import { miscValidation } from './validation.js'

const router = Router()

router.get(
  '/verify/:token',
  validateSchema(miscValidation.verifyEmail),
  miscController.verifyEmailToken
)

export default router
