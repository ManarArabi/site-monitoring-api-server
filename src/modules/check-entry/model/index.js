import mongoose from 'mongoose'
import { checkEntrySchema } from './schema'

export const CheckEntries = mongoose.model('check-entries', checkEntrySchema)
