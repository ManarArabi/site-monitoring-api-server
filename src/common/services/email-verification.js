import httpStatus from 'http-status'
import { isNil } from 'ramda'
import { Users } from '../../modules/user/model/index.js'
import HttpError from '../HttpError.js'
import { sendEmailServices } from './send-email.js'

const { NOT_FOUND } = httpStatus

export const emailVerificationServices = {
  async sendVerifyEmail ({ email, verificationToken }) {
    const port = process.env.PORT || 3000

    const serverTokenUrl = `${process.env.APP_URL}:${port}/verify/${verificationToken}`

    await sendEmailServices.sendEmail({
      to: email,
      subject: `Email verification - ${process.env.APP_URL}`,
      message: `
        <p>Your email needs verification, kindly use this link: ${serverTokenUrl} to verify your email address</p>
      `
    })
  },

  async verifyEmailToken ({ verificationToken }) {
    const user = await Users.findOne({ verificationToken }).lean()

    if (isNil(user)) {
      throw new HttpError({ message: 'This token is expired or not attached to any account', status: NOT_FOUND })
    }

    await Users.updateOne({ _id: user._id }, { verificationToken: '', emailVerified: true })
  }
}
