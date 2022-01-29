import randtoken from 'rand-token'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Promise from 'bluebird'
import { Users } from '../../modules/user/model'
import { CheckEntries } from '../../modules/check-entry/model'
import { times } from 'ramda'
import { CheckEntryLogs } from '../../modules/check-entry-log/model'
import { alertServices } from './alerts'

dotenv.config()

describe('Services tests', () => {
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
    return user.save()
  })

  afterAll(async () => {
    await dbConnection.connection.dropDatabase()

    return mongoose.disconnect()
  })

  describe('alertServices tests', () => {
    let checkEntry
    let checkEntryLogs

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
      checkEntryLogs = await Promise.map(
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

    describe('shouldSendSiteIsDownAlert service', () => {
      it('It should return true if the previous threshold count of logs were down', async () => {
        const lastCheckEntryLog = checkEntryLogs[2]
        const shouldSendSiteIsDownAlert = await alertServices.shouldSendSiteIsDownAlert({
          checkEntryId: lastCheckEntryLog.checkEntryId,
          checkEntryLogId: lastCheckEntryLog._id,
          isActive: lastCheckEntryLog.isActive
        })

        expect(shouldSendSiteIsDownAlert).toBe(true)
      })

      it('It should return false if the previous threshold count of logs were not all down', async () => {
        await CheckEntryLogs.updateOne({ _id: checkEntryLogs[1]._id }, { isActive: true })

        const lastCheckEntryLog = checkEntryLogs[2]
        const shouldSendSiteIsDownAlert = await alertServices.shouldSendSiteIsDownAlert({
          checkEntryId: lastCheckEntryLog.checkEntryId,
          checkEntryLogId: lastCheckEntryLog._id,
          isActive: lastCheckEntryLog.isActive
        })

        expect(shouldSendSiteIsDownAlert).toBe(false)
      })
    })

    describe('shouldSendSiteIsUpAlert service', () => {
      it('It should return true if the previous log was down', async () => {
        const lastCheckEntryLog = checkEntryLogs[2]
        await CheckEntryLogs.updateOne({ _id: lastCheckEntryLog._id }, { isActive: true })

        const shouldSendSiteIsDownAlert = await alertServices.shouldSendSiteIsUpAlert({
          checkEntryId: lastCheckEntryLog.checkEntryId,
          checkEntryLogId: lastCheckEntryLog._id,
          isActive: true
        })

        expect(shouldSendSiteIsDownAlert).toBe(true)
      })

      it('It should return false if the previous log was up', async () => {
        const lastCheckEntryLog = checkEntryLogs[2]
        await CheckEntryLogs.updateMany({ _id: { $in: checkEntryLogs.map(({ _id }) => _id) } }, { isActive: true })

        const shouldSendSiteIsDownAlert = await alertServices.shouldSendSiteIsUpAlert({
          checkEntryId: lastCheckEntryLog.checkEntryId,
          checkEntryLogId: lastCheckEntryLog._id,
          isActive: true
        })

        expect(shouldSendSiteIsDownAlert).toBe(false)
      })
    })
  })
})
