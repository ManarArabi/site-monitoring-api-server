import httpStatus from 'http-status'
import https from 'https'
import http from 'http'
import { isNil } from 'ramda'
import { HTTPS_PROTOCOL, HTTP_PROTOCOL } from '../../modules/check-entry/constants.js'

const { INTERNAL_SERVER_ERROR } = httpStatus

export const pollUrlServices = {
  async sendGetRequest ({
    url,
    path,
    protocol,
    timeout,
    httpHeaders,
    authentication: { username, password },
    port,
    ignoreSSL
  }, { requestCallback }) {
    const requestOptions = {
      hostname: url,
      timeout,
      protocol: `${protocol}:`,
      time: true
    }

    if (!isNil(port)) { requestOptions.port = port }
    if (!isNil(path)) { requestOptions.path = path }
    if (!isNil(httpHeaders)) { requestOptions.headers = httpHeaders }
    if (!isNil(username) || !isNil(password)) {
      let auth = ''

      if (!isNil(username)) { auth += username }
      if (!isNil(password)) { auth += `:${password}` }

      requestOptions.auth = auth
    }

    if (protocol === HTTPS_PROTOCOL) {
      return https.get(requestOptions, requestCallback)
    } else if (protocol === HTTP_PROTOCOL) {
      return http.get({ ...requestOptions, strictSSL: !ignoreSSL }, requestCallback)
    }
  },

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
    let availability = false

    const request = await this.sendGetRequest({
      url,
      path,
      protocol,
      timeout,
      httpHeaders,
      authentication: { username, password },
      port,
      ignoreSSL
    }, {
      requestCallback: ({ statusCode, headers: { date } }) => {
        responseStatusCode = statusCode
        responseTime = startDate - date
        availability = true
      }
    })

    request.on('error', error => {
      responseStatusCode = INTERNAL_SERVER_ERROR
      responseTime = timeout
      availability = false
      console.error(`There is an error with request: ${protocol}://${url}${path}, ${error}`)
    })

    request.on('timeout', () => {
      responseStatusCode = INTERNAL_SERVER_ERROR
      responseTime = timeout
      availability = false
      request.end()
    })

    // TODO check result and successfulStatusCode and log into logging model
  }
}
