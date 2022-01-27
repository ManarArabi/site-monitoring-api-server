export const createUserRequestBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' }
  }
}

export const createUserResponseBodySchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    username: { type: 'string' },
    jwt: { type: 'string' },
    email: { type: 'string' }
  }
}
