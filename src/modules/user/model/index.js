import mongoose from 'mongoose'
import { userSchema } from './schema'

export const Users = mongoose.model('users', userSchema)
