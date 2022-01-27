import httpStatus from 'http-status'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../app'

const { BAD_REQUEST, CREATED } = httpStatus

describe('Check Entry endpoints integration tests', () => {
  beforeAll(async () => mongoose.connect(process.env.MONGO_TEST_URL))

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()

    return mongoose.disconnect()
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
      .send(payload)

    expect(status).toBe(CREATED)

    const { _id, __v, ...rest } = body
    expect(rest).toEqual(payload)
  })

  it('It returns bad request if the request body is not valid', async () => {
    const { status } = await request(app)
      .post('/check-entries/')
      .send({})

    expect(status).toBe(BAD_REQUEST)
  })
})
