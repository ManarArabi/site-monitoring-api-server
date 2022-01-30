import randtoken from 'rand-token'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Promise from 'bluebird'
import request from 'supertest'

import { Users } from '../user/model/index.js'
import { CheckEntries } from '../check-entry/model/index.js'
import { times } from 'ramda'
import { CheckEntryLogs } from '../check-entry-log/model/index.js'
import app from '../../app.js'
import { generateJwt } from '../user/helpers.js'
import httpStatus from 'http-status'

dotenv.config()

const { OK } = httpStatus

describe('Services tests', () => {
  let user
  let userJwt
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

  describe('GET /reports/', () => {
    let checkEntry

    beforeAll(async () => {
      checkEntry = new CheckEntries({
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
        threshold: 2,
        ignoreSSL: true,
        userId: user._id
      })

      await checkEntry.save()
    })

    beforeEach(async () => {
      await Promise.map(
        times(
          async () => await CheckEntryLogs.create({
            isActive: false,
            responseTime: 2,
            checkEntryId: checkEntry._id,
            interval: 3,
            userId: user._id,
            url: 'www.url.com',
            tags: ['tag']
          }),
          3
        ),
        async createFunction => await createFunction
      )
    })

    it('It should get report successfully', async () => {
      const { status, body } = await request(app)
        .get('/reports/')
        .query({ checkEntryId: checkEntry._id })
        .set('Authorization', `JWT ${userJwt}`)

      expect(status).toBe(OK)

      expect(body).toBeTruthy()
      console.log(body)
    })
  })
})
