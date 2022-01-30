import httpStatus from 'http-status'
import { isEmpty, isNil, descend, prop, sum, sort } from 'ramda'
import HttpError from '../../common/HttpError.js'
import { CheckEntryLogs } from '../check-entry-log/model/index.js'

const { NOT_FOUND } = httpStatus

export const reportsServices = {
  async generateAvailabilityReportData ({ checkEntryLogs }) {
    const availability = checkEntryLogs.filter(({ isActive }) => isActive === true).length / checkEntryLogs.length

    const outages = checkEntryLogs.filter(({ isActive }) => isActive === false).length

    const avgResponseTime = sum(checkEntryLogs.map(({ responseTime }) => responseTime)) / checkEntryLogs.length

    const history = checkEntryLogs

    const downtime = outages * checkEntryLogs[0].interval * 60 // seconds

    const uptime = (checkEntryLogs.length - outages) * checkEntryLogs[0].interval * 60 // seconds

    const [{ isActive }] = sort(descend(prop('createdAt')), checkEntryLogs)

    return {
      outages,
      availability,
      responseTime: avgResponseTime,
      history,
      downtime,
      uptime,
      status: isActive ? 'Up' : 'Down'
    }
  },

  async getAvailabilityReport ({ checkEntryId, tags = [] }, { callerId }) {
    const getCheckEntryLogsQuery = { userId: callerId }

    if (!isNil(checkEntryId)) { getCheckEntryLogsQuery.checkEntryId = checkEntryId }
    if (!isEmpty(tags)) { getCheckEntryLogsQuery.tags = tags }

    const checkEntryLogs = await CheckEntryLogs.find(getCheckEntryLogsQuery).lean()

    if (isEmpty(checkEntryLogs)) {
      throw new HttpError({ status: NOT_FOUND, message: 'There is no logs with the requested data ' })
    }

    return this.generateAvailabilityReportData({ checkEntryLogs })
  }
}
