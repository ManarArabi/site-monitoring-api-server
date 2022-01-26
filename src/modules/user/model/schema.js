import mongoose from 'mongoose'

export const userSchema = mongoose.schema({
  name: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  jwt: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  }
})
