import mongoose from 'mongoose'
import { userSchema } from './schema.js'

export const Users = mongoose.model('users', userSchema)
