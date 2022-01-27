import mongoose from 'mongoose'
import { hashPassword } from './hooks.js'
import { userSchema } from './schema.js'

userSchema.pre('save', hashPassword)

export const Users = mongoose.model('users', userSchema)
