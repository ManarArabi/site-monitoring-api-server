import { Router } from 'express'
import { authenticate } from '../../common/middleware/authenticate.js'
import { validateSchema } from '../../common/middleware/joi.js'
import { checkEntryController } from './controller.js'
import { checkEntryValidation } from './validation.js'

const router = Router()

router.post(
  '/',
  authenticate,
  validateSchema(checkEntryValidation.createCheckEntry),
  checkEntryController.createCheckEntry
)

export default router
