import mongoose from 'mongoose'
import { checkEntrySchema } from './schema'

export const checkEntries = mongoose.model('check-entries', checkEntrySchema)
