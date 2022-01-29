import { alertServices } from '../../common/services/alerts.js'
import { CheckEntryLogs } from './model/index.js'

export const checkEntryLogServices = {
  async createCheckEntryLog ({
    isActive,
    responseTime,
    checkEntryId,
    interval,
    userId,
    url,
    tags
  }) {
    const checkEntryLog = new CheckEntryLogs({
      isActive,
      responseTime,
      checkEntryId,
      interval,
      userId,
      url,
      tags
    })

    await checkEntryLog.save()

    if (
      isActive &&
      await alertServices.shouldSendSiteIsUpAlert({ checkEntryId, checkEntryLogId: checkEntryLog._id, isActive })
    ) {
      console.log('Should send up alert')
      // TODO implement send up alert
    } else if (
      !isActive &&
      await alertServices.shouldSendSiteIsDownAlert({ checkEntryId, checkEntryLogId: checkEntryLog._id, isActive })
    ) {
      console.log('Should send down alert')
      // TODO implement send down alert
    }
  }
}
