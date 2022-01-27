import httpStatus from 'http-status'
import mongoose from 'mongoose'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../app'

const { BAD_REQUEST, CREATED } = httpStatus

describe('User endpoints integration tests', () => {
  beforeAll(async () => mongoose.connect(process.env.MONGO_TEST_URL))

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()

    return mongoose.disconnect()
  })

  it('It creates a user and generating jwt successfully', async () => {
    const payload = {
      username: 'test',
      password: 'test123',
      email: 'test@test.com'
    }

    const { status, body } = await request(app)
      .post('/users/sign-up')
      .send(payload)

    expect(status).toBe(CREATED)

    const { _id, __v, jwt: token, ...user } = body
    expect(user).toEqual({ username: payload.username, email: payload.email })

    const { exp, iat, ...tokenPayload } = jwt.decode(token)
    expect(tokenPayload).toEqual(payload)
  })

  it('It returns bad request if the request body is not valid', async () => {
    const { status } = await request(app)
      .post('/users/sign-up')
      .send({
        username: 'test'
      })

    expect(status).toBe(BAD_REQUEST)
  })
})
