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

router.patch(
  '/:id',
  authenticate,
  validateSchema(checkEntryValidation.updateCheckEntry),
  checkEntryController.updateCheckEntry
)

router.delete(
  '/:id',
  authenticate,
  validateSchema(checkEntryValidation.deleteCheckEntry),
  checkEntryController.deleteCheckEntry
)

export default router
