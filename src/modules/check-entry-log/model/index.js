import mongoose from 'mongoose'
import { checkEntryLogSchema } from './schema.js'

export const CheckEntryLogs = mongoose.model('check-entry-logs', checkEntryLogSchema)
