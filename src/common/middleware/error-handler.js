import httpStatus from 'http-status'

const { INTERNAL_SERVER_ERROR } = httpStatus
export const errorHandler = (error, req, res, next) => {
  res.status = INTERNAL_SERVER_ERROR
  res.error = error

  return res.json('Something Went Wrong')
}
