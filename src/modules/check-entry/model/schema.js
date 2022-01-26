import mongoose from 'mongoose'
import { URL_SCHEMA } from '../../../common/mongoose-schemas'
import { INTERNET_PROTOCOLS } from '../constants'

export const checkEntrySchema = mongoose.schema({
  name: {
    type: String,
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
    type: Number
  },

  webhook: {
    ...URL_SCHEMA,
    required: false
  },

  // The timeout of the polling request
  timeout: {
    type: Number,
    required: true,
    default: 5
  },

  // The time interval for polling requests
  interval: {
    type: Number,
    required: true,
    default: 10
  },

  // The threshold of failed requests that will create an alert
  threshold: {
    type: Number,
    required: true,
    default: 1
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
    type: mongoose.Types.mixed
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
