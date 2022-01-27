import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { isNil } from 'ramda'
import { Users } from '../../modules/user/model/index.js'
import HttpError from '../HttpError.js'

const { UNAUTHORIZED } = httpStatus

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('JWT ', '')

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    const user = await Users.findOne({ email: decoded.email, jwt: token }).lean()

    if (isNil(user)) {
      throw new HttpError({ status: UNAUTHORIZED, message: 'Invalid jwt' })
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    console.log(error)
    res.status(UNAUTHORIZED).send('Invalid jwt')
  }
}
