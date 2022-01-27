import bcrypt from 'bcrypt'

export const hashPassword = async function (next) {
  const password = bcrypt.hash(this.password, 3)

  this.password = password

  next()
}
