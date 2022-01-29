import { CronJob } from 'cron'
import { isNil } from 'ramda'
import { globalScheduledMonitoringTasksUserMap } from '../../jobs.js'
import { convertMinutesToCronJobTime } from '../helpers/cron-job-time.js'
import { pollUrlServices } from './poll-url-services.js'

export const pollUrlTaskSchedularServices = {
  async schedulePollUrlTask ({
    url,
    path,
    protocol,
    timeout,
    httpHeaders,
    authentication: { username, password },
    assert: { statusCode },
    port,
    interval,
    checkEntryId,
    userId,
    active
  }) {
    const oldTask = globalScheduledMonitoringTasksUserMap[`userId:${userId}-checkEntryId:${checkEntryId}`]
    if (!isNil(oldTask)) {
      oldTask.stop()
    }

    if (active) {
      const cronTime = convertMinutesToCronJobTime(interval)

      const scheduledTask = new CronJob(
        cronTime,
        async () => await pollUrlServices.pollUrlAndLogResults({
          url,
          path,
          protocol,
          timeout,
          httpHeaders,
          assert: { statusCode },
          authentication: { username, password },
          port,
          checkEntryId
        }),
        undefined,
        true,
        'Africa/Cairo'
      )

      globalScheduledMonitoringTasksUserMap[`userId:${userId}-checkEntryId:${checkEntryId}`] = scheduledTask
    }
  }
}
