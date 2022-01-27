import { checkEntryServices } from './service.js'
import httpStatus from 'http-status'

const { CREATED } = httpStatus

export const checkEntryController = {
  async createCheckEntry (req, res, next) {
    const {
      body,
      user: { _id: userId }
    } = req

    try {
      const checkEntry = await checkEntryServices.createCheckEntry({ ...body }, { callerId: userId })

      return res.status(CREATED).send(checkEntry)
    } catch (error) {
      return next(error)
    }
  }
}
