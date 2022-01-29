import { CronJob } from 'cron'
import { isNil } from 'ramda'
import Promise from 'bluebird'
import { globalScheduledMonitoringTasksUserMap } from '../../jobs.js'
import { convertMinutesToCronJobTime } from '../helpers/cron-job-time.js'
import { pollUrlServices } from './poll-url.js'
import { CheckEntries } from '../../modules/check-entry/model/index.js'

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
    ignoreSSL,
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
          checkEntryId,
          ignoreSSL
        }),
        undefined,
        true,
        'Africa/Cairo'
      )

      globalScheduledMonitoringTasksUserMap[`userId:${userId}-checkEntryId:${checkEntryId}`] = scheduledTask
    }
  },

  async startScheduledCheckEntries () {
    const savedCheckEntries = await CheckEntries.find({ active: true }).lean()

    console.log('Pre-saved check entries scheduled job are now running')

    await Promise.map(
      savedCheckEntries,
      async ({
        url,
        path,
        protocol,
        timeout,
        httpHeaders = {},
        authentication = {},
        assert = {},
        port,
        interval,
        _id: checkEntryId,
        userId,
        ignoreSSL,
        active
      }) => await this.schedulePollUrlTask({
        url,
        path,
        protocol,
        timeout,
        httpHeaders,
        authentication,
        assert,
        port,
        interval,
        checkEntryId,
        userId,
        ignoreSSL,
        active
      })
    )
  }
}
