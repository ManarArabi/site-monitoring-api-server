import jwt from 'jsonwebtoken'

export const generateJwt = ({ data, jwtOptions = {} }) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { ...jwtOptions, expiresIn: '2 days' })

  return token
}
