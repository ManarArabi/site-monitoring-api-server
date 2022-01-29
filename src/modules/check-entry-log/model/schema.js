import mongoose from 'mongoose'

export const checkEntryLogSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    required: true
  },

  responseTime: {
    type: Number,
    required: true
  },

  checkEntryId: {
    type: mongoose.Types.ObjectId,
    ref: 'check-entries',
    required: true
  },

  // from check entry - will be used to calculate total up/down time
  interval: {
    type: Number,
    required: true
  },

  // from check entry - for filtering in case of deleting checkEntryId
  url: {
    type: String,
    required: true
  },

  // from check entry - for filtering in case of deleting checkEntryId
  tags: {
    type: [String],
    required: true
  },

  // from check entry
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  }
}, { timestamps: true })
