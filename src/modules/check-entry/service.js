import httpStatus from 'http-status'
import mongoose from 'mongoose'
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
    httpHeaders = {},
    assert: { statusCode },
    tags = [],
    ignoreSSL,
    active = true
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
      active,
      _id: new mongoose.Types.ObjectId()
    }

    if (!isNil(path)) { checkEntry.path = path }
    if (!isNil(port)) { checkEntry.port = port }
    if (!isNil(username)) { checkEntry.authentication.username = username }
    if (!isNil(password)) { checkEntry.authentication.password = password }
    if (!isNil(statusCode)) { checkEntry.assert.statusCode = statusCode }
    if (!isNil(ignoreSSL)) { checkEntry.ignoreSSL = ignoreSSL }
    if (!isNil(httpHeaders)) { checkEntry.httpHeaders = httpHeaders }
    if (!isEmpty(tags)) { checkEntry.tags = tags }

    checkEntry = await CheckEntries.create(checkEntry)

    return checkEntry
  },

  async getCheckEntries ({ tags = [] }, { callerId }) {
    const getCheckEntriesQuery = { userId: callerId }

    if (!isEmpty(tags)) { getCheckEntriesQuery.tags = { $in: tags } }

    return CheckEntries.find(getCheckEntriesQuery).lean()
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

    if (!isNil(name)) { checkEntry.name = name }
    if (!isNil(url)) { checkEntry.url = url }
    if (!isNil(protocol)) { checkEntry.protocol = protocol }
    if (!isNil(path)) { checkEntry.path = path }
    if (!isNil(port)) { checkEntry.port = port }
    if (!isNil(timeout)) { checkEntry.timeout = timeout }
    if (!isNil(interval)) { checkEntry.interval = interval }
    if (!isNil(threshold)) { checkEntry.threshold = threshold }
    if (!isNil(username)) {
      checkEntry.authentication = { ...checkEntry.authentication, username }
    }
    if (!isNil(password)) {
      checkEntry.authentication = { ...checkEntry.authentication, password }
    }
    if (!isNil(httpHeaders)) { checkEntry.httpHeaders = httpHeaders }
    if (!isNil(statusCode)) {
      checkEntry.assert = {}
      checkEntry.assert.statusCode = statusCode
    }
    if (!isNil(tags)) { checkEntry.tags = tags }
    if (!isNil(ignoreSSL)) { checkEntry.ignoreSSL = ignoreSSL }
    if (!isNil(active)) { checkEntry.active = active }

    await checkEntry.save()

    return checkEntry
  },

  async deleteCheckEntry ({ checkEntryId }, { callerId }) {
    const checkEntry = await CheckEntries.findOne({ _id: checkEntryId, userId: callerId })

    if (isNil(checkEntry)) {
      throw new HttpError({ status: NOT_FOUND, message: 'There is no check entry linked to this id created by you' })
    }

    await checkEntry.remove()
  }
}
