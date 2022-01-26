import Joi from 'joi'
import { isEmpty, isNil } from 'ramda'

export const validateSchema = (schema) => {
  const { query: querySchema = {}, body: bodySchema = {}, params: paramsSchema = {} } = schema

  const compiledParamsSchema = Joi.compile(paramsSchema)
  const compiledQuerySchema = Joi.compile(querySchema)
  const compiledBodySchema = Joi.compile(bodySchema)

  const validationOptions = { abortEarly: false }

  return (req, res, next) => {
    const { params, query, body } = req

    if (!isEmpty(querySchema)) {
      const { value: validatedQuery, error } = compiledQuerySchema.validate(query, validationOptions)

      if (!isNil(error)) {
        next(error)
        return
      }
      req.query = validatedQuery
    }

    if (!isEmpty(bodySchema)) {
      const { value: validatedBody, error } = compiledBodySchema.validate(body, validationOptions)

      if (!isNil(error)) {
        next(error)
        return
      }
      req.body = validatedBody
    }

    if (!isEmpty(paramsSchema)) {
      const { value: validatedParams, error } = compiledParamsSchema.validate(params, validationOptions)

      if (!isNil(error)) {
        next(error)
        return
      }
      req.params = validatedParams
    }

    next()
  }
}
