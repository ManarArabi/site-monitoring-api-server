import httpStatus from 'http-status'
import { CheckEntries } from '../../modules/check-entry/model/index.js'
import { checkEntryLogServices } from '../../modules/check-entry-log/services.js'
import { sendRequests } from './requests.js'

const { INTERNAL_SERVER_ERROR } = httpStatus

export const pollUrlServices = {
  async pollUrlAndLogResults ({
    checkEntryId,
    url,
    path,
    protocol,
    timeout,
    assert: { statusCode: successfulStatusCode },
    httpHeaders,
    authentication: { username, password },
    port,
    ignoreSSL
  }) {
    console.log(`Cron job started with checkEntryId: ${checkEntryId}`)

    const startDate = new Date().valueOf()

    let responseStatusCode
    let responseTime
    let isActive = false

    const {
      userId, interval, tags
    } = await CheckEntries.findOne({ _id: checkEntryId }, { userId: 1, interval: 1, tags: 1 }).lean()

    const request = await sendRequests.sendGetRequest({
      url,
      path,
      protocol,
      timeout,
      httpHeaders,
      authentication: { username, password },
      port,
      ignoreSSL
    }, {
      requestCallback: async ({ statusCode, headers: { date } }) => {
        responseStatusCode = statusCode
        responseTime = startDate - new Date(date).valueOf()
        isActive = responseStatusCode === successfulStatusCode

        request.end()

        await checkEntryLogServices.createCheckEntryLog({
          isActive,
          responseTime,
          checkEntryId,
          interval,
          userId,
          url,
          tags
        })
      }
    })

    request.on('error', async error => {
      responseStatusCode = INTERNAL_SERVER_ERROR
      responseTime = timeout
      isActive = false
      console.error(`There is an error with request: ${protocol}://${url}${path}, ${error}`)

      request.destroy()

      await checkEntryLogServices.createCheckEntryLog({
        isActive,
        responseTime,
        checkEntryId,
        interval,
        userId,
        url,
        tags
      })
    })

    request.on('timeout', async () => {
      responseStatusCode = INTERNAL_SERVER_ERROR
      responseTime = timeout
      isActive = false

      console.log('------ request timeout ------')
      request.destroy()
    })
  }
}
