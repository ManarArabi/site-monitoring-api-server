import Joi from 'joi'

export const miscValidation = {
  verifyEmail: {
    query: {
      token: Joi.string().required()
    }
  }
}
