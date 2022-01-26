import { Router } from 'express'
import CheckEntryRouter from './modules/check-entry/router.js'

const router = new Router()

router.use('/check-entries', CheckEntryRouter)

export default router
