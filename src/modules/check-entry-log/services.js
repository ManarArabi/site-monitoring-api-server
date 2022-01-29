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
  }
}
