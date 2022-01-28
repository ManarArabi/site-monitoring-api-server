import httpStatus from 'http-status'
import { emailVerificationServices } from '../../common/services/email-verification.js'

const { OK } = httpStatus

export const miscController = {
  async verifyEmailToken (req, res, next) {
    const {
      params: { token: verificationToken }
    } = req

    try {
      await emailVerificationServices.verifyEmailToken({ verificationToken })

      return res.status(OK).send()
    } catch (error) {
      return next(error)
    }
  }
}
