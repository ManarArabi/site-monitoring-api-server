import Joi from 'joi'

export const userValidation = {
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required()
    }
  },

  login: {
    body: {
      password: Joi.string().required(),
      email: Joi.string().email().required()
    }
  }
}
