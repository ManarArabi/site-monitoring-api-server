import nodemailer from 'nodemailer'
import { GMAIL_MAIL_SERVICE } from '../constants/email.js'

export const sendEmailServices = {
  async sendEmail ({ subject, message, to }) {
    const transporter = nodemailer.createTransport({
      name: process.env.APP_URL,
      service: GMAIL_MAIL_SERVICE,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.APP_EMAIL,
      to,
      subject,
      html: message
    }

    try {
      await transporter.sendMail(mailOptions)
    } catch (error) {
      console.log(`Failed to send an email with subject: ${subject} to: ${to}`)
      console.error(error)
    }
  }
}
