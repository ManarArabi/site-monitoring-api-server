import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { isNil } from 'ramda'
import randtoken from 'rand-token'
import HttpError from '../../common/HttpError.js'
import { emailVerificationServices } from '../../common/services/email-verification.js'

import { generateJwt } from './helpers.js'
import { Users } from './model/index.js'

const { NOT_FOUND, UNAUTHORIZED } = httpStatus

export const userServices = {
  async createUser ({
    username,
    password,
    email
  }) {
    const verificationToken = randtoken.generate(16)

    const user = new Users({
      username,
      password,
      email,
      verificationToken
    })

    const jwt = generateJwt({ data: { username, email } })
    user.jwt = jwt

    await user.save()

    emailVerificationServices.sendVerifyEmail({ email, verificationToken })

    return { username: user.username, email: user.email, _id: user._id, jwt }
  },

  async login ({ email, password }) {
    const user = await Users.findOne({ email }, { password: 1, username: 1 }).lean()

    if (isNil(user)) {
      throw new HttpError({ status: NOT_FOUND, message: 'there is no user with this email' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new HttpError({ status: UNAUTHORIZED, message: 'Wrong email or password' })
    }

    const token = await generateJwt({ data: { email, username: user.username } })
    await Users.updateOne({ email }, { jwt: token })

    return token
  }
}
