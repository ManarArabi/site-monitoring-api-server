import { userServices } from './service.js'
import httpStatus from 'http-status'

const { CREATED, INTERNAL_SERVER_ERROR } = httpStatus

export const userController = {
  async createUser (req, res, next) {
    const {
      body
    } = req

    try {
      const user = await userServices.createUser(body)

      return res.status(CREATED).send(user)
    } catch (error) {
      console.log(error)
      return res.status(INTERNAL_SERVER_ERROR).send()
    }
  }
}
