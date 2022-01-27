import httpStatus from 'http-status'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../app'
import { generateJwt } from '../user/helpers'
import { Users } from '../user/model'

const { BAD_REQUEST, CREATED } = httpStatus

describe('Check Entry endpoints integration tests', () => {
  beforeAll(async () => mongoose.connect(process.env.MONGO_TEST_URL))

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()

    return mongoose.disconnect()
  })

  describe('POST /check-entries/', () => {
    let userJwt

    beforeAll(async () => {
      const user = new Users({
        email: 'email@test.com',
        username: 'testing',
        password: 'userPassword'
      })

      await user.save()

      userJwt = await generateJwt({ data: { email: user.email, username: user.username } })

      user.jwt = userJwt
      await user.save()
    })

    it('It creates a check entry successfully', async () => {
      const payload =
      {
        name: 'here',
        url: 'www.google.com',
        protocol: 'http',
        path: '/here',
        port: 5000,
        timeout: 10,
        httpHeaders: [
          {
            'cache-control': 'no-cache'
          }
        ],
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

      const { _id, __v, userId, ...rest } = body
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
})
