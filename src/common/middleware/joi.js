import { isEmpty, isNil } from 'ramda'

export const validateSchema = (schema) => {
  const { query: querySchema = {}, body: bodySchema = {}, params: paramsSchema = {} } = schema

  const validationOptions = { abortEarly: false }

  return (req, res, next) => {
    const { params, query, body } = req

    if (!isEmpty(querySchema)) {
      const { value: validatedQuery, error } = querySchema.validate(query, validationOptions)

      if (!isNil(error)) {
        next(error)
        return
      }
      req.query = validatedQuery
    }

    if (!isEmpty(bodySchema)) {
      const { value: validatedBody, error } = bodySchema.validate(body, validationOptions)

      if (!isNil(error)) {
        next(error)
        return
      }
      req.body = validatedBody
    }

    if (!isEmpty(paramsSchema)) {
      const { value: validatedParams, error } = paramsSchema.validate(params, validationOptions)

      if (!isNil(error)) {
        next(error)
        return
      }
      req.params = validatedParams
    }

    next()
  }
}
