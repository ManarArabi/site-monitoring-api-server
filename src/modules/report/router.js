import { Router } from 'express'
import { authenticate } from '../../common/middleware/authenticate.js'
import { validateSchema } from '../../common/middleware/joi.js'
import { reportsController } from './controller.js'
import { reportsValidation } from './validation.js'

const router = Router()

router.get(
  '/',
  authenticate,
  validateSchema(reportsValidation.getAvailabilityReport),
  reportsController.getAvailabilityReport
)

export default router
