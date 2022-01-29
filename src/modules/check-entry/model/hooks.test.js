import dotenv from 'dotenv'
import mongoose from 'mongoose'
import randtoken from 'rand-token'
import { globalScheduledMonitoringTasksUserMap } from '../../../jobs.js'
import { Users } from '../../user/model/index.js'
import { CheckEntries } from './index.js'

describe('Check entries Hooks tests', () => {
  let user
  let dbConnection

  beforeAll(async () => {
    dotenv.config()

    const randomTestDbUrl = process.env.MONGO_TEST_URL + randtoken.generate(16)
    dbConnection = await mongoose.connect(randomTestDbUrl)

    user = new Users({
      email: 'email@test.com',
      username: 'testing',
      password: 'userPassword'
    })

    return user.save()
  })

  afterAll(async () => {
    await dbConnection.connection.dropDatabase()

    return mongoose.disconnect()
  })

  describe('scheduleUrlPollTask hook', () => {
    let checkEntry

    it('It schedule a url poll task with cronjob after creating new check entry successfully', async () => {
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
        threshold: 3,
        ignoreSSL: true,
        userId: user._id,
        active: true
      })

      await checkEntry.save()

      expect(globalScheduledMonitoringTasksUserMap[`userId:${user._id}-checkEntryId:${checkEntry._id}`])
        .toBeTruthy()
    })
  })
})
