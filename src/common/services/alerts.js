import { CheckEntryLogs } from '../../modules/check-entry-log/model/index.js'
import { CheckEntries } from '../../modules/check-entry/model/index.js'

export const alertServices = {
  /**
   * If the last log was down, this should return true
   */
  async shouldSendSiteIsUpAlert ({ checkEntryLogId, checkEntryId, isActive }) {
    const previousCheckEntryLog = await CheckEntryLogs
      .findOne({ _id: { $ne: checkEntryLogId }, checkEntryId }, { isActive: 1 })
      .sort({ createdAt: 'desc' })
      .lean()

    return !previousCheckEntryLog?.isActive && isActive
  },

  /**
   * If the last (threshold count) of previous logs all represents down, this should return true
   */
  async shouldSendSiteIsDownAlert ({ checkEntryLogId, checkEntryId, isActive }) {
    const { threshold } = await CheckEntries.findOne({ _id: checkEntryId }, { threshold: 1 }).lean()

    const previousCheckEntryLogs = await CheckEntryLogs
      .find({ _id: { $ne: checkEntryLogId }, checkEntryId }, { isActive: 1 })
      .sort({ createdAt: 'desc' })
      .limit(threshold)
      .lean()

    const isAllLogsDown = previousCheckEntryLogs.every(({ isActive }) => isActive === false)

    return isAllLogsDown && !isActive
  }

}
