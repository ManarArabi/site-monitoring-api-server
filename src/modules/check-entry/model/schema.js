import mongoose from 'mongoose'
import { URL_SCHEMA } from '../../../common/constants/mongoose-schemas.js'
import { INTERNET_PROTOCOLS } from '../constants.js'

export const checkEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },

  url: URL_SCHEMA,

  protocol: {
    type: String,
    required: true,
    enum: INTERNET_PROTOCOLS
  },

  path: {
    type: String
  },

  port: {
    type: Number,
    min: 0
  },

  webhook: {
    ...URL_SCHEMA,
    required: false
  },

  // The timeout of the polling request - in seconds
  timeout: {
    type: Number,
    required: true,
    min: 0,
    default: 5
  },

  // The time interval for polling requests - in minutes
  interval: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },

  // The threshold of failed requests that will create an alert
  threshold: {
    type: Number,
    required: true,
    default: 1,
    min: 0
  },

  // An HTTP authentication header, with the Basic scheme, to be sent with the polling request
  authentication: {
    username: {
      type: String
    },

    password: {
      type: String
    }
  },

  // A list of key/value pairs custom HTTP headers to be sent with the polling request
  httpHeaders: {
    type: mongoose.Schema.Types.Mixed
  },

  // The response assertion to be used on the polling response
  assert: {
    // An HTTP status code to be asserted,
    statusCode: {
      type: Number
    }
  },

  tags: {
    type: [String]
  },

  //  A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol
  ignoreSSL: {
    type: Boolean
  }
})

checkEntrySchema.index({ protocol: 1, url: 1, port: 1, path: 1, userId: 1 }, { unique: 1 })
