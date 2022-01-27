import { Router } from 'express'
import CheckEntryRouter from './modules/check-entry/router.js'
import UserRouter from './modules/user/router.js'

const router = new Router()

router.use('/check-entries', CheckEntryRouter)
router.use('/users', UserRouter)

export default router
