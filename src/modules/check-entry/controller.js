import { checkEntryServices } from './service.js'
import httpStatus from 'http-status'

const { CREATED, OK } = httpStatus

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
  },

  async getCheckEntries (req, res, next) {
    const {
      user: { _id: userId },
      query: { tags }
    } = req

    try {
      const checkEntries = await checkEntryServices.getCheckEntries({ tags }, { callerId: userId })

      return res.status(OK).send(checkEntries)
    } catch (error) {
      return next(error)
    }
  },

  async updateCheckEntry (req, res, next) {
    const {
      body,
      user: { _id: userId },
      params: { id: checkEntryId }
    } = req

    try {
      const checkEntry = await checkEntryServices.updateCheckEntry({ ...body, checkEntryId }, { callerId: userId })

      return res.status(OK).send(checkEntry)
    } catch (error) {
      return next(error)
    }
  },

  async deleteCheckEntry (req, res, next) {
    const {
      user: { _id: userId },
      params: { id: checkEntryId }
    } = req

    try {
      const checkEntry = await checkEntryServices.deleteCheckEntry({ checkEntryId }, { callerId: userId })

      return res.status(OK).send(checkEntry)
    } catch (error) {
      return next(error)
    }
  }
}
