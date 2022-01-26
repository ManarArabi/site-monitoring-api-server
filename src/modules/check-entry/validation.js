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
      port: Joi.number(),
      timeout: Joi.number().default(5),
      interval: Joi.number().default(10),
      threshold: Joi.number().default(1),
      authentication: {
        username: Joi.string(),
        password: Joi.string()
      },
      httpHeaders: Joi.array().items(Joi.object()),
      assert: { statusCode: Joi.number() },

      tags: Joi.array().items(Joi.string()),

      ignoreSSL: Joi.boolean()
    }
  }
}
