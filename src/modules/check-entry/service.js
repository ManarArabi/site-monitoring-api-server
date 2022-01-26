import { isEmpty, isNil } from 'ramda'
import { CheckEntries } from './model/index.js'

export const checkEntryServices = {
  async createCheckEntry ({
    name,
    url,
    protocol,
    path,
    port,
    timeout = 5,
    interval = 10,
    threshold = 1,
    authentication: { username, password } = {},
    httpHeaders = [],
    assert: { statusCode },
    tags = [],
    ignoreSSL
  }) {
    const checkEntry = {
      name,
      url,
      protocol,
      timeout,
      interval,
      threshold
    }

    if (!isNil(path)) { checkEntry.path = path }
    if (!isNil(port)) { checkEntry.port = port }
    if (!isNil(username)) { checkEntry.username = username }
    if (!isNil(password)) { checkEntry.password = password }
    if (!isNil(statusCode)) { checkEntry.statusCode = statusCode }
    if (!isNil(ignoreSSL)) { checkEntry.ignoreSSL = ignoreSSL }
    if (!isEmpty(httpHeaders)) { checkEntry.httpHeaders = httpHeaders }
    if (!isEmpty(tags)) { checkEntry.tags = tags }

    await CheckEntries.create(checkEntry)
  }
}
