import httpStatus from 'http-status'
import mongoose from 'mongoose'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../app'
import { Users } from './model'
import { emailVerificationServices } from '../../common/services/email-verification'

const { BAD_REQUEST, CREATED, OK, NOT_FOUND, UNAUTHORIZED } = httpStatus

describe('User endpoints integration tests', () => {
  beforeAll(async () => mongoose.connect(process.env.MONGO_TEST_URL))

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()

    return mongoose.disconnect()
  })

  describe('POST /users/sign-up', () => {
    beforeAll(async () => {
      emailVerificationServices.sendVerifyEmail = jest.fn()
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
      expect(tokenPayload).toEqual({ username: payload.username, email: payload.email })

      expect(emailVerificationServices.sendVerifyEmail).toBeCalled()
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

  describe('POST /users/login', () => {
    const userPassword = '1234'
    let user

    beforeAll(async () => {
      user = new Users({
        email: 'test123@test.com',
        username: 'testing',
        password: userPassword
      })

      await user.save()
    })

    it('A user can login successfully', async () => {
      const { status, body } = await request(app)
        .post('/users/login')
        .send({ email: user.email, password: userPassword })

      expect(status).toBe(OK)
      expect(body).not.toBeFalsy()
    })

    it('It returns not found if there is not user', async () => {
      const { status } = await request(app)
        .post('/users/login')
        .send({ email: 'here@123.com', password: userPassword })

      expect(status).toBe(NOT_FOUND)
    })

    it('It returns unauthorized if the password is wring', async () => {
      const { status } = await request(app)
        .post('/users/login')
        .send({ email: user.email, password: 'wrongpassword' })

      expect(status).toBe(UNAUTHORIZED)
    })
  })
})
