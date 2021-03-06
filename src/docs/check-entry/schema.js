import { INTERNET_PROTOCOLS } from '../../modules/check-entry/constants.js'

const checkEntrySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    url: { type: 'string' },
    protocol: { type: 'string', enum: INTERNET_PROTOCOLS },
    path: { type: 'string' },
    port: { type: 'number' },
    timeout: { type: 'number', description: 'In Seconds' },
    httpHeaders: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    assert: {
      type: 'object',
      properties: {
        statusCode: { type: 'number ' }
      }
    },
    webhook: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    interval: { type: 'number', description: 'In Minutes' },
    threshold: { type: 'number' },
    ignoreSSL: { type: 'boolean' },
    active: { type: 'boolean' }
  }
}

export const createCheckEntryRequestBodySchema = checkEntrySchema

export const createCheckEntryResponseBodySchema = {
  type: 'object',
  properties: {
    ...checkEntrySchema.properties,
    _id: { type: 'string' },
    webhook: { type: 'string' },
    userId: { type: 'string' }
  }
}

export const getCheckEntryResponseSchema = {
  type: 'array',
  items: checkEntrySchema
}

export const updateCheckEntryRequestBodySchema = checkEntrySchema

export const updateCheckEntryResponseBodySchema = {
  type: 'object',
  properties: {
    ...checkEntrySchema.properties,
    _id: { type: 'string' },
    webhook: { type: 'string' },
    userId: { type: 'string' }
  }
}
