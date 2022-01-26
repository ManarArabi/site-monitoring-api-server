import { Router } from 'express'
import { validateSchema } from '../../common/middleware/joi.js'
import { checkEntryController } from './controller.js'
import { checkEntryValidation } from './validation.js'

const router = Router()

router.post(
  '/',
  validateSchema(checkEntryValidation.createCheckEntry),
  checkEntryController.createCheckEntry
)

export default router
