import { pollUrlTaskSchedularServices } from '../../../common/services/poll-url-task-schedular.js'
import { globalScheduledMonitoringTasksUserMap } from '../../../jobs.js'

export const scheduleUrlPollTask = async function () {
  const {
    _id: checkEntryId,
    userId,
    url,
    port,
    path,
    interval,
    timeout,
    protocol,
    httpHeaders,
    assert: { statusCode },
    authentication: { username, password },
    active = true,
    ignoreSSL
  } = this

  pollUrlTaskSchedularServices.schedulePollUrlTask({
    checkEntryId,
    url,
    path,
    protocol,
    timeout,
    httpHeaders,
    assert: { statusCode },
    authentication: { username, password },
    port,
    interval,
    userId,
    active,
    ignoreSSL
  })
}

export const deleteScheduledUrlPollTask = function () {
  const { _id: checkEntryId, userId } = this

  globalScheduledMonitoringTasksUserMap[`userId:${userId}-checkEntryId:${checkEntryId}`]?.stop()
  delete globalScheduledMonitoringTasksUserMap[`userId:${userId}-checkEntryId:${checkEntryId}`]
}
