import httpStatus from 'http-status'
import { isEmpty, isNil } from 'ramda'
import HttpError from '../../common/HttpError.js'
import { CheckEntries } from './model/index.js'

const { NOT_FOUND } = httpStatus

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
    ignoreSSL,
    active
  }, { callerId }) {
    let checkEntry = {
      name,
      url,
      protocol,
      timeout,
      interval,
      threshold,
      authentication: {},
      assert: {},
      userId: callerId,
      active
    }

    if (!isNil(path)) { checkEntry.path = path }
    if (!isNil(port)) { checkEntry.port = port }
    if (!isNil(username)) { checkEntry.authentication.username = username }
    if (!isNil(password)) { checkEntry.authentication.password = password }
    if (!isNil(statusCode)) { checkEntry.assert.statusCode = statusCode }
    if (!isNil(ignoreSSL)) { checkEntry.ignoreSSL = ignoreSSL }
    if (!isEmpty(httpHeaders)) { checkEntry.httpHeaders = httpHeaders }
    if (!isEmpty(tags)) { checkEntry.tags = tags }

    checkEntry = await CheckEntries.create(checkEntry)

    return checkEntry
  },

  async updateCheckEntry ({
    checkEntryId,
    name,
    url,
    protocol,
    path,
    port,
    timeout = 5,
    interval = 10,
    threshold = 1,
    authentication: { username, password } = {},
    httpHeaders,
    assert: { statusCode } = {},
    tags,
    ignoreSSL,
    active
  }, { callerId }) {
    const checkEntry = await CheckEntries.findOne({ _id: checkEntryId, userId: callerId })

    if (isNil(checkEntry)) {
      throw new HttpError({ status: NOT_FOUND, message: 'There is no check entry linked to this id created by you' })
    }

    const updateQuery = {}

    if (!isNil(name)) { updateQuery.name = name }
    if (!isNil(url)) { updateQuery.url = url }
    if (!isNil(protocol)) { updateQuery.protocol = protocol }
    if (!isNil(path)) { updateQuery.path = path }
    if (!isNil(port)) { updateQuery.port = port }
    if (!isNil(timeout)) { updateQuery.timeout = timeout }
    if (!isNil(interval)) { updateQuery.interval = interval }
    if (!isNil(threshold)) { updateQuery.threshold = threshold }
    if (!isNil(username) || !isNil(password)) {
      updateQuery.authentication = {}

      if (!isNil(username)) { updateQuery.authentication.username = username }
      if (!isNil(password)) { updateQuery.authentication.password = password }
    }
    if (!isNil(httpHeaders)) { updateQuery.httpHeaders = httpHeaders }
    if (!isNil(statusCode)) {
      updateQuery.assert = {}
      updateQuery.assert.statusCode = statusCode
    }
    if (!isNil(tags)) { updateQuery.tags = tags }
    if (!isNil(ignoreSSL)) { updateQuery.ignoreSSL = ignoreSSL }
    if (!isNil(active)) { updateQuery.active = active }

    await CheckEntries.updateOne({ _id: checkEntryId }, updateQuery)

    return CheckEntries.findOne({ _id: checkEntryId }).lean()
  },

  async deleteCheckEntry ({ checkEntryId }, { callerId }) {
    const checkEntry = await CheckEntries.findOne({ _id: checkEntryId, userId: callerId })

    if (isNil(checkEntry)) {
      throw new HttpError({ status: NOT_FOUND, message: 'There is no check entry linked to this id created by you' })
    }

    await CheckEntries.deleteOne({ _id: checkEntryId })
  }
}
