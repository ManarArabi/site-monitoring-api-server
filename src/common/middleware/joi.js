import R from 'ramda'

export const validateSchema = (schema) => {
  const { query: querySchema = {}, body: bodySchema = {}, params: paramsSchema = {} } = schema

  const validationOptions = { abortEarly: false }

  return (req, res, next) => {
    const { params, query, body } = req

    if (!R.isEmpty(querySchema)) {
      const { value: validatedQuery, error } = querySchema.validate(query, validationOptions)

      if (!R.isNil(error)) {
        next(error)
        return
      }
      req.query = validatedQuery
    }

    if (!R.isEmpty(bodySchema)) {
      const { value: validatedBody, error } = bodySchema.validate(body, validationOptions)

      if (!R.isNil(error)) {
        next(error)
        return
      }
      req.body = validatedBody
    }

    if (!R.isEmpty(paramsSchema)) {
      const { value: validatedParams, error } = paramsSchema.validate(params, validationOptions)

      if (!R.isNil(error)) {
        next(error)
        return
      }
      req.params = validatedParams
    }

    next()
  }
}
