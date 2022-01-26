import { Router } from 'express'
import { validateSchema } from '../../common/middleware/joi'
import { checkEntryController } from './controller'
import { checkEntryValidation } from './validation'

const router = Router()

router.post(
  '/',
  validateSchema(checkEntryValidation.createCheckEntry),
  checkEntryController.createCheckEntry
)

export default router
