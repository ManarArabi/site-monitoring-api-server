import httpStatus from 'http-status'
import mongoose from 'mongoose'
import request from 'supertest'
import randtoken from 'rand-token'

import app from '../../app'
import { generateJwt } from '../user/helpers'
import { Users } from '../user/model'
import { CheckEntries } from './model'

const { BAD_REQUEST, CREATED, OK } = httpStatus

describe('Check Entry endpoints integration tests', () => {
  let userJwt
  let user
  let dbConnection

  beforeAll(async () => {
    const randomTestDbUrl = process.env.MONGO_TEST_URL + randtoken.generate(16)
    dbConnection = await mongoose.connect(randomTestDbUrl)

    user = new Users({
      email: 'email@test.com',
      username: 'testing',
      password: 'userPassword'
    })

    await user.save()

    userJwt = await generateJwt({ data: { email: user.email, username: user.username } })
  })

  afterAll(async () => {
    await dbConnection.connection.dropDatabase()

    return mongoose.disconnect()
  })

  describe('POST /check-entries/', () => {
    it('It creates a check entry successfully', async () => {
      const payload =
      {
        name: 'here',
        url: 'www.google.com',
        protocol: 'http',
        path: '/here',
        port: 5000,
        timeout: 10,
        httpHeaders: {
          'cache-control': 'no-cache'
        },
        assert: {
          statusCode: 200
        },
        tags: [
          'test'
        ],
        interval: 5,
        threshold: 3,
        ignoreSSL: true
      }

      const { status, body } = await request(app)
        .post('/check-entries/')
        .set('Authorization', `JWT ${userJwt}`)
        .send(payload)

      expect(status).toBe(CREATED)

      const { _id, __v, userId, active, ...rest } = body
      expect(rest).toEqual(payload)
    })

    it('It returns bad request if the request body is not valid', async () => {
      const { status } = await request(app)
        .post('/check-entries/')
        .set('Authorization', `JWT ${userJwt}`)
        .send({})

      expect(status).toBe(BAD_REQUEST)
    })
  })

  describe('GET /check-entries/', () => {
    let expectedCheckEntry

    beforeAll(async () => {
      expectedCheckEntry = new CheckEntries({
        name: 'here',
        url: 'www.testTags',
        protocol: 'http',
        path: '/here',
        port: 5000,
        timeout: 10,
        httpHeaders: { 'cache-control': 'no-cache' },
        assert: { statusCode: 200 },
        tags: ['tag1'],
        interval: 5,
        threshold: 3,
        ignoreSSL: true,
        userId: user._id
      })

      await expectedCheckEntry.save()
    })

    it('It gets user check entries by tag successfully', async () => {
      const tags = ['tag1']
      const { status, body: [checkEntry] } = await request(app)
        .get('/check-entries/')
        .query({ tags })
        .set('Authorization', `JWT ${userJwt}`)

      expect(status).toBe(OK)

      expect(String(checkEntry._id)).toBe(String(expectedCheckEntry._id))
    })
  })

  describe('PATCH /check-entries/:id', () => {
    let checkEntryId

    beforeAll(async () => {
      const checkEntry = new CheckEntries({
        name: 'here',
        url: 'www.google',
        protocol: 'http',
        path: '/here',
        port: 5000,
        timeout: 10,
        httpHeaders: {
          'cache-control': 'no-cache'
        },
        assert: {
          statusCode: 200
        },
        tags: [
          'test'
        ],
        interval: 5,
        threshold: 3,
        ignoreSSL: true,
        userId: user._id
      })

      await checkEntry.save()

      checkEntryId = checkEntry._id
    })

    it('It updates a check entry successfully', async () => {
      const payload = {
        name: 'new name',
        url: 'www.google.com',
        protocol: 'https',
        path: '/eg',
        port: 8080,
        timeout: 5,
        interval: 10,
        threshold: 2,
        ignoreSSL: false
      }

      const { status, body: updatedCheckEntry } = await request(app)
        .patch(`/check-entries/${checkEntryId}`)
        .set('Authorization', `JWT ${userJwt}`)
        .send(payload)

      expect(status).toBe(OK)

      expect(updatedCheckEntry.name).toBe(payload.name)
      expect(updatedCheckEntry.url).toBe(payload.url)
      expect(updatedCheckEntry.protocol).toBe(payload.protocol)
      expect(updatedCheckEntry.path).toBe(payload.path)
      expect(updatedCheckEntry.port).toBe(payload.port)
      expect(updatedCheckEntry.timeout).toBe(payload.timeout)
      expect(updatedCheckEntry.interval).toBe(payload.interval)
      expect(updatedCheckEntry.threshold).toBe(payload.threshold)
      expect(updatedCheckEntry.ignoreSSL).toBe(payload.ignoreSSL)
    })
  })

  describe('DELETE /check-entries/:id', () => {
    let checkEntryId

    beforeAll(async () => {
      const checkEntry = new CheckEntries({
        name: 'here',
        url: 'www.google',
        protocol: 'http',
        path: '/here',
        port: 5000,
        timeout: 10,
        httpHeaders: {
          'cache-control': 'no-cache'
        },
        assert: {
          statusCode: 200
        },
        tags: [
          'test'
        ],
        interval: 5,
        threshold: 3,
        ignoreSSL: true,
        userId: user._id
      })

      await checkEntry.save()

      checkEntryId = checkEntry._id
    })

    it('It deletes a check entry successfully', async () => {
      const { status } = await request(app)
        .delete(`/check-entries/${checkEntryId}`)
        .set('Authorization', `JWT ${userJwt}`)

      expect(status).toBe(OK)
    })
  })
})
