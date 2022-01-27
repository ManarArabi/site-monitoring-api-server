import { checkEntryServices } from './service.js'
import httpStatus from 'http-status'

const { CREATED, INTERNAL_SERVER_ERROR } = httpStatus

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
      console.log(error)
      return res.status(INTERNAL_SERVER_ERROR).send()
    }
  }
}
