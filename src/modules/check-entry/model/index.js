import mongoose from 'mongoose'
import { deleteScheduledUrlPollTask, scheduleUrlPollTask } from './hooks.js'
import { checkEntrySchema } from './schema.js'

checkEntrySchema.post('save', scheduleUrlPollTask)
checkEntrySchema.post('remove', deleteScheduledUrlPollTask)

export const CheckEntries = mongoose.model('check-entries', checkEntrySchema)
