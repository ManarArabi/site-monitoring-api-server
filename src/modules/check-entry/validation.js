import Joi from 'joi'
import { URL_REGEX } from '../../common/constants/index.js'
import { INTERNET_PROTOCOLS } from './constants.js'

export const checkEntryValidation = {
  createCheckEntry: {
    body: {
      name: Joi.string().required(),
      url: Joi.string().regex(URL_REGEX).required(),
      protocol: Joi.string().valid(...INTERNET_PROTOCOLS).required(),
      path: Joi.string(),
      port: Joi.number().min(0),
      timeout: Joi.number().default(5).min(1),
      interval: Joi.number().default(10).min(1).max(1440),
      threshold: Joi.number().default(1).min(1),
      authentication: {
        username: Joi.string(),
        password: Joi.string()
      },
      webhook: Joi.string().regex(URL_REGEX),
      httpHeaders: Joi.object(),
      assert: { statusCode: Joi.number() },

      tags: Joi.array().items(Joi.string()),

      ignoreSSL: Joi.boolean(),
      active: Joi.boolean().default(true)
    }
  },

  getCheckEntries: {
    query: {
      tags: Joi.array().items(Joi.string()).min(1).single()
    }
  },

  updateCheckEntry: {
    url: {
      id: Joi.string().required()
    },

    body: {
      name: Joi.string(),
      url: Joi.string().regex(URL_REGEX),
      protocol: Joi.string().valid(...INTERNET_PROTOCOLS),
      path: Joi.string(),
      port: Joi.number().min(0),
      timeout: Joi.number().default(5).min(1),
      interval: Joi.number().default(10).min(1).max(1440),
      threshold: Joi.number().default(1).min(1),
      webhook: Joi.string().regex(URL_REGEX),
      authentication: {
        username: Joi.string(),
        password: Joi.string()
      },
      httpHeaders: Joi.object(),
      assert: { statusCode: Joi.number() },

      tags: Joi.array().items(Joi.string()),

      ignoreSSL: Joi.boolean(),
      active: Joi.boolean()
    }
  },

  deleteCheckEntry: {
    url: {
      id: Joi.string().required()
    }
  }
}
