import { isNil } from 'ramda'
import https from 'https'
import http from 'http'
import { HTTPS_PROTOCOL, HTTP_PROTOCOL } from '../../modules/check-entry/constants.js'

export const sendRequests = {
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

  async sendPostRequest ({ url, data }, { requestCallback = () => {} } = {}) {
    const stringifiedData = JSON.stringify(data)

    const requestOptions = {
      hostname: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': stringifiedData.length
      }
    }

    const request = https.request(requestOptions, requestCallback)

    request.write(stringifiedData)
    request.end()

    request.on('error', async error => {
      console.error(`Sending alert to webhook: ${url} failed, ${error}`)

      request.destroy()
    })

    return request
  }
}
