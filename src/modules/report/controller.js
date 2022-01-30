import httpStatus from 'http-status'
import { reportsServices } from './services.js'

const { OK } = httpStatus

export const reportsController = {
  async getAvailabilityReport (req, res, next) {
    const {
      query: { checkEntryId, tags = [] },
      user: { _id: callerId }
    } = req

    try {
      const report = await reportsServices.getAvailabilityReport({ checkEntryId, tags }, { callerId })
      // console.log(report)
      res.status(OK).json(report)
    } catch (error) {
      next(error)
    }
  }
}
