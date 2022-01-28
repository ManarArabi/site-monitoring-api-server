import https from 'https'
import { isNil } from 'ramda'

import CheckEntries from '../../modules/check-entry/model/index.js'

export const pollUrlServices = {
  async sendGetRequest ({
    url,
    path,
    internetProtocol,
    timeout,
    httpHeaders,
    authentication: { username, password },
    port
  }) {
    const requestOptions = {
      hostname: url,
      timeout,
      protocol: internetProtocol
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

    return https.get(requestOptions)
  },

  async pollUrlAndLogResults ({
    checkEntryId,
    url,
    path,
    internetProtocol,
    timeout,
    httpHeaders,
    authentication: { username, password },
    port
  }) {
    const result = await this.sendGetRequest({
      url,
      path,
      internetProtocol,
      timeout,
      httpHeaders,
      authentication: { username, password },
      port
    })

    const {
      assert: { statusCode: successfulStatusCode }
    } = await CheckEntries.findOne({ _id: checkEntryId }, { assert: 1 }).lean()

    console.log(result, successfulStatusCode)
    // TODO check result and successfulStatusCode and log into logging model
  }
}
