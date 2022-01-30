import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  emailVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: {
    type: String
  }
})
