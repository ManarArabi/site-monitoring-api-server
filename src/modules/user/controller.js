import { userServices } from './service.js'
import httpStatus from 'http-status'

const { CREATED, OK } = httpStatus

export const userController = {
  async createUser (req, res, next) {
    const {
      body
    } = req

    try {
      const user = await userServices.createUser(body)

      return res.status(CREATED).send(user)
    } catch (error) {
      return next(error)
    }
  },

  async login (req, res, next) {
    const {
      body
    } = req

    try {
      const jwt = await userServices.login(body)

      return res.status(OK).send(jwt)
    } catch (error) {
      return next(error)
    }
  }
}
