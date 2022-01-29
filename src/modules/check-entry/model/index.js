import mongoose from 'mongoose'
import { scheduleUrlPollTask } from './hooks.js'
import { checkEntrySchema } from './schema.js'

checkEntrySchema.pre('save', scheduleUrlPollTask)

export const CheckEntries = mongoose.model('check-entries', checkEntrySchema)
