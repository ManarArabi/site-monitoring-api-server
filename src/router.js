import { Router } from 'express'
import CheckEntryRouter from './modules/check-entry/router.js'
import UserRouter from './modules/user/router.js'
import MiscRouter from './modules/misc/router.js'

const router = new Router()

router.use('/check-entries', CheckEntryRouter)
router.use('/users', UserRouter)
router.use(MiscRouter)

export default router
