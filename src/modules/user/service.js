
import { generateJwt } from './helpers.js'
import { Users } from './model/index.js'

export const userServices = {
  async createUser ({
    username,
    password,
    email
  }) {
    const user = new Users({
      username,
      password,
      email
    })

    const jwt = generateJwt({
      data: {
        username,
        password,
        email
      }
    })

    user.jwt = jwt

    await user.save()

    return { username: user.username, email: user.email, _id: user._id, jwt }
  }
}
