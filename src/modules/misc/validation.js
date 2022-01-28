import Joi from 'joi'

export const miscValidation = {
  verifyEmail: {
    url: {
      token: Joi.string().required()
    }
  }
}
