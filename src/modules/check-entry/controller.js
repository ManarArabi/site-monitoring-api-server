import { checkEntryServices } from './service.js'
import httpStatus from 'http-status'

const { CREATED, INTERNAL_SERVER_ERROR } = httpStatus

export const checkEntryController = {
  async createCheckEntry (req, res, next) {
    const {
      body
    } = req

    try {
      await checkEntryServices.createCheckEntry(body)

      return res.status(CREATED).send()
    } catch (error) {
      console.log(error)
      return res.status(INTERNAL_SERVER_ERROR).send()
    }
  }
}
