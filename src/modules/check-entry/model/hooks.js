import { pollUrlTaskSchedularServices } from '../../../common/services/poll-url-task-schedular.js'

export const scheduleUrlPollTask = function () {
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
