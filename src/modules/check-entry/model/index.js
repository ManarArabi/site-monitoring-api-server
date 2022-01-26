import mongoose from 'mongoose'
import { checkEntrySchema } from './schema.js'

export const CheckEntries = mongoose.model('check-entries', checkEntrySchema)
