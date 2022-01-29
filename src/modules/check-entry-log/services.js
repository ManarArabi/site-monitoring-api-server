import { getUrlIsDownAlert, getUrlIsUpAlert } from '../../common/services/alerts/helpers.js'
import { alertServices } from '../../common/services/alerts/index.js'
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
      const messages = getUrlIsUpAlert({ url, checkEntryId })

      alertServices.sendAlert({ ...messages, userId, checkEntryId })
    } else if (
      !isActive &&
      await alertServices.shouldSendSiteIsDownAlert({ checkEntryId, checkEntryLogId: checkEntryLog._id, isActive })
    ) {
      const messages = getUrlIsDownAlert({ url, checkEntryId })

      alertServices.sendAlert({ ...messages, userId, checkEntryId })
    }
  }
}
